import { LucideIcon } from "lucide-react";

interface InfoCardProps {
    icon: LucideIcon;
    title: string;
    value: string;
    change: string;
}

export const InfoCard = ({
    icon: Icon,
    title,
    value,
    change,
}: InfoCardProps) => {
    return (
        <div className="border rounded-md flex items-center justify-between gap-x-2 p-3 bg-gray-50">
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
                <p className="mt-1 text-sm">
                    {change}
                </p>
            </div>
            <div className="p-2 rounded-full bg-gray-100 flex items-center justify-center">
                <Icon
                    size={32}
                />
            </div>
        </div>
    )
}