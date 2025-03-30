"use client";

import { Fragment, useState } from "react";
import Link from "next/link";

import { useCategory } from "@/context/CategoryContext";

const MobileHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { categories, isLoading } = useCategory();

  const navItems = categories.map((item) => ({
    href: item.slug,
    label: item.name,
  }));

  return (
    <Fragment>
      <div className="bb-toggle-menu" onClick={() => setMenuOpen(!menuOpen)}>
        <div className="header-icon">
          <i className="ri-menu-3-fill"></i>
        </div>
      </div>
      {/* Mobile Menu Overlay */}
      <div
        className="bb-mobile-menu-overlay"
        style={{ display: `${menuOpen ? "block" : "none"}` }}
        onClick={() => setMenuOpen(false)}
      ></div>

      {/* Mobile Menu */}
      <div
        id="bb-mobile-menu"
        className={`bb-mobile-menu ${menuOpen ? "bb-menu-open" : ""}`}
      >
        {/* Menu Title */}
        <div className="bb-menu-title">
          <span className="menu_title">Danh mục</span>
          <button
            type="button"
            className="bb-close-menu"
            onClick={() => setMenuOpen(false)}
          >
            ×
          </button>
        </div>

        {/* Menu Items */}
        <div className="bb-menu-inner">
          <div className="bb-menu-content">
            <ul>
              {isLoading ? (
                <li>Đang tải...</li>
              ) : categories.length ? (
                navItems.map((item, index) => (
                  <li key={index} onClick={() => setMenuOpen(false)}>
                    <Link href={`/category/${item.href}`}>{item.label}</Link>
                  </li>
                ))
              ) : (
                <li>Danh mục trống</li>
              )}
            </ul>
          </div>

          {/* Social Links */}
          <div className="header-res-lan-curr">
            <div className="header-res-social">
              <div className="header-top-social">
                <ul className="mb-0">
                  <li className="list-inline-item">
                    <Link href="#">
                      <i className="ri-facebook-fill"></i>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link href="#">
                      <i className="ri-twitter-fill"></i>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link href="#">
                      <i className="ri-instagram-line"></i>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link href="#">
                      <i className="ri-linkedin-fill"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default MobileHeader;
