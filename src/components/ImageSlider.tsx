import { useState } from "react";
import { imageType } from "../types";

import "./imageSlider.css";

export function ImageSlider({ images }: { images: imageType[] }) {
  const [counter, setCounter] = useState(0);

  const currentIndex = Math.abs(counter % images.length);
  const shouldShowButtons = images.length > 1;

  return (
    <div className="image-slider">
      <img src={images[currentIndex].url} alt={images[currentIndex].alt} />

      {shouldShowButtons && (
        <>
          <button
            className="prev"
            onClick={() => setCounter((prev) => prev - 1)}
          >
            {"<"}
          </button>
          <button
            className="next"
            onClick={() => setCounter((prev) => prev + 1)}
          >
            {">"}
          </button>
        </>
      )}
    </div>
  );
}

export default ImageSlider;
