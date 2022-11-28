import React from "react";

import "./starRating.css";

interface RatingProps {
  rating: number;
  setRating?: (n: number) => void;
}

function StarRating({ rating, setRating }: RatingProps) {
  const stars = [];

  for (let i = 0; i < 5; i++) {
    stars.push(i < rating ? "★" : "☆");
  }

  return (
    <div className="star-rating">
      {stars.map((content, i) => (
        <span onClick={() => setRating && setRating(i + 1)} key={i}>
          {content}
        </span>
      ))}
    </div>
  );
}

export default React.memo(StarRating);
