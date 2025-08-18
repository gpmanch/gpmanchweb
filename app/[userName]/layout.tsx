import {Header} from "@/components/header";
import { ReactNode } from "react";
import Sidebar from "./_components/sidebar";
import Footer from "@/components/footer";
import CategoriesBar from "@/components/categories-bar";

interface UserLayoutProps {
    children: ReactNode;
    params: { userName: string }; // Ensure params is typed correctly
}

const UserLayout = async ({
    children,
    params
} : UserLayoutProps) => {
    const { userName }= await params;
    return (
        <div className="h-full">
            <div className="fixed top-0 left-0 h-20 w-full z-40">
                <CategoriesBar/>
                <Header/>
            </div>

            <main className="pt-[108px] min-h-screen">
                <div className="flex w-full">
                    <aside className="hidden fixed h-full md:block w-56 shrink-0">
                        <Sidebar userName={userName}/>
                    </aside>
                    <div className="w-full md:pl-56">
                        {children}
                        <Footer/>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default UserLayout;