import "@mantine/core/styles.css";

import { AppShell, Title } from "@mantine/core";
import { Navbar } from "../NavBar/Navbar.tsx";
import { useState } from "react";
import type { RecipeDto } from "../../queries/dtos.ts";
import { Recipe } from "../Recipe/Recipe.tsx";

function App() {
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeDto | undefined>();

  function handleRecipeSelect(recipe: RecipeDto | undefined) {
    console.log("Selected recipe:", recipe);
    setSelectedRecipe(recipe);
  }

  function handleDelete() {
    setSelectedRecipe(undefined);
  }

  return (
    <AppShell header={{ height: 60 }} navbar={{ width: 400, breakpoint: "sm" }}>
      <AppShell.Header>
        <Title order={1}>Recipe Manager</Title>
      </AppShell.Header>
      <AppShell.Navbar>
        <Navbar handleRecipeSelect={handleRecipeSelect} />
      </AppShell.Navbar>
      <AppShell.Main>
        <Recipe
          recipe={selectedRecipe}
          handleRecipeSelect={handleRecipeSelect}
          handleDelete={handleDelete}
        />
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
