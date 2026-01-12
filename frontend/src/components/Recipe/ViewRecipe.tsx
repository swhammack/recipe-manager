import { Button, Card, Group, Stack, Title, Text } from "@mantine/core";

import classes from "./ViewRecipe.module.css";
import type { RecipeDto } from "../../queries/dtos.ts";
import { useMutation } from "@tanstack/react-query";
import { deleteRecipe } from "../../queries/recipes.ts";

type ViewRecipeProps = {
  recipe: RecipeDto;
  onEditClick: () => void;
  handleDelete: () => void;
};

export function ViewRecipe({
  recipe,
  onEditClick,
  handleDelete,
}: ViewRecipeProps) {
  const deleteMutation = useMutation({
    mutationFn: deleteRecipe,
    onSuccess: () => {
      console.log("Recipe deleted successfully");
      handleDelete();
    },
  });

  return (
    <Card padding="md">
      {deleteMutation.isError ? (
        <div>
          An error occurred during delete: {deleteMutation.error.message}
        </div>
      ) : null}
      <Stack>
        <Title order={3}>{recipe.name}</Title>
        <Title order={4}>Ingredients</Title>
        <Text className={classes.linebreaks}>{recipe.ingredients}</Text>
        <Title order={4}>Instructions</Title>
        <Text className={classes.linebreaks}>{recipe.instructions}</Text>
        <Title order={4}>Yield</Title>
        <Text>
          {recipe.yieldAmount} {recipe.yieldUnit}
        </Text>
        <Group>
          <Button onClick={onEditClick}>Edit</Button>
          <Button color="red" onClick={() => deleteMutation.mutate(recipe.id)}>
            Delete
          </Button>
        </Group>
      </Stack>
    </Card>
  );
}
