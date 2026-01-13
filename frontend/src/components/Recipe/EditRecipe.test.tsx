import { describe, it, expect, vi } from "vitest";
import { render, screen, userEvent, waitFor } from "../../test-utils";
import { EditRecipe } from "./EditRecipe";
import type { RecipeDto } from "../../queries/dtos";

const mockRecipe: RecipeDto = {
  id: "1",
  restaurantId: "res-1",
  name: "Test Recipe",
  yieldAmount: 2,
  yieldUnit: "portions",
  ingredients: "Ingredients",
  instructions: "Instructions",
};

describe("EditRecipe", () => {
  it("renders form with initial values", () => {
    render(
      <EditRecipe
        recipe={mockRecipe}
        onCancelClick={() => {}}
        handleRecipeSelect={() => {}}
      />,
    );

    expect(screen.getByLabelText(/Name/)).toHaveValue(mockRecipe.name);
    expect(screen.getByLabelText(/Ingredients/)).toHaveValue(
      mockRecipe.ingredients,
    );
    expect(screen.getByLabelText(/Instructions/)).toHaveValue(
      mockRecipe.instructions,
    );
    expect(screen.getByLabelText(/Yield Amount/)).toHaveValue(
      mockRecipe.yieldAmount,
    );
    expect(screen.getByLabelText(/Yield Unit/)).toHaveValue(
      mockRecipe.yieldUnit,
    );
  });

  it("shows validation errors for empty fields", async () => {
    render(
      <EditRecipe
        recipe={mockRecipe}
        onCancelClick={() => {}}
        handleRecipeSelect={() => {}}
      />,
    );

    const nameInput = screen.getByLabelText(/Name/);
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, " "); // Type a space to trigger validation if clear isn't enough

    expect(await screen.findByText("Name is required")).toBeInTheDocument();
    expect(screen.getByText("Save").closest("button")).toBeDisabled();
  });

  it("calls onCancelClick when Cancel button is clicked", async () => {
    const onCancelClick = vi.fn();
    render(
      <EditRecipe
        recipe={mockRecipe}
        onCancelClick={onCancelClick}
        handleRecipeSelect={() => {}}
      />,
    );

    await userEvent.click(screen.getByText("Cancel"));
    expect(onCancelClick).toHaveBeenCalled();
  });

  it("submits the form successfully", async () => {
    const onCancelClick = vi.fn();
    const handleRecipeSelect = vi.fn();
    render(
      <EditRecipe
        recipe={mockRecipe}
        onCancelClick={onCancelClick}
        handleRecipeSelect={handleRecipeSelect}
      />,
    );

    const nameInput = screen.getByLabelText(/Name/);
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, "Updated Recipe");

    await userEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(handleRecipeSelect).toHaveBeenCalled();
      expect(screen.getByText("Recipe saved successfully"));
    });
  });
});
