"use client";

import {
  AlertDialog,
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
import React from "react";
import { Button } from "../ui/button";

const gotrSchema = z
  .object({
    nameHi: z.string().min(1, { message: "Name in Hindi is required" }),
    nameEn: z.string().min(1, { message: "Name in English is required" }),
  })
  .refine(
    (data) => data.nameHi.trim().length > 0 || data.nameEn.trim().length > 0,
    {
      message: "At least one language (Hindi or English) must be filled",
      path: ["name_hi"],
    }
  );

interface Gotr {
  id: string;
  nameHi?: string;
  nameEn?: string;
}

interface ApproveGotrModalProps {
  gotr: Gotr | null;
  onClose: () => void;
  isOpen: boolean;
}

export const ApproveGotrModal = ({ gotr, onClose, isOpen }: ApproveGotrModalProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof gotrSchema>>({
    resolver: zodResolver(gotrSchema),
    mode: "onChange",
    defaultValues: {
      nameHi: "",
      nameEn: "",
    },
  });

  const { handleSubmit, register, reset, formState: { isSubmitting, isValid } } = form;

  // Prefill form when gotr changes, supporting both camelCase and snake_case
  React.useEffect(() => {
    if (gotr) {
      reset({
        nameHi: gotr.nameHi || "",
        nameEn: gotr.nameEn || "",
      });
    }
  }, [gotr, reset]);

  const onSubmit = async (values: z.infer<typeof gotrSchema>) => {
    if (!gotr) return;
    const gotrId = gotr.id;
    try {
      const response = await axios.patch(`/api/gotr/${gotrId}`, {
        nameHi: values.nameHi,
        nameEn: values.nameEn,
      });
      toast.success(response.data.message || "Gotr approved successfully");
      form.reset();
      onClose();
      router.refresh();
    } catch (error) {
      toast.error("Failed to approve gotr");
      console.error("Error approving gotr:", error);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent className="max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>Approve Gotr</AlertDialogTitle>
          <AlertDialogDescription>
            Review details, make changes if needed, then approve.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <Input placeholder="Name (English)" {...register("nameEn")} />
          <Input placeholder="Name (Hindi)" {...register("nameHi")} />
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
            <Button type="submit" disabled={!isValid || isSubmitting}>
              {isSubmitting ? "Saving..." : "Approve & Save"}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
