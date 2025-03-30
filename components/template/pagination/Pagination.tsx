import { FC } from "react";
import "./pagination.css";

import { PaginationType } from "@/types/pagination";

interface PaginationProps {
  currentPage: number;
  pagination: PaginationType;
  handlePageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  pagination,
  handlePageChange,
}) => {
  const firstProduct = (currentPage - 1) * (pagination.itemsPerPage || 1) + 1;
  const lastProduct = Math.min(
    currentPage * (pagination.itemsPerPage || 1),
    pagination.totalItems || 0
  );
  const totalItems = pagination.totalItems || 0;
  const totalPages = pagination.totalPages || 0;

  return (
    <div className="col-12">
      {pagination.totalItems ? (
        <div className="bb-pro-pagination">
          <p>
            Showing {firstProduct}-{lastProduct} of {totalItems} item(s)
          </p>

          <ul>
            {/* Prev button */}
            {currentPage > 1 && (
              <li>
                <span
                  className="prev"
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  <i className="ri-arrow-left-s-line"></i> Prev
                </span>
              </li>
            )}

            {/* Page numbers */}
            {Array.from({ length: pagination.totalPages }).map((_, index) => (
              <li
                key={index + 1}
                className={currentPage === index + 1 ? "active" : ""}
              >
                <span onClick={() => handlePageChange(index + 1)}>
                  {index + 1}
                </span>
              </li>
            ))}

            {/* Next button */}
            {currentPage < totalPages && (
              <li>
                <span
                  className="next"
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next <i className="ri-arrow-right-s-line"></i>
                </span>
              </li>
            )}
          </ul>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Pagination;
