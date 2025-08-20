import { SidebarRoutes } from "./sidebar-routes";

const Sidebar = ({userName}:{userName: string}) => {
    return (
        <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
            <div className="flex flex-col w-full">
                <SidebarRoutes userName={userName} />
            </div>
        </div>
    );
}

export default Sidebar;