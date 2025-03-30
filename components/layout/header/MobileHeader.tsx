"use client";

import { Fragment, useState } from "react";
import Link from "next/link";

const MobileHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
    { href: "/post", label: "Post" },
    { href: "/offer", label: "Offers" },
  ];

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
          <span className="menu_title">My Menu</span>
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
              {navItems.map((item, index) => (
                <li key={index} onClick={() => setMenuOpen(false)}>
                  <Link href={`${item.href}`}>{item.label}</Link>
                </li>
              ))}
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
