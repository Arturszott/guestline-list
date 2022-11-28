import { useHotels } from "../providers/DataContext";
import HotelCard from "./HotelCard";

import "./hotelList.css";

function HotelsList() {
  const hotels = useHotels();

  return (
    <div className="hotelList">
      {hotels.map((hotel) => {
        return <HotelCard key={hotel.id} hotel={hotel} />;
      })}
    </div>
  );
}

export default HotelsList;
