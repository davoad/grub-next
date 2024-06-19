// recipe-form.tsx
"use client";
import { z } from "zod";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

type Publication = {
  id: number;
  name: string;
  edition: string | null;
};

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
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
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  // TODO: Get pending state from form action
  const disabled = false;

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
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
                  disabled={disabled}
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
                <Select
                  disabled={disabled}
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
                  disabled={disabled}
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
                  disabled={disabled}
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
                  disabled={disabled}
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
                  disabled={disabled}
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

        <Button className="w-full" disabled={disabled}>
          {id ? "Save changes" : "Create recipe"}
        </Button>
        {!!id && (
          <Button
            type="button"
            disabled={disabled}
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
