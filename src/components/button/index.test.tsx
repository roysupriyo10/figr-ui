import React from "react";
import "@testing-library/jest-dom";

import { render, cleanup } from "@testing-library/react";

import { Button } from ".";

afterEach(() => {
  cleanup();
});

describe("Button", () => {
  it("renders the Button component", () => {
    const { getByTestId } = render(<Button></Button>);
    const button = getByTestId("button");
    expect(button).toBeInTheDocument();
  });

  it("check if children are getting rendered properly", () => {
    const { getByTestId } = render(<Button>Click me</Button>);
    const button = getByTestId("button");
    expect(button).toHaveTextContent("Click me");
  });

  it("check if loading icon is shown when isLoading is true", () => {
    const { getByTestId } = render(<Button isLoading />);
    const button = getByTestId("button");

    const loadingIcon = button.querySelector("button > svg");

    expect(loadingIcon).toBeInTheDocument();
  });
});
