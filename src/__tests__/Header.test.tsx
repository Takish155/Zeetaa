/**
 * @jest-environment jsdom
 */
import Header from "@/_global_components/header/Header";
import { render, screen } from "@testing-library/react";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Header />);

    const heading = screen.getByText(/Zeetaa/i);
    expect(heading).toBeInTheDocument();
  });
});
