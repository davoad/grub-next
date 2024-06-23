import { Pencil } from "lucide-react";
import { Publication } from "@/db/actions";
import { Button } from "@/components/ui/button";
import { useEditPublication } from "@/hooks/publications/use-edit-publication";

type Props = {
  publications?: Publication[];
};

export const PublicationList = ({ publications }: Props) => {
  const { onOpen: onOpenPublication } = useEditPublication();

  const onEdit = (id: number) => {
    onOpenPublication(id);
  };
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {publications?.map((publication) => {
        return (
          <li
            key={publication.id}
            className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
          >
            <div className="flex w-full items-center justify-between p-6">
              <div className="truncate">
                <h3 className="truncate text-sm font-medium text-gray-900">
                  {publication.name}
                </h3>
                <div className="mt-1 truncate text-xs text-gray-800">
                  {publication.edition}
                </div>
                <div className="mt-1 truncate text-xs text-gray-500">
                  {publication.author}
                </div>
              </div>
            </div>
            <div>
              <Button onClick={() => onEdit(publication.id)} size="icon">
                <Pencil className="size-4" />
              </Button>
            </div>
          </li>
        );
      })}
      ;
    </ul>
  );
};
