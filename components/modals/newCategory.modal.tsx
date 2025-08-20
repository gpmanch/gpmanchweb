"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Name is required!",
  }),
  headingEn: z.string().min(1, {
    message: "English heading is required!",
  }),
  headingHi: z.string().min(1, {
    message: "Hindi heading is required!",
  }),
  descriptionEn: z.string().min(1, {
    message: "English description is required!",
  }),
  descriptionHi: z.string().min(1, {
    message: "Hindi description is required!",
  }),
});

interface NewCategoryModalProps {
  onClose: () => void;
  isOpen: boolean;
}

export const NewCategoryModal = ({ onClose, isOpen }: NewCategoryModalProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      headingEn: "",
      headingHi: "",
      descriptionEn: "",
      descriptionHi: "",
    },
  });

  const { handleSubmit, formState: { isSubmitting, isValid } } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/category", values);
      toast.success("Category created");
      form.reset();
      onClose();
      router.refresh();
    } catch (error) {
      toast.error("Failed to create category");
      console.error("Error creating category:", error);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create New Category</AlertDialogTitle>
          <AlertDialogDescription>
            Enter the name of the new category.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            placeholder="Category Name"
            {...form.register("title")}
            className="input"
          />
          <div className="space-y-2">
            <label className="text-sm font-medium">Heading</label>
            <Input
              placeholder="English Heading"
              {...form.register("headingEn")}
              className="input"
            />
            <Input
              placeholder="Hindi Heading"
              {...form.register("headingHi")}
              className="input"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <textarea
              placeholder="English Description"
              {...form.register("descriptionEn")}
              className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
              rows={3}
            />
            <textarea
              placeholder="Hindi Description"
              {...form.register("descriptionHi")}
              className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
              rows={3}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit" disabled={!isValid || isSubmitting}>
              Create
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};