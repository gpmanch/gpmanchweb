import { db } from "@/lib/prisma";
import { TitleForm } from "./_components/title-form";
import { CategoryForm } from "./_components/category-form";
import { IconBadge } from '@/components/icon-badge';
import { LayoutDashboard } from "lucide-react";

const EditSubCategoryPage = async({
    params
}: {
    params: Promise<{ subCategoryId: string }>
}) => {
    const subCategoryId = (await params).subCategoryId;

    const subCategory = await db.subCategory.findUnique({
        where: { id: subCategoryId },
        include: { category: true },
    });

    const categories = await db.category.findMany({
        orderBy: {
            name: "asc",
        },
    })

    return (
        <div className="p-6">
            <h1 className="text-2xl font-medium mb-2">
                Update Sub-Category
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={LayoutDashboard} />
                        <h2 className="text-xl">
                            Customize your sub-category
                        </h2>
                    </div>
                    <TitleForm
                        initialData = {{ name: subCategory?.name || "" }}
                        subCategoryId={subCategoryId}
                    />
                    <CategoryForm
                        initialData = {{ categoryId: subCategory?.categoryId || "" }}
                        subCategoryId={subCategoryId}
                        options = {categories.map((category) => ({
                            label: category.name,
                            value: category.id,
                        }))}
                    />
                </div>
            </div>
        </div>
    );
}

export default EditSubCategoryPage;

