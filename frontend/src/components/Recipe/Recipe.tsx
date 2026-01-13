import type { RecipeDto } from "../../queries/dtos.ts";
import { Card, Text } from "@mantine/core";

import { useState } from "react";
import { ViewRecipe } from "./ViewRecipe.tsx";
import { EditRecipe } from "./EditRecipe.tsx";

type RecipeProps = {
  recipe?: RecipeDto;
  handleRecipeSelect: (recipe: RecipeDto | undefined) => void;
  handleDelete: () => void;
};

export function Recipe({
  recipe,
  handleRecipeSelect,
  handleDelete,
}: RecipeProps) {
  const [editing, setEditing] = useState(false);

  if (!recipe) {
    return (
      <Card>
        <Text c="dimmed" ta="center" py="xl">
          Select Recipe
        </Text>
      </Card>
    );
  }

  if (editing) {
    return (
      <EditRecipe
        recipe={recipe}
        handleRecipeSelect={handleRecipeSelect}
        onCancelClick={() => setEditing(false)}
      />
    );
  }

  return (
    <ViewRecipe
      recipe={recipe}
      handleDelete={handleDelete}
      onEditClick={() => setEditing(true)}
    />
  );
}
