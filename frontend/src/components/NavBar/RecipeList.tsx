import type { RecipeDto } from "../../queries/dtos.ts";
import { Card, Stack, Text } from "@mantine/core";

import classes from "./RecipeList.module.css";

type RecipeListProps = {
  recipes?: RecipeDto[];
};

export function RecipeList({ recipes }: RecipeListProps) {
  const hasRecipes = recipes && recipes.length > 0;

  return (
    <Stack className={classes.stack}>
      {hasRecipes ? (
        recipes.map((recipe) => (
          <Card
            className={classes.card}
            key={recipe.id}
            shadow="sm"
            padding="sm"
            withBorder
          >
            <Text size="md">{recipe.title}</Text>
            <Text size="sm" c="dimmed">
              {recipe.yieldAmount} {recipe.yieldUnit}
            </Text>
          </Card>
        ))
      ) : (
        <Text c="dimmed" ta="center" py="xl">
          No recipes found
        </Text>
      )}
    </Stack>
  );
}
