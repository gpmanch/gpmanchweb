import { ReactNode } from "react";
import Sidebar from "@/components/sidebar";

const AdminLayout = ({
  children,
  params
} : {
  children: ReactNode;
  params: { userName: string };
}) => {
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