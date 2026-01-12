import { Loader, TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { RecipeList } from "./RecipeList.tsx";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { recipeSearch } from "../../queries/recipes.ts";

import classes from "./Navbar.module.css";
import type { RecipeDto } from "../../queries/dtos.ts";

interface NavbarProps {
  handleRecipeSelect: (recipe: RecipeDto) => void;
}

export function Navbar({ handleRecipeSelect }: NavbarProps) {
  const [searchText, setSearchText] = useState("");
  const [debounced] = useDebouncedValue(searchText, 200);

  const recipeSearchQuery = useQuery({
    queryKey: ["recipes", debounced],
    queryFn: () => recipeSearch(debounced),
  });

  return (
    <>
      <TextInput
        className={classes.input}
        label="Search Recipes"
        value={searchText}
        onChange={(e) => setSearchText(e.currentTarget.value)}
        rightSection={recipeSearchQuery.isLoading ? <Loader size="xs" /> : null}
      ></TextInput>
      <RecipeList
        recipes={recipeSearchQuery.data}
        handleRecipeSelect={handleRecipeSelect}
      />
    </>
  );
}
