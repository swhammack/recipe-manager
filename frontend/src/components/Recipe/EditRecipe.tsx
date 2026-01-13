import { Button, Card, Group, Stack, TextInput, Textarea } from "@mantine/core";

import type { RecipeDto } from "../../queries/dtos.ts";
import { useForm } from "@mantine/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveRecipe } from "../../queries/recipes.ts";

type EditRecipeProps = {
  recipe: RecipeDto;
  onCancelClick: () => void;
  handleRecipeSelect: (recipe: RecipeDto | undefined) => void;
};

export function EditRecipe({
  recipe,
  onCancelClick,
  handleRecipeSelect,
}: EditRecipeProps) {
  const queryClient = useQueryClient();

  const saveMutation = useMutation({
    mutationFn: saveRecipe,
    onMutate: async (updatedRecipe, context) => {
      await context.client.cancelQueries({ queryKey: ["recipes"] });

      const previousRecipes = queryClient.getQueryData<RecipeDto[]>([
        "recipes",
      ]);

      context.client.setQueryData<RecipeDto[]>(["recipes"], (oldData) => {
        if (!oldData) return [recipe];
        return oldData.map((recipe) =>
          recipe.id === updatedRecipe.id ? updatedRecipe : recipe,
        );
      });

      return { previousRecipes };
    },
    onSuccess: (data) => {
      console.log("Recipe saved successfully:", data);
    },
    onError: (error, _variables, onMutateResult, context) => {
      console.log("An error occurred during save: ", error.message);
      if (onMutateResult?.previousRecipes) {
        context.client.setQueryData<RecipeDto[]>(
          ["recipes"],
          onMutateResult.previousRecipes,
        );
      }
    },
    onSettled: async (data, _error, _variables, _onMutateResult, context) => {
      await context.client.invalidateQueries({ queryKey: ["recipes"] });
      handleRecipeSelect(data);
    },
  });

  const form = useForm({
    mode: "uncontrolled",
    validateInputOnChange: true,
    initialValues: recipe,

    validate: {
      name: (value) => (value.trim() === "" ? "Name is required" : null),
      instructions: (value) =>
        value.trim() === "" ? "Instructions are required" : null,
      ingredients: (value) =>
        value.trim() === "" ? "Ingredients are required" : null,
      yieldAmount: (value) =>
        value <= 0 ? "Yield amount must be greater than 0" : null,
      yieldUnit: (value) =>
        value.trim() === "" ? "Yield unit is required" : null,
    },
  });

  function onSubmit(values: RecipeDto) {
    console.log("Submitting recipe:", values);
    saveMutation.mutate(values);
  }

  return (
    <Card padding="md">
      <Stack>
        {saveMutation.isError ? (
          <div>An error occurred during save: {saveMutation.error.message}</div>
        ) : null}
        <form onSubmit={form.onSubmit(onSubmit)}>
          <TextInput
            withAsterisk
            label="Name"
            key={form.key("name")}
            {...form.getInputProps("name")}
          />
          <Textarea
            withAsterisk
            autosize
            label="Ingredients"
            key={form.key("ingredients")}
            {...form.getInputProps("ingredients")}
          />
          <Textarea
            withAsterisk
            autosize
            label="Instructions"
            key={form.key("instructions")}
            {...form.getInputProps("instructions")}
          />

          <Group>
            <TextInput
              withAsterisk
              label="Yield Amount"
              type="number"
              key={form.key("yieldAmount")}
              {...form.getInputProps("yieldAmount")}
            />
            <TextInput
              withAsterisk
              label="Yield Unit"
              key={form.key("yieldUnit")}
              {...form.getInputProps("yieldUnit")}
            />
          </Group>

          <Group>
            <Button type="submit" disabled={!form.isValid()}>
              Save
            </Button>
            <Button onClick={onCancelClick}>Cancel</Button>
          </Group>
          {saveMutation.isSuccess && <div>Recipe saved successfully</div>}
          {saveMutation.isError && <div>An error occurred during save</div>}
        </form>
      </Stack>
    </Card>
  );
}
