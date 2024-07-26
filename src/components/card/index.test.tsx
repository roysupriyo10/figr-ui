import React from "react";
import "@testing-library/jest-dom";

import { render, cleanup, screen } from "@testing-library/react";

import { Card } from ".";

afterEach(() => {
  cleanup();
});

describe("Button", () => {
  it("renders the Button component", () => {
    const { getByTestId } = render(<Card></Card>);
    const card = getByTestId("card");
    expect(card).toBeInTheDocument();
  });

  it("check if children are getting rendered properly", () => {
    const { getByTestId } = render(<Card>Click me</Card>);
    const card = getByTestId("card");
    expect(card).toHaveTextContent("Click me");
  });

  it("check if header is present", () => {
    const { getByTestId } = render(<Card cardHeader="Custom header" />);
    const card = getByTestId("card");

    const cardHeader = card.querySelector("div > div:nth-child(1)");

    expect(cardHeader).toBeInTheDocument();
  });

  it("check if default header style is present", () => {
    render(
      <Card
        cardHeader={{
          title: "Card title",
          description: "Card description",
        }}
      />,
    );
    const cardDescription = screen.getByText(/card description/i);
    const cardTitle = screen.getByText(/card title/i);

    expect(cardDescription).toBeInTheDocument();
    expect(cardTitle).toBeInTheDocument();
  });
});
