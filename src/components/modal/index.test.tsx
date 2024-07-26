import React from "react";
import "@testing-library/jest-dom";

import { render, cleanup } from "@testing-library/react";

import { Modal } from ".";

afterEach(() => {
  cleanup();
});

describe("Button", () => {
  it("check if modal trigger text matches", () => {
    const { getByTestId } = render(<Modal trigger="Open modal"></Modal>);
    const modalTrigger = getByTestId("modal-trigger");
    expect(modalTrigger).toBeInTheDocument();
    expect(modalTrigger).toHaveTextContent("Open modal");
  });
  
  // it("check if children are getting rendered properly", () => {
  //   const { getByTestId } = render(<Modal>Click me</Modal>);
  //   const card = getByTestId("card");
  //   expect(card).toHaveTextContent("Click me");
  // });
  //
  // it("check if header is present", () => {
  //   const { getByTestId } = render(<Modal cardHeader="Custom header" />);
  //   const card = getByTestId("card");
  //
  //   const cardHeader = card.querySelector("div > div:nth-child(1)");
  //
  //   expect(cardHeader).toBeInTheDocument();
  // });
  //
  // it("check if default header style is present", () => {
  //   render(
  //     <Modal
  //       cardHeader={{
  //         title: "Modal title",
  //         description: "Modal description",
  //       }}
  //     />,
  //   );
  //   const cardDescription = screen.getByText(/card description/i);
  //   const cardTitle = screen.getByText(/card title/i);
  //
  //   expect(cardDescription).toBeInTheDocument();
  //   expect(cardTitle).toBeInTheDocument();
  // });
});
