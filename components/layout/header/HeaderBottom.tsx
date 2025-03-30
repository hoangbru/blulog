"use client";

import Link from "next/link";

import { useCategory } from "@/context/CategoryContext";

const HeaderBottom = () => {
  const { categories, isLoading } = useCategory();

  const navItems = categories.map((item) => ({
    href: item.slug,
    label: item.name,
  }));

  return (
    <div className="bb-main-menu-desk">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="bb-inner-menu-desk">
              {/* Navbar Toggler Button */}
              <button
                className="navbar-toggler shadow-none"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <i className="ri-menu-2-line"></i>
              </button>

              {/* Main Menu */}
              <div className="bb-main-menu" id="navbarSupportedContent">
                <ul className="navbar-nav">
                  {isLoading ? (
                    <li>Đang tải...</li>
                  ) : categories.length ? (
                    navItems.map((item, index) => (
                      <li className="nav-item" key={index}>
                        <Link
                          href={`/category/${item.href}`}
                          className="nav-link"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))
                  ) : (
                    <li>Danh mục trống</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderBottom;
