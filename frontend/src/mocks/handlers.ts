import { http, HttpResponse } from "msw";
import { recipeMocks } from "./recipeMocks.ts";

export const handlers = [
  http.get("http://localhost:8080/api/recipes", async ({ request }) => {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");

    if (q) {
      const filteredRecipes = recipeMocks.filter((recipe) =>
        recipe.name.toLowerCase().includes(q.toLowerCase()),
      );
      return HttpResponse.json(filteredRecipes);
    }

    return HttpResponse.json(recipeMocks);
  }),
  http.put("http://localhost:8080/api/recipes/:id", async ({ request }) => {
    const recipe = await request.json();
    return HttpResponse.json(recipe);
  }),
  http.delete("http://localhost:8080/api/recipes/:id", async () => {
    return HttpResponse.json({});
  }),
];
