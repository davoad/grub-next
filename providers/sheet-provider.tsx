"use client";

import { useMountedState } from "react-use";

import { NewRecipeSheet } from "@/components/recipes/new-recipe-sheet";

export const SheetProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <NewRecipeSheet />
    </>
  );
};
