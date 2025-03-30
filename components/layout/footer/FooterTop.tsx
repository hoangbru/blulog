"use client";

import Link from "next/link";
import Image from "next/image";

import { useCategory } from "@/context/CategoryContext";

const FooterTop = () => {
  const { categories } = useCategory();

  const footerNavItems = categories.map((item) => ({
    href: item.slug,
    label: item.name,
  }));

  const contactInfo = [
    {
      margin: "mt-15px",
      className: "bb-foo-location",
      icon: "ri-map-pin-line",
      content: <p>Ba Đình, Hà Nội, Việt Nam</p>,
    },
    {
      className: "bb-foo-call",
      icon: "ri-whatsapp-line",
      content: <Link href="tel:+84339410975">+84 339410975</Link>,
    },
    {
      className: "bb-foo-mail",
      icon: "ri-mail-line",
      content: (
        <Link href="mailto:hoangbru07@gamil.com">hoangbru07@gamil.com</Link>
      ),
    },
  ];

  const socialLinks = [
    { href: "#", icon: "ri-facebook-fill" },
    { href: "#", icon: "ri-twitter-fill" },
    { href: "#", icon: "ri-linkedin-fill" },
    { href: "#", icon: "ri-instagram-line" },
  ];

  return (
    <div className="footer-top padding-tb-50">
      <div className="container">
        <div
          className="row m-minus-991"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="200"
        >
          {/* Company Section */}
          <div className="col-sm-12 col-lg-4 bb-footer-cat">
            <div className="bb-footer-widget bb-footer-company">
              <Image
                src="/assets/img/logo/logo.png"
                className="bb-footer-logo"
                alt="footer logo"
                width={144}
                height={50}
              />
              <p className="bb-footer-detail">
                Blulog is the biggest market of grocery products. Get your daily
                needs from our store.
              </p>
            </div>
          </div>

          {/* Company Links Section */}
          <div className="col-sm-12 col-lg-4 bb-footer-account mb-3">
            <div className="bb-footer-widget">
              <h4 className="bb-footer-heading">Danh mục</h4>
              <div className="bb-footer-links">
                <ul className="align-items-center">
                  {footerNavItems.map((item, index) => (
                    <li className="bb-footer-link" key={index}>
                      <Link href={`/category/${item.href}`}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Contact & Social Section */}
          <div className="col-sm-12 col-lg-4 bb-footer-cont-social">
            <div className="bb-footer-contact">
              <div className="bb-footer-widget">
                <h4 className="bb-footer-heading">Liên hệ</h4>
                <div className="bb-footer-links">
                  <ul className="align-items-center">
                    {contactInfo.map((item, index) => (
                      <li
                        className={`bb-footer-link ${item.className}`}
                        key={index}
                      >
                        <span className={item.margin}>
                          <i className={item.icon}></i>
                        </span>
                        {item.content}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="bb-footer-social">
              <div className="bb-footer-widget">
                <div className="bb-footer-links">
                  <ul className="align-items-center">
                    {socialLinks.map((link, index) => (
                      <li className="bb-footer-link" key={index}>
                        <Link href={link.href}>
                          <i className={link.icon}></i>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterTop;
