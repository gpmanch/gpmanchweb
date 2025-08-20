"use client"
import { BarChart, Layers3, Home, Settings, Verified } from "lucide-react"
import { SidebarItem } from "./sidebar-item";

export const SidebarRoutes = ({userName}:{userName: string}) => {

    const adminRoutes = [
        {
          icon: Home,
          label: "Home",
          href: `/${userName}/admin`,
        },
        {
          icon: Layers3,
          label: "Categories",
          href: `/${userName}/admin/categories`,
        },
        {
          icon: BarChart,
          label: "Sub-Categories",
          href: `/${userName}/admin/sub-categories`,
        },
        {
            icon: Verified,
            label: "Verify",
            href: `/${userName}/admin/verify`,
        },
        {
          icon: Settings,
          label: "Settings",
          href: `/${userName}/admin/settings`,
        },
    ]

    return(
        <div className="flex flex-col w-full">
            {
                adminRoutes.map((route) => (
                    <SidebarItem
                        key={route.href}
                        icon={route.icon}
                        label={route.label}
                        href={route.href}
                    />
                ))
            }
        </div>
    )
}