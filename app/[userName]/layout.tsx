import {Header} from "@/components/header";
import { ReactNode } from "react";
import Footer from "@/components/footer";
import CategoriesBar from "@/components/categories-bar";

interface UserLayoutProps {
    children: ReactNode;
    params: { userName: string };
}

const UserLayout = async ({
    children,
    params
} : UserLayoutProps) => {
    const { userName }= await params;
    return (
        <div className="h-full">
            <div className="fixed top-0 left-0 h-20 w-full z-40">
                <CategoriesBar userName={userName}/>
                <Header/>
            </div>

            <main className="pt-[108px] min-h-screen">
                <div className="w-full">
                    {children}
                    <Footer/>
                </div>
            </main>
        </div>
    );
}

export default UserLayout;