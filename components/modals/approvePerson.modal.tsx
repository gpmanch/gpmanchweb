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
import { useEffect } from "react";
import { ImageUploader } from "@/components/image-uploader";
import { Button } from "@/components/ui/button"; // ✅ use proper button

// Schema
const formSchema = z.object({
  nameHi: z.string().optional(),
  nameEn: z.string().optional(),
  descHi: z.string().optional(),
  descEn: z.string().optional(),
  imageUrl: z
    .string()
    .url({ message: "Valid image URL required!" })
    .or(z.literal(""))
    .optional(),
  categoryId: z.string().min(1, { message: "Category is required!" }),
  subCategoryId: z.string().optional(),
  award: z.string().optional(),
  cadre: z.string().optional(),
  post: z.string().optional(),
  sport: z.string().optional(),
  profession: z.string().optional(),
});

interface SubCategory {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
  subCategory?: SubCategory[];
}

interface Person {
  id: string;
  nameHi: string | null;
  nameEn: string | null;
  description?: {
    hi: string | null;
    en: string | null;
  };
  imageUrl?: string | null;
  categoryId: string;
  subCategoryId?: string | null;
  award?: string | null;
  cadre?: string | null;
  post?: string | null;
  sport?: string | null;
  profession?: string | null;
}

interface ApprovePersonModalProps {
  person: Person | null;
  onClose: () => void;
  isOpen: boolean;
  currentCategory: Category | undefined;
}

export const ApprovePersonModal = ({
  person,
  onClose,
  isOpen,
  currentCategory,
}: ApprovePersonModalProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      nameHi: "",
      nameEn: "",
      descHi: "",
      descEn: "",
      imageUrl: "",
      categoryId: currentCategory?.id || "",
      subCategoryId: "",
      award: "",
      cadre: "",
      post: "",
      sport: "",
      profession: "",
    },
  });

  const {
    handleSubmit,
    register,
    setValue,
    reset,
    watch,
    formState: { isSubmitting, isValid },
  } = form;

  const currentImg = watch("imageUrl");

  useEffect(() => {
    if (person) {
      reset({
        nameHi: person.nameHi || "",
        nameEn: person.nameEn || "",
        descHi: person.description?.hi || "",
        descEn: person.description?.en || "",
        imageUrl: person.imageUrl || "",
        categoryId: person.categoryId,
        subCategoryId: person.subCategoryId || "",
        award: person.award || "",
        cadre: person.cadre || "",
        post: person.post || "",
        sport: person.sport || "",
        profession: person.profession || "",
      });
    }
  }, [person, reset, currentCategory]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!person) return;
    const personId = person.id;
    try {
      const response = await axios.patch(`/api/person/${personId}`, {
        ...values
      });
      toast.success(response.data.message || "Person approved successfully");
      onClose();
      router.refresh();
    } catch (error) {
      toast.error("Failed to approve person");
      console.error("Error approving person:", error);
    }
  };

  const subCategories = currentCategory?.subCategory ?? [];
  console.log(subCategories)

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent className="max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>Approve Person</AlertDialogTitle>
          <AlertDialogDescription>
            Review details, make changes if needed, then approve.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* ✅ Put form around content */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {currentCategory?.name !== "Gotr" && subCategories.length > 0 && (
            <select
              {...register("subCategoryId")}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select SubCategory</option>
              {subCategories.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </select>
          )}

          <Input placeholder="Name (English)" {...register("nameEn")} />
          <Input placeholder="Name (Hindi)" {...register("nameHi")} />

          <Input placeholder="Description (English)" {...register("descEn")} />
          <Input placeholder="Description (Hindi)" {...register("descHi")} />

          <ImageUploader
            value={currentImg}
            onChange={(url) =>
              setValue("imageUrl", url, { shouldValidate: true, shouldDirty: true })
            }
          />

          {currentCategory?.name === "Award" && (
            <Input placeholder="Award" {...register("award")} />
          )}
          {currentCategory?.name === "Services" && (
            <Input placeholder="Cadre" {...register("cadre")} />
          )}
          {currentCategory?.name === "Politicians" && (
            <Input placeholder="Post" {...register("post")} />
          )}
          {currentCategory?.name === "Sports" && (
            <Input placeholder="Sport" {...register("sport")} />
          )}
          {currentCategory?.name === "Artists" && (
            <Input placeholder="Profession" {...register("profession")} />
          )}

          <AlertDialogFooter>
            <AlertDialogCancel type="button" onClick={onClose}>
              Cancel
            </AlertDialogCancel>
            {/* ✅ Real submit button */}
            <Button type="submit" disabled={!isValid || isSubmitting}>
              {isSubmitting ? "Saving..." : "Approve & Save"}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
