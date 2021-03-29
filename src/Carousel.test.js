import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it("renders without crashing", () => {
  render(<Carousel />);
});

it("matches snapshot", () => {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).not.toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).toBeInTheDocument();
});

it("works when you click on the left arrow", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).not.toBeInTheDocument();

  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);
  // move backward in the carousel from image 2
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the second or third
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).not.toBeInTheDocument();
  expect(
    queryByAltText("Photo by Josh Post on Unsplash")
  ).not.toBeInTheDocument();
});

it("hides the back arrow on the first page", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);
  // expect the first image to show, but not the back arrow

  const leftArrow = queryByTestId("left-arrow");
  const rightArrow = queryByTestId("right-arrow");
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).toBeInTheDocument();
  expect(leftArrow.style._values.visibility).toContain("hidden");
  expect(rightArrow.style._values.visibility).toContain("visible");
});

it("hides the forward arrow on the last page", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);
  // expect the first image to show, but not the back arrow
  const leftArrow = queryByTestId("left-arrow");
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  expect(queryByAltText("Photo by Josh Post on Unsplash")).toBeInTheDocument();
  expect(leftArrow.style._values.visibility).toContain("visible");
  expect(rightArrow.style._values.visibility).toContain("hidden");
});

it("shows both arrows on second page", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);
  // expect the first image to show, but not the back arrow
  const leftArrow = queryByTestId("left-arrow");
  const rightArrow = queryByTestId("right-arrow");

  fireEvent.click(rightArrow);

  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).toBeInTheDocument();
  expect(leftArrow.style._values.visibility).toContain("visible");
  expect(rightArrow.style._values.visibility).toContain("visible");
});
