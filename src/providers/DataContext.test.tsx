import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { DataProvider, filterHotels, useHotels } from "./DataContext";
import { FilterValues, hotelType } from "../types";

function TestComponent() {
  const hotels = useHotels();

  return <>{hotels.map((hotel) => hotel.name)}</>;
}

const allHotels: hotelType[] = [
  {
    name: "hotel 1",
    images: [],
    address1: "",
    address2: "",
    id: "1",
    rooms: [
      {
        id: "1",
        name: "room 1",
        occupancy: {
          maxAdults: 1,
          maxChildren: 1,
          maxOverall: 1,
        },
        longDescription: "",
      },
    ],
    starRating: "4",
  },
  {
    name: "hotel 1",
    images: [],
    address1: "",
    address2: "",
    id: "1",
    rooms: [
      {
        id: "1",
        name: "room 1",
        occupancy: {
          maxAdults: 2,
          maxChildren: 0,
          maxOverall: 2,
        },
        longDescription: "",
      },
      {
        id: "2",
        name: "room 2",
        occupancy: {
          maxAdults: 1,
          maxChildren: 0,
          maxOverall: 1,
        },
        longDescription: "",
      },
    ],
    starRating: "4",
  },
];

describe("DataContext", () => {
  it("calls passed API method to get hotels and filters hotels with available rooms", async () => {
    const mockedGetHotels = jest.fn().mockResolvedValue([
      {
        name: "hotel",
        rooms: [{ occupancy: { maxAdults: 2, maxChildren: 2 } }],
      },
    ]);

    render(
      <DataProvider getHotels={mockedGetHotels}>
        <TestComponent />
      </DataProvider>
    );

    expect(mockedGetHotels).toHaveBeenCalledTimes(1);
    await waitFor(() => screen.findByText("hotel"));
  });

  describe("filterHotels", () => {
    it("should only return hotels having rooms that matches a filter", () => {
      const filters: FilterValues = {
        rating: 0,
        childrenCount: 0,
        adultCount: 2,
      };

      const filteredHotels = filterHotels(allHotels, filters);

      expect(filteredHotels).toHaveLength(1);
      expect(filteredHotels[0].rooms).toHaveLength(1);
    });

    it("should return all hotels and rooms if filters match all rooms", () => {
      const filters: FilterValues = {
        rating: 0,
        childrenCount: 0,
        adultCount: 0,
      };

      const filteredHotels = filterHotels(allHotels, filters);

      expect(filteredHotels).toHaveLength(2);
      expect(filteredHotels[1].rooms).toHaveLength(2);
    });
  });
});
