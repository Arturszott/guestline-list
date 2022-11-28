import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ImageSlider from "./ImageSlider";

const imagesData = [
  { alt: "something", url: "http://test.com/1" },
  { alt: "something", url: "http://test.com/2" },
];

describe("ImageSlider", () => {
  it("should render only one photo at the time", () => {
    render(<ImageSlider images={imagesData} />);

    const images = screen.queryAllByAltText("something");

    expect(images).toHaveLength(1);
  });

  it("should HIDE buttons if there is only one image", () => {
    render(<ImageSlider images={[imagesData[0]]} />);

    const prevButton = screen.queryByText("<");
    const nextButton = screen.queryByText(">");

    expect(prevButton).toBeFalsy();
    expect(nextButton).toBeFalsy();
  });

  it("should SHOW buttons if there is more than one image", () => {
    render(<ImageSlider images={imagesData} />);

    const prevButton = screen.queryByText("<");
    const nextButton = screen.queryByText(">");

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it("should switch image to next one if clicked on the button", () => {
    render(<ImageSlider images={imagesData} />);

    const nextButton = screen.getByText(">");

    userEvent.click(nextButton);

    const image = screen.getByAltText("something");

    expect(image).toHaveAttribute("src", imagesData[1].url);
  });

  it("should continue switch image to next one if clicked on the button endlessly", () => {
    render(<ImageSlider images={imagesData} />);

    const nextButton = screen.getByText(">");

    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);

    expect(screen.getByAltText("something")).toHaveAttribute(
      "src",
      imagesData[1].url
    );

    userEvent.click(nextButton);

    expect(screen.getByAltText("something")).toHaveAttribute(
      "src",
      imagesData[0].url
    );
  });
});
