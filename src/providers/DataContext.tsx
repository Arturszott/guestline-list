import { createContext, useState, useEffect, useContext } from "react";
import { useFilters } from "./FiltersContext";
import { FilterValues, hotelType } from "../types";
import API from "../API";

interface DataContextInterface {
  hotels: hotelType[];
}

const DataContext = createContext<DataContextInterface>({
  hotels: [],
});

export function filterHotels(
  hotels: hotelType[],
  filters: FilterValues
): hotelType[] {
  const filteredHotels: hotelType[] = [];

  hotels.forEach((hotel) => {
    if (Number(hotel.starRating) < filters.rating) {
      return false;
    }

    const filteredRooms = hotel.rooms.filter((room) => {
      const enoughForAdults = room.occupancy.maxAdults >= filters.adultCount;
      const enoughForChildren =
        room.occupancy.maxChildren >= filters.childrenCount;

      return enoughForAdults && enoughForChildren;
    });

    if (filteredRooms.length > 0) {
      filteredHotels.push({ ...hotel, rooms: filteredRooms });
    }
  });

  return filteredHotels;
}

export const DataProvider: React.FC<{
  children: React.ReactNode;
  getHotels?: () => Promise<hotelType[]>;
}> = ({ children, getHotels = API.getHotels }) => {
  const [hotels, setHotels] = useState<hotelType[]>([]);
  const filters = useFilters();

  useEffect(() => {
    getHotels().then((data) => {
      setHotels(data);
    });
  }, [getHotels]);

  const value = { hotels: filterHotels(hotels, filters), getHotels };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export function useHotels() {
  const { hotels } = useContext(DataContext);

  return hotels;
}
