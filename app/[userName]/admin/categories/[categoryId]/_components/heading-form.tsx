"use client";

import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Pencil, Loader2 } from "lucide-react";
import { Editor } from "@/components/editor";
import { Preview } from "@/components/preview";

interface HeadingFormProps {
    initialData: {
        heading: { en: string; hi: string };
    };
    categoryId: string;
}

const formSchema = z.object({
    headingEn: z.string().min(1),
    headingHi: z.string().min(1),
});

export const HeadingForm = ({
    initialData,
    categoryId,
} : HeadingFormProps) => {
    const router = useRouter()
    const [ isEditing, setIsEditing ] = useState(false)

    const toggleEdit = () => setIsEditing((current) => !current)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            headingEn: initialData?.heading?.en || "",
            headingHi: initialData?.heading?.hi || "",
        }
    })

    const { isSubmitting, isValid } = form.formState;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/category/${categoryId}`, {
                headingEn: values.headingEn,
                headingHi: values.headingHi,
            })
            toast.success("Category updated!");
            toggleEdit()
            router.refresh()
        } catch (error) {
            toast.error("Something went wrong!")
            console.log(error)
        }
    }
    return (
        <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
            {
                isSubmitting && (
                    <div
                        className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-md flex items-center justify-center"
                    >
                        <Loader2
                            className="animate-spin h-6 w-6 text-black"
                        />
                    </div>
                )
            }
            <div className="font-medium flex items-center justify-between">
                Category Heading
                <Button onClick={toggleEdit} variant="ghost">
                    {
                        isEditing ? (
                            <>
                                Cancel
                            </>
                        ) : (
                            <>
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit heading
                            </>
                        )
                    }
                </Button>
            </div>
            {
                !isEditing ? (
                    <div className="space-y-4 mt-2">
                        <div className={cn(
                            "text-sm",
                            !(initialData.heading?.en) && "text-slate-500 italic"
                        )}>
                            <div className="font-medium">English</div>
                            {!(initialData.heading?.en) && "No heading"}
                            {initialData.heading?.en && (
                                <Preview value={initialData.heading.en} />
                            )}
                        </div>
                        <div className={cn(
                            "text-sm",
                            !(initialData.heading?.hi) && "text-slate-500 italic"
                        )}>
                            <div className="font-medium">Hindi</div>
                            {!(initialData.heading?.hi) && "No heading"}
                            {initialData.heading?.hi && (
                                <Preview value={initialData.heading.hi} />
                            )}
                        </div>
                    </div>
                ) : (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4 mt-4"
                        >
                            <div className="space-y-4">
                                <div>
                                    <div className="text-sm font-medium mb-2">English Heading</div>
                                    <FormField
                                        control={form.control}
                                        name="headingEn"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Editor {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    <div className="text-sm font-medium mb-2">Hindi Heading</div>
                                    <FormField
                                        control={form.control}
                                        name="headingHi"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Editor {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-x-2">
                                <Button
                                    disabled={!isValid || isSubmitting}
                                    type="submit"
                                >
                                    Save
                                </Button>
                            </div>
                        </form>
                    </Form>
                )
            }

            {!(initialData.heading?.en) || !(initialData.heading?.hi) ? (
                <span className="text-sm text-red-600">Both English and Hindi headings are required.</span>
            ) : null}
        </div>
    );
}