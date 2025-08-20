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
import { useEffect, useState } from "react";
import { Combobox } from "../ui/combo-box";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Name is required!",
  }),
  categoryId: z.string().min(1, {
    message: "Category is required!",
  }),
});

interface NewSubCategoryModalProps {
  onClose: () => void;
  isOpen: boolean;
}

export const NewSubCategoryModal = ({ onClose, isOpen }: NewSubCategoryModalProps) => {
  const router = useRouter();
  const [categories, setCategories] = useState<{ label: string; value: string; }[]>([]);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      categoryId: "",
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/category");
        const categoryOptions = response.data.map((cat: { name: string; id: string }) => ({
          label: cat.name,
          value: cat.id,
        }));
        setCategories(categoryOptions);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  const { handleSubmit, formState: { isSubmitting, isValid } } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/sub-category", values);
      toast.success("Sub-Category created");
      onClose();
      router.refresh();
    } catch (error) {
      toast.error("Failed to create sub-category");
      console.error("Error creating sub-category:", error);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create New Sub-Category</AlertDialogTitle>
          <AlertDialogDescription>
            Enter the name of the new sub-category.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Combobox
              options={categories}
              value={form.watch("categoryId")}
              onChange={(value) => form.setValue("categoryId", value)}
            />
          </div>
          <Input
            placeholder="Sub-Category Name"
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
