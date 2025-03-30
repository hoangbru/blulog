"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const FooterBottom = () => {
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <div className="footer-bottom">
      <div className="container">
        <div className="row">
          <div className="footer-copy">
            <div className="bb-copy">
              <span>© {currentYear} Toàn bộ bản quyền thuộc</span>
              <Link className="site-name" href={`/`}>
                {process.env.NEXT_PUBLIC_APP_NAME}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;
