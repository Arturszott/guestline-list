import { hotelResponse, roomType, hotelType } from "./types";

const HOTELS_ENDPOINT =
  "https://obmng.dbm.guestline.net/api/hotels?collection-id=OBMNG";
const SINGLE_HOTEL_ENDPOINT =
  "https://obmng.dbm.guestline.net/api/roomRates/OBMNG/";

const API = {
  async getHotels() {
    const response = await fetch(HOTELS_ENDPOINT);
    const hotels: hotelResponse[] = await response.json();

    return Promise.all(
      hotels.map(async (hotel) => {
        const roomsResponse = await fetch(
          `${SINGLE_HOTEL_ENDPOINT}/${hotel.id}`
        );
        const { rooms }: { rooms: roomType[] } = await roomsResponse.json();

        return {
          ...hotel,
          rooms: rooms.map(({ id, name, longDescription, occupancy }) => {
            return {
              id,
              name,
              longDescription,
              occupancy,
            };
          }),
        } as hotelType;
      })
    );
  },
};

export default API;