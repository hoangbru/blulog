import Link from "next/link";
import Image from "next/image";

import { Product } from "@/types/post";
import RatingStar from "@/components/template/RatingStar";
import { useWishlist } from "@/context/WishlistContext";
import { formatPrice } from "@/utils/format";

type RelatedItemProps = { product: Product };

const RelatedItem = ({ product }: RelatedItemProps) => {
  const { wishlist } = useWishlist();
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  return (
    <div className="bb-deal-card mb-24">
      <div className="bb-pro-box">
        <div className="bb-pro-img">
          <span className="flags">
            <span>Hot</span>
          </span>
          <Link href={`/product/${product.slug}`}>
            <div className="inner-img">
              <Image
                className="main-img"
                src={product.images[0]}
                alt={`product-${product.slug}`}
                width={260}
                height={260}
              />
              <Image
                className="hover-img"
                src={product.images[1]}
                alt={`product-${product.slug}`}
                width={260}
                height={260}
              />
            </div>
          </Link>
          <ul className="bb-pro-actions">
            <li className={`bb-btn-group ${isInWishlist && "active"}`}>
              <div>
                <i
                  className={isInWishlist ? "ri-heart-fill" : "ri-heart-line"}
                ></i>
              </div>
            </li>
            <li className="bb-btn-group">
              <a href="#" title="Add To Cart">
                <i className="ri-shopping-bag-4-line"></i>
              </a>
            </li>
          </ul>
        </div>
        <div className="bb-pro-contact">
          <div className="bb-pro-subtitle">
            <span>{product?.category?.name}</span>
            <RatingStar rating={product.rating} />
          </div>
          <h4 className="bb-pro-title">
            <Link href={`/product/${product.slug}`}>{product.name}</Link>
          </h4>
          <div className="bb-price">
            <div className="inner-price">
              <span className="new-price">{formatPrice(product.price)}</span>
              <span
                className={`${product.stock === 0 ? "item-left" : "old-price"}`}
              >
                {product.stock === 0
                  ? "Out of stock"
                  : formatPrice(product.price)}
              </span>
            </div>
            <div className="last-items">
              {product.variants.map((item) => item.size).join(", ")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedItem;
