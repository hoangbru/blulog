"use client";

import { FC, Fragment, RefObject, useRef, useState } from "react";
import Image from "next/image";
import { useOnClickOutside } from "usehooks-ts";
import "./quickview.css";

import RatingStar from "../RatingStar";
import ZoomImage from "../ZoomImage";

import { Product } from "@/types/post";
import { sale } from "@/constants/value";
import { formatPrice } from "@/utils/format";

interface QuickViewModalProps {
  product: Product;
}

const QuickViewModal: FC<QuickViewModalProps> = ({ product }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const newPrice = product.price * (1 - sale / 100);

  const handleToggleModal = () => {
    setIsOpen(!isOpen);
  };

  useOnClickOutside(modalRef as RefObject<HTMLElement>, handleToggleModal);

  return (
    <Fragment>
      <span
        className="button-action"
        onClick={handleToggleModal}
        title="Quick view"
      >
        <i className="ri-eye-line"></i>
      </span>

      {isOpen && (
        <Fragment>
          <div
            ref={modalRef}
            className="modal fade quickview-modal show"
            style={{ display: "block" }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <button
                  type="button"
                  className="qty-close"
                  onClick={handleToggleModal}
                  aria-label="Close"
                  title="Close"
                ></button>
                <div className="modal-body">
                  <div className="row mb-minus-24">
                    {/* Image Section */}
                    <div className="col-md-5 col-sm-12 col-xs-12 mb-24">
                      <div className="single-pro-img single-pro-img-no-sidebar">
                        <div className="single-product-scroll">
                          <ZoomImage>
                            <Image
                              className="img-responsive"
                              src={product.images[0]}
                              alt="product-img"
                              width={268}
                              height={268}
                            />
                          </ZoomImage>
                        </div>
                      </div>
                    </div>
                    {/* Content Section */}
                    <div className="col-md-7 col-sm-12 col-xs-12 mb-24">
                      <div className="quickview-pro-content">
                        <h5 className="bb-quick-title">{product.name}</h5>
                        <RatingStar rating={product.rating} />
                        <div className="bb-quickview-desc">
                          {product.description}
                        </div>
                        <div className="bb-quickview-price">
                          <span className="new-price">
                            {formatPrice(newPrice)}
                          </span>
                          {product.price && (
                            <span className="old-price">
                              {formatPrice(product.price)}
                            </span>
                          )}
                        </div>
                        <div className="bb-quickview-qty">
                          <div className="qty-plus-minus">
                            <input
                              className="qty-input"
                              type="text"
                              name="bb-qtybtn"
                              defaultValue="1"
                            />
                          </div>
                          <div className="bb-quickview-cart">
                            <button type="button" className="bb-btn-1">
                              <i className="ri-shopping-bag-line"></i>Add To
                              Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default QuickViewModal;
