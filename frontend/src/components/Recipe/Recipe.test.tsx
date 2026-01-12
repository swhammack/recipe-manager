import { Recipe } from "./Recipe";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "../../test-utils";
import type { RecipeDto } from "../../queries/dtos";

const mockRecipe: RecipeDto = {
  id: "1",
  restaurantId: "res-1",
  name: "Test Recipe",
  yieldAmount: 2,
  yieldUnit: "portions",
  ingredients: "100g Ingredient 1\n200ml Ingredient 2",
  instructions: "Test Instructions",
};

describe("Recipe", () => {
  const handleDelete = vi.fn();

  function setup(recipe?: RecipeDto) {
    render(<Recipe recipe={recipe} handleDelete={handleDelete} />);
  }

  it("renders select message when no recipe is provided", () => {
    render(<Recipe handleDelete={handleDelete} />);
    expect(screen.getByText("Select Recipe")).toBeInTheDocument();
  });

  it("renders recipe details", () => {
    setup(mockRecipe);

    expect(screen.getByText("Test Recipe")).toBeInTheDocument();
    expect(screen.getByText("Test Instructions")).toBeInTheDocument();
    expect(screen.getByText(/Ingredient 1/)).toBeInTheDocument();
    expect(screen.getByText(/Ingredient 2/)).toBeInTheDocument();
    expect(screen.getByText(/2 portions/)).toBeInTheDocument();
  });

  it("renders inputs in edit mode", () => {
    setup(mockRecipe);

    fireEvent.click(screen.getByText("Edit"));

    expect(screen.getByLabelText(/Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/)).toHaveValue(mockRecipe.name);
    expect(screen.getByLabelText(/Ingredients/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Ingredients/)).toHaveValue(
      mockRecipe.ingredients,
    );
    expect(screen.getByLabelText(/Instructions/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Instructions/)).toHaveValue(
      mockRecipe.instructions,
    );

    expect(screen.getByLabelText(/Yield Amount/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Yield Unit/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Yield Amount/)).toHaveValue(2);
    expect(screen.getByLabelText(/Yield Unit/)).toHaveValue("portions");
  });

  it("switches back to view mode when cancel is clicked", () => {
    setup(mockRecipe);

    fireEvent.click(screen.getByText("Edit"));
    expect(screen.getByLabelText(/Yield Amount/)).toBeInTheDocument();

    fireEvent.click(screen.getByText("Cancel"));
    expect(screen.queryByLabelText(/Yield Amount/)).not.toBeInTheDocument();
    expect(screen.getByText(mockRecipe.name)).toBeInTheDocument();
  });
});
