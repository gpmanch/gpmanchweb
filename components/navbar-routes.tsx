"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from '@/components/ui/button';
import { isUserAdmin, getCurrentUser } from '@/lib/auth-client';

export const NavbarRoutes = () => {
    const pathname = usePathname();
    const currentUser = getCurrentUser();
    const isAdmin = isUserAdmin();
    const isAdminPage = pathname?.includes("/admin");

    return (
        <>
            <div className="flex gap-x-2 ml-auto">
                <Link href="/home" className="hidden md:block">
                    <Button variant="ghost">
                        Home
                    </Button>
                </Link>
                {isAdminPage ? (
                    <Link href={`/${currentUser?.userName || ''}`}>
                        <Button variant="ghost">
                           Exit Admin
                        </Button>
                    </Link>
                ) : isAdmin && currentUser?.userName ? (
                    <Link href={`/${currentUser.userName}/admin`}>
                        <Button variant="ghost">
                            Admin Mode
                        </Button>
                    </Link>
                ) : null}
            </div>
        </>
    )
}