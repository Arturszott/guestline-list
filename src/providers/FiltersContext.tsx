import { createContext, useContext, useState } from "react";
import { FiltersContextInterface } from "../types";

const defaultValue = {
  rating: 0,
  adultCount: 2,
  childrenCount: 0,
  setRating: () => {},
  setAdults: () => {},
  setChildren: () => {},
};

const FiltersContext = createContext<FiltersContextInterface>(defaultValue);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [adultCount, setAdults] = useState<number>(2);
  const [childrenCount, setChildren] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);

  const value = {
    rating,
    adultCount,
    childrenCount,
    setAdults,
    setChildren,
    setRating,
  };

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
};

export function useFilters() {
  const filters = useContext(FiltersContext);

  return filters;
}
