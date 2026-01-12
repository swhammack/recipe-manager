import { Button, Card, Group, Stack, TextInput, Textarea } from "@mantine/core";

import type { RecipeDto } from "../../queries/dtos.ts";
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { saveRecipe } from "../../queries/recipes.ts";

type EditRecipeProps = {
  recipe: RecipeDto;
  onCancelClick: () => void;
};

export function EditRecipe({ recipe, onCancelClick }: EditRecipeProps) {
  const saveMutation = useMutation({
    mutationFn: saveRecipe,
    onSuccess: () => {
      console.log("Recipe saved successfully");
      onCancelClick();
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
        </form>
      </Stack>
    </Card>
  );
}
