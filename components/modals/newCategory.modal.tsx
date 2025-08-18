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