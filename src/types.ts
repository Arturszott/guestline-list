export interface roomType {
  id: string;
  name: string;
  longDescription: string;
  occupancy: {
    maxAdults: number;
    maxChildren: number;
    maxOverall: number;
  };
}

export interface imageType {
  url: string;
  alt: string;
}

export interface hotelResponse {
  id: string;
  name: string;
  address1: string;
  address2: string;
  starRating: string;
  images: imageType[];
}
export interface hotelType extends hotelResponse {
  id: string;
  name: string;
  address1: string;
  address2: string;
  starRating: string;
  images: imageType[];
  rooms: roomType[];
}

type SetterType = (n: number) => void;

export interface FilterValues {
  rating: number;
  adultCount: number;
  childrenCount: number;
}
export interface FiltersContextInterface extends FilterValues {
  setRating: SetterType;
  setAdults: SetterType;
  setChildren: SetterType;
}
