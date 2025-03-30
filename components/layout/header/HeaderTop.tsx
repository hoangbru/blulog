"use client";

import Link from "next/link";
import { useState, useRef, RefObject } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useOnClickOutside } from "usehooks-ts";

const HeaderTop = () => {
  const [languageDropdown, setLanguageDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const currentLang = pathname?.split("/")[1] || "en";

  const handleChangeLanguage = (lang: string) => {
    const newPath = pathname?.replace(`/${currentLang}`, `/${lang}`);
    router.push(newPath || `/`);
    setLanguageDropdown(false);
  };

  useOnClickOutside(dropdownRef as RefObject<HTMLElement>, () =>
    setLanguageDropdown(false)
  );

  return (
    <div className="top-header">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="inner-top-header">
              {/* Left Bar */}
              <div className="col-left-bar">
                <Link href="/shop">Flat 50% Off On Grocery Shop.</Link>
              </div>

              {/* Right Bar */}
              <div className="col-right-bar">
                <div className="cols">
                  <Link href="/faq">Help?</Link>
                </div>

                {/* Language Dropdown */}
                <div className="cols">
                  <div className="custom-dropdown" ref={dropdownRef}>
                    <Link
                      className="bb-dropdown-toggle"
                      href=""
                      onClick={() => setLanguageDropdown(!languageDropdown)}
                    >
                      Language
                    </Link>
                    {languageDropdown && (
                      <ul className="dropdown">
                        <li>
                          <div onClick={() => handleChangeLanguage("en")}>
                            English
                          </div>
                        </li>
                        <li>
                          <div onClick={() => handleChangeLanguage("vi")}>
                            Vietnamese
                          </div>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
