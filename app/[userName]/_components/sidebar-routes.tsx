"use client"
import { BarChart, Compass, Layout, Layers3, Wrench, Receipt, Home, Settings } from "lucide-react"
import { usePathname } from "next/navigation";
import { SidebarItem } from "./sidebar-item";

export const SidebarRoutes = ({userName}:{userName: string}) => {
    const pathname = usePathname()

    const userRoutes = [
        {
            icon: Layout,
            label: "My Courses",
            href: "/dashboard",
        },
        {
            icon: Compass,
            label: "Explore",
            href: "/dashboard/explore",
        },
        {
            icon: Wrench,
            label: "Workshops",
            href: "/dashboard/workshops",
        },
        {
            icon: Receipt,
            label: "Payments",
            href: "/dashboard/payments",
        }
    ]

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
          icon: Settings,
          label: "Settings",
          href: `/${userName}/admin/settings`,
        },
    ]
    const isAdminPage = pathname?.includes("/admin");

    const routes = isAdminPage ? adminRoutes : userRoutes;

    return(
        <div className="flex flex-col w-full">
            {
                routes.map((route) => (
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