"use client";

import Link from "next/link";
// import { usePathname } from "next/navigation";
import { Button } from '@/components/ui/button';

export const NavbarRoutes = () => {
    // const pathname = usePathname();

    // const isAdminPage = pathname?.startsWith("/admin");

    return (
        <>
            {/* <Link href="/home" className="md:hidden">
                <Logo/>
            </Link> */}
            <div className="flex gap-x-2 ml-auto">
                <Link href="/home" className="hidden md:block">
                    <Button variant="ghost">
                        Home
                    </Button>
                </Link>
                {/* {
                    isAdminPage ? (
                        <Link href="/dashboard/explore">
                            <Button variant="ghost">
                               Exit
                            </Button>
                        </Link>
                    ) : isAdmin(userId) ? (
                        <Link href="/dashboard/teacher/courses">
                            <Button variant="ghost">
                                Admin Mode
                            </Button>
                        </Link>
                    ) : null
                } */}
            </div>
        </>
    )
}