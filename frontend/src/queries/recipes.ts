import { kyClient } from "./kyClient.ts";
import type { RecipeDto } from "./dtos.ts";

export const recipeSearch = async (searchText: string) => {
  const searchParams = new URLSearchParams();
  if (searchText != "") {
    searchParams.append("q", searchText);
  }
  const response = await kyClient.get<RecipeDto[]>(`recipes`, { searchParams });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const saveRecipe = async (recipe: RecipeDto) => {
  const response = await kyClient.put(`recipes/${recipe.id}`, { json: recipe });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
};

export const deleteRecipe = async (id: string) => {
  const response = await kyClient.delete(`recipes/${id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
};
