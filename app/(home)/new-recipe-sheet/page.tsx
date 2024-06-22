"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useNewRecipe } from "@/hooks/recipes/use-new-recipe";

export default function NewRecipeSheet() {
  const newRecipe = useNewRecipe();
  return (
    <Button onClick={newRecipe.onOpen} size="sm">
      <Plus className="mr-2 size-4" />
      New recipe
    </Button>
  );
}
