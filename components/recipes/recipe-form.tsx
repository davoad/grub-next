"use client";
import { z } from "zod";
import { Trash, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNewPublication } from "@/hooks/publications/use-new-publication";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { useEffect } from "react";

const formSchema = z.object({
  name: z.string().min(1, { message: "Recipe name is required" }),
  pageNumber: z.coerce
    .number({ message: "Page Number must be a number" })
    .optional()
    .nullable(),
  tags: z.string().array().optional().nullable(),
  preparationTime: z.coerce
    .number({ message: "Preparation Time must be a number" })
    .optional()
    .nullable(),
  cookingTime: z.coerce
    .number({ message: "Cooking Time must be a number" })
    .optional()
    .nullable(),
  publicationId: z.coerce.number().nullable().optional(),
});

type FormValues = z.input<typeof formSchema>;

type Props = {
  id: number | null;
  defaultValues?: FormValues;
  onSubmit?: (values: FormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
  publicationOptions: { value: number; label: string }[];
};

export const RecipeForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  publicationOptions,
}: Props) => {
  const newPublication = useNewPublication();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const { isSubmitting } = form.formState;

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  const handleSubmit = async (values: FormValues) => {
    await onSubmit?.(values);
  };

  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 pt-4"
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder="Chocolate cake"
                  {...field}
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="publicationId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Publication</FormLabel>
              <FormControl>
                <>
                  <Select
                    disabled={isSubmitting}
                    value={field.value ? String(field.value) : ""}
                    onValueChange={(value) => field.onChange(parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a publication"></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Publications</SelectLabel>
                        {publicationOptions?.map((publication) => {
                          return (
                            <SelectItem
                              key={publication.value}
                              value={String(publication.value)}
                            >
                              {publication.label}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={(e) => {
                      // prevent the recipe sheet from closing - some weird radix-ui Dialog functionality
                      e.preventDefault();
                      newPublication.onOpen();
                    }}
                    size="default"
                    className="flex-none bg-green-600"
                  >
                    <Plus className="size-4" />
                  </Button>
                </>
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="pageNumber"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Page Number</FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder="10"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="tags"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder="dessert, chocolate"
                  {...field}
                  value={field.value?.join(", ") ?? ""}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value.split(",").map((tag) => tag.trim()),
                    )
                  }
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="preparationTime"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preparation Time (mins)</FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder="30"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="cookingTime"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cooking Time (mins)</FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder="45"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={isSubmitting}>
          {id ? "Save changes" : "Create recipe"}
        </Button>

        {!!id && (
          <Button
            type="button"
            disabled={isSubmitting}
            onClick={handleDelete}
            className="w-full"
            variant="outline"
          >
            <Trash className="mr-2 size-4" />
            Delete recipe
          </Button>
        )}
      </form>
    </Form>
  );
};
