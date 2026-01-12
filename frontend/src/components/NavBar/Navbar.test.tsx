import { Navbar } from "./Navbar";
import { describe, it, expect, vi } from "vitest";
import { render, userEvent, screen, waitFor } from "../../test-utils";

describe("Navbar", () => {
  function setup() {
    const mockHandleRecipeSelect = vi.fn();
    return render(<Navbar handleRecipeSelect={mockHandleRecipeSelect} />);
  }

  it("renders search input", () => {
    setup();
    expect(screen.getByLabelText(/search recipes/i)).toBeInTheDocument();
  });

  it("updates search text when typing", async () => {
    setup();
    const input = screen.getByLabelText(/search recipes/i);
    await userEvent.type(input, "Pasta");
    expect(input).toHaveValue("Pasta");
  });

  it("fetches and displays recipes from MSW", async () => {
    setup();

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
