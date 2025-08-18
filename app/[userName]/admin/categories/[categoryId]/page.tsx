"use client";

import * as z from "zod";
import axios from "axios";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { use, useEffect, useState } from "react";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


const formSchema = z.object({
    title: z.string().min(1, {
        message: "Name is required!"
    }),
})

const EditCategoryPage = ({
    params
}: {
    params: Promise<{ categoryId: string }>
}) => {
    const router = useRouter();
    const { userName } = useParams<{ userName: string }>();
    const { categoryId } = use(params);
    const [oldCategoryName, setOldCategoryName] = useState("");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: oldCategoryName,
        },
    })

    const { isSubmitting, isValid } = form.formState;

    useEffect(() => {
        const fetchCategory = async () => {
            if (categoryId) {
                try {
                    const response = await axios.get(`/api/category/${categoryId}`);
                    setOldCategoryName(response.data.name);
                } catch (error) {
                    console.error("Error fetching category:", error);
                }
            }
        };

        fetchCategory();
    }, [categoryId]);

    useEffect(() => {
        if (oldCategoryName) {
            form.reset({ title: oldCategoryName }); // Reset form values when oldCategoryName changes
        }
    }, [oldCategoryName, form]);

    const onSubmit = async(values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/category/${categoryId}`, values);
            router.push(`/${userName}/admin/categories`);
            toast.success("Category Updated!");
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong!");
            console.log("Something went wrong:", error);
        }
    }

    return (
        <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
            <div>
                <h1 className="text-2xl">
                    Name of Category
                </h1>
                <p className="text-sm text-slate-600">
                    Don&apos;t worry, you can change this later.
                </p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Link href={`/${userName}/admin/categories`}>
                                <Button
                                    type="button"
                                    variant="ghost"
                                >
                                    Cancel
                                </Button>
                            </Link>
                            <Button
                                type="submit"
                                disabled={!isValid || isSubmitting}
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default EditCategoryPage;