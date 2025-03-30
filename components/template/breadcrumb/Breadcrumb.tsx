"use client";

import { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import "./breadcrumb.css";

interface BreadcrumbProps {
  destination?: string;
  title?: string;
}

const Breadcrumb: FC<BreadcrumbProps> = ({
  destination = "Trang chủ",
  title,
}) => {
  const pathname = usePathname();
  const currentPath = pathname.split("/");
  const currentTitle = title || currentPath[currentPath.length - 1] || "Home";
  
  const isActive = pathname === "/" + currentTitle;

  return (
    <section className="section-breadcrumb margin-b-50">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="row bb-breadcrumb-inner">
              <div className="col-md-6 col-sm-12">
                <h2 className="bb-breadcrumb-title">{currentTitle}</h2>
              </div>
              <div className="col-md-6 col-sm-12">
                <ul className="bb-breadcrumb-list">
                  <li className="bb-breadcrumb-item">
                    <Link href="/">{destination}</Link>
                  </li>
                  <li>
                    <i className="ri-arrow-right-double-fill"></i>
                  </li>
                  <li
                    className={`bb-breadcrumb-item ${isActive ? "active" : ""}`}
                  >
                    {currentTitle}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Breadcrumb;
