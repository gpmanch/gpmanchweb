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
import { useEffect } from "react";
import { ImageUploader } from "@/components/image-uploader";

// ✅ Zod schema
const formSchema = z
  .object({
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
  })
  .refine(
    (data) => {
      const hasName =
        (data.nameHi && data.nameHi.trim().length > 0) ||
        (data.nameEn && data.nameEn.trim().length > 0);
      return hasName;
    },
    {
      message: "At least one language (Hindi or English) must be filled for Name",
      path: ["name_hi"],
    }
  );

interface SubCategory {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
  subCategories?: SubCategory[];
}

interface NewPersonModalProps {
  onClose: () => void;
  isOpen: boolean;
  categories: Category[];
}

export const NewPersonModal = ({
  onClose,
  isOpen,
  categories,
}: NewPersonModalProps) => {
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
      categoryId: categories[0]?.id || "",
      subCategoryId: "",
      award: "",
      cadre: "",
      post: "",
      sport: "",
      profession: "",
    }
  });

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { isSubmitting, isValid },
  } = form;

  const currentImg = watch("imageUrl");

  useEffect(() => {
    const id = categories[0]?.id || "";
    if (id) {
      form.setValue("categoryId", id, { shouldValidate: true, shouldDirty: true });
    }
  }, [categories, form]);

  // ✅ Submit handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/person", values);
      toast.success(response.data.message || "Person added successfully");
      form.reset();
      onClose();
      router.refresh();
    } catch (error) {
      toast.error("Failed to add person");
      console.error("Error adding person:", error);
    }
  };

  const currentCategory = categories[0];
  const subCategories = currentCategory?.subCategories ?? [];

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent className="max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>Add New Person</AlertDialogTitle>
          <AlertDialogDescription>
            Fill at least one language (Hindi or English) for Name.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* SubCategory Dropdown */}
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

          {/* Names */}
          <Input placeholder="Name (English)" {...register("nameEn")} />
          <Input placeholder="Name (Hindi)" {...register("nameHi")} />

          {/* Descriptions */}
          <Input placeholder="Description (English)" {...register("descEn")} />
          <Input placeholder="Description (Hindi)" {...register("descHi")} />

          {/* ✅ Image Upload */}
          <ImageUploader
            value={currentImg}
            onChange={(url) =>
              setValue("imageUrl", url, { shouldValidate: true, shouldDirty: true })
            }
          />

          {/* Category-specific inputs */}
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