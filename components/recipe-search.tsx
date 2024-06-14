"use client";
import { useState, useEffect } from "react";
import { RecipeList } from "@/components/recipe-list";
import { SearchInput } from "./search-input";
import { getRecipes, Recipe } from "@/db/queries";

export const RecipeSearch = ({
  initialRecipes,
}: {
  initialRecipes: Recipe[];
}) => {
  const [filterText, setFilterText] = useState("");
  const [recipes, setRecipes] = useState(initialRecipes);

  useEffect(() => {
    if (filterText === "") {
      setRecipes(initialRecipes);
      return;
    }
    const fetchRecipesData = async () => {
      const newRecipes = await getRecipes(filterText);
      setRecipes(newRecipes);
    };

    fetchRecipesData();
  }, [filterText]);

  return (
    <>
      <SearchInput
        className="mb-4"
        filterText={filterText}
        onFilterTextChange={setFilterText}
      />
      <RecipeList recipes={recipes} />
    </>
  );
};
