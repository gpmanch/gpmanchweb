import { db } from "@/lib/prisma";
import Link from "next/link";

import { IconBadge } from "@/components/icon-badge";
import { TitleForm } from "./_components/title-form";
import { HeadingForm } from "./_components/heading-form";
import { DescriptionForm } from "./_components/description-form";
import { ArrowLeft, LayoutDashboard } from "lucide-react";


const EditCategoryPage = async({
    params
}: {
    params: Promise<{ categoryId: string, userName: string }>
}) => {
    const { categoryId } = await params;
    const userName = (await params).userName;
    const category = await db.category.findUnique({
        where: { id: categoryId },
        include: { subCategory: true },
    });

    const headingObj = {
        en: (category?.heading as { en?: string; hi?: string } | null)?.en ?? "",
        hi: (category?.heading as { en?: string; hi?: string } | null)?.hi ?? "",
    };
    const descriptionObj = {
        en: (category?.description as { en?: string; hi?: string } | null)?.en ?? "",
        hi: (category?.description as { en?: string; hi?: string } | null)?.hi ?? "",
    };

    return (
        <div className="p-6">
            <Link
                href={`/${userName}/admin/categories`}
                className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Categories
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={LayoutDashboard} />
                        <h2 className="text-xl">
                            Customize your category
                        </h2>
                    </div>
                    <TitleForm
                        initialData = {{ name: category?.name || "" }}
                        categoryId={categoryId}
                    />
                    <HeadingForm
                        initialData = {{ heading: headingObj }}
                        categoryId={categoryId}
                    />
                    <DescriptionForm
                        initialData = {{ description: descriptionObj }}
                        categoryId={categoryId}
                    />
                </div>
            </div>
        </div>
    );
}

export default EditCategoryPage;