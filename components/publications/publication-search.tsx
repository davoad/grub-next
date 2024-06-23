"use client";
import { useState, useEffect } from "react";
import { PublicationList } from "@/components/publications/publication-list";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/search-input";
import { getPublications, Publication } from "@/db/actions";
import { useNewPublication } from "@/hooks/publications/use-new-publication";
import { Plus } from "lucide-react";

export const PublicationSearch = ({
  initialPublications,
}: {
  initialPublications: Publication[];
}) => {
  const [filterText, setFilterText] = useState("");
  const [publications, setPublications] = useState(initialPublications);
  const newPublication = useNewPublication();

  useEffect(() => {
    if (filterText === "") {
      setPublications(initialPublications);
      return;
    }
    const fetchPublicationsData = async () => {
      const newPublications = await getPublications(filterText);
      setPublications(newPublications);
    };

    fetchPublicationsData();
  }, [filterText]);

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
