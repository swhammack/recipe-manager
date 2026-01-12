import { describe, it, expect, vi } from "vitest";
import { render, screen, userEvent, waitFor } from "../../test-utils";
import { ViewRecipe } from "./ViewRecipe";
import type { RecipeDto } from "../../queries/dtos";

const mockRecipe: RecipeDto = {
  id: "1",
  restaurantId: "res-1",
  name: "Test Recipe",
  yieldAmount: 2,
  yieldUnit: "portions",
  ingredients: "Ingredient 1\nIngredient 2",
  instructions: "Step 1\nStep 2",
};

describe("ViewRecipe", () => {
  it("renders recipe details", () => {
    render(
      <ViewRecipe
        recipe={mockRecipe}
        onEditClick={() => {}}
        handleDelete={() => {}}
      />,
    );

    expect(screen.getByText(mockRecipe.name)).toBeInTheDocument();

    // Check yield
    const yieldValue = screen.getByText((content, element) => {
      return (
        element?.tagName.toLowerCase() === "p" &&
        content.includes("2") &&
        content.includes("portions")
      );
    });
    expect(yieldValue).toBeInTheDocument();

    expect(screen.getByText(/Ingredient 1/)).toBeInTheDocument();
    expect(screen.getByText(/Ingredient 2/)).toBeInTheDocument();
    expect(screen.getByText(/Step 1/)).toBeInTheDocument();
    expect(screen.getByText(/Step 2/)).toBeInTheDocument();
  });

  it("calls onEditClick when Edit button is clicked", async () => {
    const onEditClick = vi.fn();
    render(
      <ViewRecipe
        recipe={mockRecipe}
        onEditClick={onEditClick}
        handleDelete={() => {}}
      />,
    );

    await userEvent.click(screen.getByText("Edit"));
    expect(onEditClick).toHaveBeenCalled();
  });

  it("calls handleDelete when Delete button is clicked and mutation succeeds", async () => {
    const handleDelete = vi.fn();
    render(
      <ViewRecipe
        recipe={mockRecipe}
        onEditClick={() => {}}
        handleDelete={handleDelete}
      />,
    );

    await userEvent.click(screen.getByText("Delete"));

    await waitFor(() => {
      expect(handleDelete).toHaveBeenCalled();
    });
  });
});
