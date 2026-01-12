import { http, HttpResponse } from "msw";
import { recipes } from "./recipes.ts";

export const handlers = [
  http.get("http://localhost:8080/api/recipes", async ({ request }) => {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");

    if (q) {
      const filteredRecipes = recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(q.toLowerCase()),
      );
      return HttpResponse.json(filteredRecipes);
    }

    return HttpResponse.json(recipes);
  }),
];
