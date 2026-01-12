import { Navbar } from "./Navbar";
import { describe, it, expect } from "vitest";
import { render, userEvent, screen, waitFor } from "../../test-utils";

describe("Navbar", () => {
  it("renders search input", () => {
    render(<Navbar />);
    expect(screen.getByLabelText(/search recipes/i)).toBeInTheDocument();
  });

  it("updates search text when typing", async () => {
    render(<Navbar />);
    const input = screen.getByLabelText(/search recipes/i);
    await userEvent.type(input, "Pasta");
    expect(input).toHaveValue("Pasta");
  });

  it("fetches and displays recipes from MSW", async () => {
    render(<Navbar />);

    // The recipes are defined in src/mocks/recipes.ts
    // One of them is "Lemon Herb Quinoa Salad (Bulk)"
    await waitFor(
      () => {
        expect(
          screen.getByText(/Lemon Herb Quinoa Salad/i),
        ).toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    expect(
      screen.getByText(/Gluten-Free Almond Flour Pancake Batter/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Sesame Ginger Beef Stir-Fry/i),
    ).toBeInTheDocument();
  });
});
