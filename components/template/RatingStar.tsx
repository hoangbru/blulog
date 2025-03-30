import { FC } from "react";

import { Rating } from "@/types/post";

interface RatingStarProps {
  rating: Rating;
}

const RatingStar: FC<RatingStarProps> = ({ rating }) => {
  return (
    <span className="bb-pro-rating">
      {[...Array(5)].map((_, i) => (
        <i
          key={i}
          className={
            i + 1 <= Math.floor(rating.average)
              ? "ri-star-fill"
              : i < rating.average
              ? "ri-star-half-line"
              : "ri-star-line"
          }
        ></i>
      ))}
    </span>
  );
};

export default RatingStar;
