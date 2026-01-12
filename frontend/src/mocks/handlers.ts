import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("http://localhost:8080/api/recipes", async () => {
    console.log("GET /recipes");
    return HttpResponse.json([]);
  }),
];
