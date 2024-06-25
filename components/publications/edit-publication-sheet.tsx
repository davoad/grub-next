import { z } from "zod";

import { useEditPublication } from "@/hooks/publications/use-edit-publication";
import { PublicationForm } from "@/components/publications/publication-form";
import {
  Publication,
  getPublicationAction,
  updatePublicationAction,
} from "@/db/actions";

import { insertPublicationSchema } from "@/db/schema";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { useEffect, useState } from "react";

const formSchema = insertPublicationSchema.pick({
  name: true,
  author: true,
  edition: true,
});

type FormValues = z.input<typeof formSchema>;

export const EditPublicationSheet = () => {
  const [publication, setPublication] = useState<Publication | null>(null);
  const { id, isOpen, onClose } = useEditPublication();

  useEffect(() => {
    if (!id) return;

    const fetchPublication = async () => {
      const fetchPublication = await getPublicationAction(id);
      setPublication(fetchPublication[0]);
    };

    fetchPublication();
  }, [id]);

  const onSubmit = async (values: FormValues) => {
    if (!id) return;
    await updatePublicationAction(id, values);
    onClose();
  };
  const defaultValues = publication || {
    name: "",
    author: null,
    edition: null,
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Edit Publication</SheetTitle>
        </SheetHeader>

        <PublicationForm
          id={id}
          onSubmit={onSubmit}
          defaultValues={defaultValues}
        />
      </SheetContent>
    </Sheet>
  );
};
