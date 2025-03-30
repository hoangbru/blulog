"use client";

import { useEffect, useRef, useState } from "react";
import "./back-to-top.css";

const BackToTop = () => {
  const progressPath = useRef<SVGPathElement | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const pathElement = progressPath.current;

    if (pathElement) {
      // Tính chiều dài vòng tròn
      const pathLength = pathElement.getTotalLength();
      pathElement.style.strokeDasharray = `${pathLength} ${pathLength}`;
      pathElement.style.strokeDashoffset = `${pathLength}`;

      // Hàm cập nhật tiến trình cuộn trang
      const updateProgress = () => {
        const scrollTop = window.scrollY;
        const height = document.documentElement.scrollHeight - window.innerHeight;
        const progress = pathLength - (scrollTop * pathLength) / height;
        pathElement.style.strokeDashoffset = `${progress}`;

        // Hiển thị hoặc ẩn nút Back to Top
        setShowBackToTop(scrollTop > 50);
      };

      // Thêm sự kiện scroll
      window.addEventListener('scroll', updateProgress);
      updateProgress();

      // Cleanup sự kiện khi component unmount
      return () => window.removeEventListener('scroll', updateProgress);
    }
  }, []);

  // Hàm cuộn lên đầu trang
  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {showBackToTop && (
        <a href="#Top" className="back-to-top" onClick={scrollToTop}>
          <i className="ri-arrow-up-line"></i>
          <div className="back-to-top-wrap">
            <svg viewBox="-1 -1 102 102">
              <path
                ref={progressPath}
                d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
              ></path>
            </svg>
          </div>
        </a>
      )}
    </>
  );
};

export default BackToTop;
