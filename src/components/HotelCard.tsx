import React from "react";
import { hotelType } from "../types";

import "./hotelCard.css";
import { ImageSlider } from "./ImageSlider";
import StarRating from "./StarRating";

function HotelCard({ hotel }: { hotel: hotelType }) {
  const { name, address1, address2, images, starRating, rooms } = hotel;

  return (
    <article className="hotelCard">
      <header>
        <aside>
          <ImageSlider images={images} />
        </aside>
        <section className="details">
          <h2>{name}</h2>
          <p>{address1}</p>
          <p>{address2}</p>
          <div className="hotel-rating">
            <StarRating rating={Number(starRating)} />
          </div>
        </section>
      </header>
      <section className="rooms">
        {rooms.map((room) => {
          return (
            <div className="room-item" key={room.name}>
              <aside className="details">
                <h3>{room.name}</h3>
                <p>Adults: {room.occupancy.maxAdults}</p>
                <p>Children: {room.occupancy.maxChildren}</p>
              </aside>
              <p className="description">{room.longDescription}</p>
            </div>
          );
        })}
      </section>
    </article>
  );
}

export default React.memo(HotelCard);
