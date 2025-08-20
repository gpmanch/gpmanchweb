"use client"

import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { SubCategory, Category } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Trash, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm.modal";
import { useParams, useRouter } from "next/navigation";

const CategoryActions = ({ id }: { id: string }) => {
  const router = useRouter();
  const { userName } = useParams<{ userName: string }>();

  const deleteCategory = async (categoryId: string) => {
    try {
      await axios.delete(`/api/sub-category/${categoryId}`);
      toast.success("Category deleted");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong.");
      console.log("Error while deleting category: ", error);
    }
  };

  return (
    <div className="flex space-x-2">
      <Link href={`/${userName}/admin/sub-categories/${id}`}>
        <Button size="sm" variant="outline">
          <Pencil className="h-4 w-4 mr-2" />
          Edit
        </Button>
      </Link>
      <ConfirmModal onConfirm={() => deleteCategory(id)}>
        <Button size="sm">
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </ConfirmModal>
    </div>
  );
};

export const columns: ColumnDef<SubCategory & { category: { name: string } | null }>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "asc")
        }
      >
        Sub-Category Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
      accessorKey: "category.name",
      header: "Category",
  },
  {
    id: "actions",
    cell: ({ row }) => <CategoryActions id={row.original.id} />,
  },
];