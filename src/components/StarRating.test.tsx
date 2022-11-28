import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StarRating from "./StarRating";

describe("StarRating", () => {
  it("should render 2 full and 3 empty stars with rating of 2", () => {
    render(<StarRating rating={2} />);
    const full = screen.queryAllByText("★");
    const empty = screen.queryAllByText("☆");

    expect(full).toHaveLength(2);
    expect(empty).toHaveLength(3);
  });

  it("should handle click event for each star when handler is passed", () => {
    const onClick = jest.fn();
    render(<StarRating rating={5} setRating={onClick} />);

    const stars = screen.queryAllByText("★");

    userEvent.click(stars[3]);

    expect(onClick).toHaveBeenCalledWith(4);
  });

  it("should not throw if star is clicked without click handler", () => {
    render(<StarRating rating={5} />);

    const stars = screen.queryAllByText("★");

    userEvent.click(stars[3]);
  });
});
