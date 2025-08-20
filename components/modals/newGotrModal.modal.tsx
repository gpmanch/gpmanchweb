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

const gotrSchema = z
  .object({
    nameHi: z.string().min(1, { message: "Name in Hindi is required" }),
    nameEn: z.string().min(1, { message: "Name in English is required" }),
  })
  .refine(
    (data) => data.nameHi.trim().length > 0 || data.nameEn.trim().length > 0,
    {
      message: "At least one language (Hindi or English) must be filled",
      path: ["nameHi"],
    }
  );

interface NewGotrModalProps {
  onClose: () => void;
  isOpen: boolean;
}

export const NewGotrModal = ({ onClose, isOpen }: NewGotrModalProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof gotrSchema>>({
    resolver: zodResolver(gotrSchema),
    mode: "onChange",
    defaultValues: {
      nameHi: "",
      nameEn: "",
    },
  });

  const { handleSubmit, register, formState: { isSubmitting, isValid } } = form;

  const onSubmit = async (values: z.infer<typeof gotrSchema>) => {
    try {
      const response = await axios.post("/api/gotr", values);
      toast.success(response.data.message || "Gotr added successfully");
      form.reset();
      onClose();
      router.refresh();
    } catch (error) {
      toast.error("Failed to add gotr");
      console.error("Error creating gotr:", error);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent className="max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>Add New Gotr</AlertDialogTitle>
          <AlertDialogDescription>
            Fill at least one language (Hindi or English) for Name.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <Input placeholder="Name (English)" {...register("nameEn")} />
          <Input placeholder="Name (Hindi)" {...register("nameHi")} />

          <AlertDialogFooter>
            <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit" disabled={!isValid || isSubmitting}>
              Add
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
