"use client";

import { useMountedState } from "react-use";

import { NewRecipeSheet } from "@/components/recipes/new-recipe-sheet";
import { EditRecipeSheet } from "@/components/recipes/edit-recipe-sheet";

export const SheetProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <NewRecipeSheet />
      <EditRecipeSheet />
    </>
  );
};
