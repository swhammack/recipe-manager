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
