import { RecipeList } from "./RecipeList";
import { vi, describe, it, expect } from "vitest";
import { render, screen } from "../../test-utils";
import type { RecipeDto } from "../../queries/dtos";

const mockRecipes: RecipeDto[] = [
  {
    id: "1",
    restaurantId: "res-1",
    name: "Recipe 1",
    yieldAmount: 2,
    yieldUnit: "portions",
    ingredients: "",
    instructions: "Steps 1",
  },
  {
    id: "2",
    restaurantId: "res-1",
    name: "Recipe 2",
    yieldAmount: 500,
    yieldUnit: "g",
    ingredients: "",
    instructions: "Steps 2",
  },
];

describe("RecipeList", () => {
  function setup(recipes?: RecipeDto[]) {
    const handle = vi.fn();
    return render(<RecipeList recipes={recipes} handleRecipeSelect={handle} />);
  }

  it("renders no recipes found when recipes is undefined or empty", () => {
    setup(undefined);
    expect(screen.getByText("No recipes found")).toBeInTheDocument();
  });

  it("renders no recipes found when recipes is empty", () => {
    setup([]);
    expect(screen.getByText("No recipes found")).toBeInTheDocument();
  });

  it("renders a list of recipes", () => {
    setup(mockRecipes);

    expect(screen.getByText("Recipe 1")).toBeInTheDocument();
    expect(screen.getByText("Recipe 2")).toBeInTheDocument();
  });

  it("displays recipe yield information", () => {
    setup(mockRecipes);

    expect(screen.getByText("2 portions")).toBeInTheDocument();
    expect(screen.getByText("500 g")).toBeInTheDocument();
  });
});
