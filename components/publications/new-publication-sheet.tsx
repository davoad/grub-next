import { z } from "zod";

import { useNewPublication } from "@/hooks/publications/use-new-publication";
import { PublicationForm } from "@/components/publications/publication-form";
import { createPublicationAction } from "@/db/actions";

import { insertPublicationSchema } from "@/db/schema";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const formSchema = insertPublicationSchema.pick({
  name: true,
  author: true,
  edition: true,
});

type FormValues = z.input<typeof formSchema>;

export const NewPublicationSheet = () => {
  const { isOpen, onClose } = useNewPublication();

  const onSubmit = async (values: FormValues) => {
    await createPublicationAction(values);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Publication</SheetTitle>
        </SheetHeader>

        <PublicationForm
          id={null}
          onSubmit={onSubmit}
          defaultValues={{
            name: "",
            author: null,
            edition: null,
          }}
        />
      </SheetContent>
    </Sheet>
  );
};
