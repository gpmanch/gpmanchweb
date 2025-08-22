import Sidebar from '@/components/sidebar';
import React, { ReactNode } from 'react'

interface AdminLayoutProps {
  children: ReactNode;
  params: Promise<{ userName: string }>;
}

const AdminLayout = async({
    children,
    params
}: AdminLayoutProps) => {
    return (
        <div className="flex w-full">
        <aside className="hidden fixed h-full md:block w-56 shrink-0">
          <Sidebar userName={(await params).userName}/>
        </aside>
      <div className="w-full md:pl-56">
        {children}
      </div>
    </div>
    )
}

export default AdminLayout