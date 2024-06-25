"use client";
import { useState, useEffect } from "react";
import { RecipeList } from "@/components/recipes/recipe-list";
import { Button } from "@/components/ui/button";
import { SearchInput } from "../search-input";
import { getRecipesAction, Recipe } from "@/db/actions";
import { useNewRecipe } from "@/hooks/recipes/use-new-recipe";
import { Plus } from "lucide-react";

export const RecipeSearch = ({
  initialRecipes,
}: {
  initialRecipes: Recipe[];
}) => {
  const [filterText, setFilterText] = useState("");
  const [recipes, setRecipes] = useState(initialRecipes);
  const newRecipe = useNewRecipe();

  useEffect(() => {
    if (filterText === "") {
      setRecipes(initialRecipes);
      return;
    }
    const fetchRecipesData = async () => {
      const newRecipes = await getRecipesAction(filterText);
      setRecipes(newRecipes);
    };

    fetchRecipesData();
  }, [filterText]);

  return (
    <>
      <div className="max-4-xl mb-4 flex items-center justify-center gap-4">
        <SearchInput
          className="flex-1"
          filterText={filterText}
          onFilterTextChange={setFilterText}
        />
        <Button
          onClick={newRecipe.onOpen}
          size="default"
          className="flex-none bg-green-600"
        >
          <Plus className="size-4" />
        </Button>
      </div>
      <RecipeList recipes={recipes} />
    </>
  );
};
