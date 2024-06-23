"use client";

import { useMountedState } from "react-use";

import { NewRecipeSheet } from "@/components/recipes/new-recipe-sheet";
import { EditRecipeSheet } from "@/components/recipes/edit-recipe-sheet";
import { NewPublicationSheet } from "@/components/publications/new-publication-sheet";
import { EditPublicationSheet } from "@/components/publications/edit-publication-sheet";

export const SheetProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <NewRecipeSheet />
      <EditRecipeSheet />
      <NewPublicationSheet />
      <EditPublicationSheet />
    </>
  );
};
