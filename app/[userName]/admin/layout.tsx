import { ReactNode } from "react";
import Sidebar from "@/components/sidebar";

interface AdminLayoutProps {
  children: ReactNode;
  params: { userName: string };
}

const AdminLayout = async({
    children,
    params
  } : AdminLayoutProps
) => {
  const { userName } = params;
  return  (
      <div className="flex w-full">
        <aside className="hidden fixed h-full md:block w-56 shrink-0">
          <Sidebar userName={userName}/>
        </aside>
      <div className="w-full md:pl-56">
        {children}
      </div>
    </div>
  )
};

export default AdminLayout;