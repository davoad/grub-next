"use client";
import { z } from "zod";
import { useEffect } from "react";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
  name: z.string().min(1, { message: "Publication name is required" }),
  author: z.string().optional().nullable(),
  edition: z.string().optional().nullable(),
});

type FormValues = z.input<typeof formSchema>;

type Props = {
  id: number | null;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

export const PublicationForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const { isSubmitting } = form.formState;

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues]);

  const handleSubmit = async (values: FormValues) => {
    await onSubmit(values);
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
                  placeholder="No Time to Cook"
                  {...field}
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="author"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder="Donna Hay"
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
          name="edition"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Edition</FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder="Issue 1, 2021"
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
          {id ? "Save changes" : "Create publication"}
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
            Delete publication
          </Button>
        )}
      </form>
    </Form>
  );
};
