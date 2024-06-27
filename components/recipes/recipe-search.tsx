"use client";
import { useState, useEffect } from "react";
import { RecipeList } from "@/components/recipes/recipe-list";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/search-input";
import { getRecipesAction, Recipe } from "@/db/actions";
import { useNewRecipe } from "@/hooks/recipes/use-new-recipe";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";

export const RecipeSearch = ({
  initialRecipes,
}: {
  initialRecipes: Recipe[];
}) => {
  const [filterText, setFilterText] = useState("");
  const newRecipe = useNewRecipe();

  const { data: recipes, refetch } = useQuery({
    queryKey: ["recipes", filterText],
    queryFn: () => getRecipesAction(filterText),
    initialData: initialRecipes,
  });

  useEffect(() => {
    refetch();
  }, [filterText, refetch]);

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
