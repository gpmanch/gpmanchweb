"use client";
import Sidebar from '@/components/sidebar';
import React, { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { isUserAdmin, getCurrentUser } from '@/lib/auth-client';

interface AdminLayoutProps {
  children: ReactNode;
  params: Promise<{ userName: string }>;
}

const AdminLayout = ({ children, params }: AdminLayoutProps) => {
  const router = useRouter();
  const { userName } = React.use(params);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const currentUser = getCurrentUser();
      const isAdmin = isUserAdmin();

      if (!isAdmin) {
        console.log("User is not admin, redirecting to sign-in");
        router.push(`/${userName}`);
        return;
      }

      if (currentUser?.userName !== userName) {
        console.log("Session expired, redirecting to sign-in");
        router.push('/sign-in');
        return;
      }

      setIsLoading(false);
    };

    const timer = setTimeout(checkAuth, 500);
    return () => clearTimeout(timer);
  }, [userName, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#FFCA3C]"></div>
      </div>
    );
  }

  return (
    <div className="flex w-full">
      <aside className="hidden fixed h-full md:block w-56 shrink-0">
        <Sidebar userName={userName}/>
      </aside>
      <div className="w-full md:pl-56">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;