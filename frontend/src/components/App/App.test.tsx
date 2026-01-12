import { describe, it, expect } from "vitest";
import { render, screen, userEvent, waitFor } from "../../test-utils";
import App from "./App";

describe("App", () => {
  it("renders the main title", () => {
    render(<App />);
    expect(screen.getByText("Recipe Manager")).toBeInTheDocument();
  });

  it("renders the navbar and recipe component", () => {
    render(<App />);
    expect(screen.getByLabelText(/search recipes/i)).toBeInTheDocument();
    expect(screen.getByText("Select Recipe")).toBeInTheDocument();
  });

  it("selects a recipe when clicked in the list", async () => {
    render(<App />);

    // Wait for recipes to load in Navbar
    const recipeItem = await screen.findByText(/Lemon Herb Quinoa Salad/i);

    await userEvent.click(recipeItem);

    // Verify it is displayed in the main area
    expect(screen.getAllByText(/Lemon Herb Quinoa Salad/i)).toHaveLength(2); // One in list, one in view
    expect(screen.getByText("Ingredients")).toBeInTheDocument();
  });

  it("clears selection when a recipe is deleted", async () => {
    render(<App />);

    const recipeItem = await screen.findByText(/Lemon Herb Quinoa Salad/i);
    await userEvent.click(recipeItem);

    const deleteButton = screen.getByText("Delete");
    await userEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.getByText("Select Recipe")).toBeInTheDocument();
    });
  });
});
