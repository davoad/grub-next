"use client";
import { useState, useEffect } from "react";
import { PublicationList } from "@/components/publications/publication-list";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/search-input";
import { getPublicationsAction, Publication } from "@/db/actions";
import { useNewPublication } from "@/hooks/publications/use-new-publication";
import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export const PublicationSearch = ({
  initialPublications,
}: {
  initialPublications: Publication[];
}) => {
  const [filterText, setFilterText] = useState("");
  const newPublication = useNewPublication();

  const { data: publications, refetch } = useQuery({
    queryKey: ["publications", filterText],
    queryFn: () => getPublicationsAction(filterText),
    initialData: initialPublications,
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
          onClick={newPublication.onOpen}
          size="default"
          className="flex-none bg-green-600"
        >
          <Plus className="size-4" />
        </Button>
      </div>
      <PublicationList publications={publications} />
    </>
  );
};
