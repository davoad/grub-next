import { getRecipes } from "@/db/actions";
import { RecipeSearch } from "@/components/recipes/recipe-search";

const initialRecipes = await getRecipes(null);

export default function Home() {
  return (
    <div className="mx-auto bg-gray-100 px-4 py-8">
      <RecipeSearch initialRecipes={initialRecipes} />
    </div>
  );
}
