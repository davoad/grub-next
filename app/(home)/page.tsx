import { Timer, Star, Tag } from "lucide-react";

let recipes = [
  {
    id: 2,
    name: "Steak with Cherry Tomatoes and Cannellini Beans",
    page_number: 66,
    publication_id: 2,
    website_id: null,
    tags: ["Beef", "Tomato", "Cannellini beans"],
    created_at: "2015-01-10T22:25:32.516876",
    updated_at: "2015-01-10T22:25:32.516876",
    preparation_time: 60,
    cooking_time: null,
    rating: 4.5,
    author: "Bill Granger",
    publication_name: "Every Day",
  },
  {
    id: 3,
    name: "Crunchy Parmesan-Crumbed Chicken",
    page_number: 128,
    publication_id: 3,
    website_id: null,
    tags: ["Chicken", "Parmesan Cheese", "Lime", "Chilli", "Garlic"],
    created_at: "2015-01-12T11:27:55.232242",
    updated_at: "2015-03-29T22:27:14.942451",
    preparation_time: 10,
    cooking_time: 15,
    rating: 3.8,
    author: "Donna Hay",
    publication_name:
      "No Time to Cook is a long title that will span multiple lines",
  },
];
export default function Home() {
  return (
    <div className="mx-auto bg-gray-100 px-4 py-8">
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {[...recipes, ...recipes, ...recipes].map((recipe) => (
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
                  {recipe.publication_name}
                </div>
                <div className="mt-1 truncate text-xs text-gray-500">
                  {recipe.author}
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  Page {recipe.page_number}
                </div>

                <div className="mt-2 flex gap-1">
                  <Tag
                    className="h-5 w-5 flex-none text-gray-400"
                    aria-hidden="true"
                  />
                  <ul className="flex gap-1">
                    {recipe.tags.map((tag) => (
                      <li
                        key={tag}
                        className="items-center truncate rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="flex w-0 flex-1">
                  <a
                    href={`mailto:${recipe.name}`}
                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                  >
                    <Timer
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    {recipe.preparation_time} mins
                  </a>
                </div>
                <div className="-ml-px flex w-0 flex-1">
                  <a
                    href={`tel:${recipe.id}`}
                    className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                  >
                    <Star
                      className="h-5 w-5 fill-yellow-300 text-gray-400"
                      aria-hidden="true"
                    />
                    {recipe.rating}
                  </a>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
