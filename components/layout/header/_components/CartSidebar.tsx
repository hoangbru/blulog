import { Fragment, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Slider, { Settings } from "react-slick";

import { IconCart } from "@/components/icons";
import RelatedItem from "./RelatedItem";

import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { valueAddedTax } from "@/constants/value";
import { formatPrice } from "@/utils/format";

const CartSidebar = () => {
  const { wishlist } = useWishlist();
  const { cart, removeItem, updateQuantity } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const mainSliderSettings: Settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    autoplay: true,
    fade: true,
    arrows: true,
  };
  const subTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const vat = subTotal * (valueAddedTax / 100);
  const total = subTotal + vat;

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const Banner = () => {
    return (
      <div className="bb-cart-banner mb-24">
        <div className="banner">
          <Image
            src="/assets/img/category/cart-banner.jpg"
            alt="cart-banner"
            width={262}
            height={393}
          />
          <div className="detail">
            <h4>Organic & Fresh</h4>
            <h3>Vegetables</h3>
            <Link href={`/shop`} onClick={toggleCart}>
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Fragment>
      {/* Cart Button */}
      <div
        className="bb-header-btn bb-cart-toggle"
        title="Cart"
        onClick={toggleCart}
      >
        <div className="header-icon">
          <IconCart />
          <span className="main-label-note-new"></span>
        </div>
        <div className="bb-btn-desc">
          <span className="bb-btn-title">
            <b className="bb-cart-count">{cart.length}</b> items
          </span>
          <span className="bb-btn-stitle">Cart</span>
        </div>
      </div>

      {/* Cart Overlay */}
      {isCartOpen && (
        <div className="bb-side-cart-overlay" onClick={toggleCart}></div>
      )}

      {/* Cart Sidebar */}
      <div className={`bb-side-cart ${isCartOpen ? "bb-open-cart" : ""}`}>
        <div className="row h-full">
          <div className="col-md-5 col-12 d-none-767">
            <div className="bb-top-contact">
              <div className="bb-cart-title">
                {wishlist?.length > 0 && <h4>Related Items</h4>}
              </div>
            </div>
            <div className="bb-cart-box mb-minus-24 cart-related bb-border-right">
              {/* Related Items */}

              {wishlist.length == 0 ? (
                <div></div>
              ) : (
                <Slider {...mainSliderSettings}>
                  {wishlist.map((item, index) => (
                    <RelatedItem product={item} key={index} />
                  ))}
                </Slider>
              )}
              <Banner />
            </div>
          </div>

          <div className="col-md-7 col-12">
            <div className="bb-inner-cart">
              <div className="bb-top-contact">
                <div className="bb-cart-title">
                  <h4>My cart</h4>
                  <button
                    type="button"
                    className="bb-cart-close"
                    title="Close Cart"
                    onClick={toggleCart}
                  ></button>
                </div>
              </div>

              <div className="bb-cart-box item">
                <ul className="bb-cart-items">
                  {cart.length == 0 ? (
                    <p className="bb-wishlist-msg">Your Cart is empty!</p>
                  ) : (
                    cart.map((item, index) => (
                      <li key={index} className="cart-sidebar-list">
                        <button
                          type="button"
                          className="cart-remove-item"
                          onClick={() => removeItem(item.productId, item.variant.id)}
                        >
                          <i className="ri-close-line"></i>
                        </button>
                        <Link href="/product" className="bb-cart-pro-img">
                          <Image
                            src={item.image}
                            alt={`product-${item.variant.id}`}
                            width={103}
                            height={103}
                          />
                        </Link>
                        <div className="bb-cart-contact">
                          <Link
                            href={`/product/${item.slug}`}
                            className="bb-cart-sub-title"
                          >
                            {item.name}
                          </Link>
                          <span className="cart-price">
                            <span className="new-price">
                              {formatPrice(item.price)}
                            </span>
                            x {item.variant.size}
                          </span>
                          <div className="qty-plus-minus">
                            <div
                              className="dec bb-qtybtn"
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.quantity - 1,
                                  item.variant.id
                                )
                              }
                            >
                              -
                            </div>
                            <input
                              className="qty-input"
                              type="text"
                              value={item.quantity}
                              readOnly
                            />
                            <div
                              className="inc bb-qtybtn"
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.quantity + 1,
                                  item.variant.id
                                )
                              }
                            >
                              +
                            </div>
                          </div>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </div>

              {cart.length == 0 ? (
                <div></div>
              ) : (
                <div className="bb-bottom-cart">
                  <div className="cart-sub-total">
                    <table className="table cart-table">
                      <tbody>
                        <tr>
                          <td className="title">Sub-Total:</td>
                          <td className="price">{formatPrice(subTotal)}</td>
                        </tr>
                        <tr>
                          <td className="title">VAT ({valueAddedTax}%):</td>
                          <td className="price">{formatPrice(vat)}</td>
                        </tr>
                        <tr>
                          <td className="title">Total:</td>
                          <td className="price">{formatPrice(total)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="cart-btn">
                    <Link
                      href="/cart"
                      className="bb-btn-1"
                      onClick={toggleCart}
                    >
                      <span> View Cart </span>
                    </Link>
                    <Link
                      href={`/checkout`}
                      className="bb-btn-2"
                      onClick={toggleCart}
                    >
                      <span> Checkout </span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CartSidebar;
