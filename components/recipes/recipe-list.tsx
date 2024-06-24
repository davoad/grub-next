import { Timer, Star, Tag, Pencil, StarIcon } from "lucide-react";
import { Recipe } from "@/db/actions";
import { Button } from "@/components/ui/button";
import { useEditRecipe } from "@/hooks/recipes/use-edit-recipe";
import { useRateRecipe } from "@/hooks/recipes/use-rate-recipe";

type Props = {
  recipes?: Recipe[];
};

export const RecipeList = ({ recipes }: Props) => {
  const { onOpen: onOpenRecipe } = useEditRecipe();
  const { onOpen: onOpenRating } = useRateRecipe();

  const onEdit = (id: number) => {
    onOpenRecipe(id);
  };

  const onRate = (id: number) => {
    onOpenRating(id);
  };

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {recipes?.map((recipe) => {
        let totalTime =
          (recipe.preparationTime ?? 0) + (recipe.cookingTime ?? 0);
        return (
          <li
            key={recipe.id}
            className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
          >
            <div className="flex w-full items-center justify-between p-6">
              <div className="truncate">
                <h3 className="truncate text-sm font-medium text-gray-900">
                  {recipe.name}
                </h3>
                <div className="mt-1 truncate text-xs text-gray-800">
                  {recipe.publicationEdition
                    ? `${recipe.publicationName}, ${recipe.publicationEdition}`
                    : recipe.publicationName}
                </div>
                <div className="mt-1 truncate text-xs text-gray-500">
                  {recipe.author}
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  Page {recipe.pageNumber}
                </div>

                <div className="mt-2 flex gap-1">
                  <Tag
                    className="h-5 w-5 flex-none text-gray-400"
                    aria-hidden="true"
                  />
                  <ul className="flex gap-1">
                    {recipe.tags!.map((tag) => (
                      <li
                        key={tag}
                        className="items-center truncate rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium lowercase text-green-700 ring-1 ring-inset ring-green-600/20"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <Button onClick={() => onEdit(recipe.id)} size="icon">
                  <Pencil className="size-4" />
                </Button>
                <Button onClick={() => onRate(recipe.id)} size="icon">
                  <StarIcon className="size-4" />
                </Button>
              </div>
            </div>

            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="flex w-0 flex-1">
                  <a className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                    <Timer
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    {totalTime === 0 ? "NA" : `${totalTime} mins`}
                  </a>
                </div>
                <div className="-ml-px flex w-0 flex-1">
                  <a className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                    <Star
                      className="h-5 w-5 fill-yellow-500 text-yellow-500"
                      aria-hidden="true"
                    />
                    {recipe.rating ?? "NA"}
                  </a>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
