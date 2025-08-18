import { getCategories } from '@/actions/get-categories';
import Link from 'next/link';

export default async function CategoriesBar({ userName }: { userName: string }) {
    const categories = await getCategories();
    return (
        <div className="fixed top-0 left-0 w-full bg-[#002352] text-white text-[0.98rem] z-[1201] h-[38px] flex items-center shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
            <div className="mx-auto max-w-6xl px-5 w-full flex items-center justify-between h-[38px]">
                {/* Left: email, hidden on mobile */}
                <div className="hidden md:flex items-center gap-2">
                    <i className="fa fa-envelope text-[#FFCA3C]" />
                    <span>contact@gurjarpragatimanch.org</span>
                </div>
                {/* Right: quick links, scrollable on mobile */}
                <div className="flex items-center gap-2 md:gap-2 overflow-x-auto md:overflow-visible w-screen md:w-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {
                        categories.map((cat) => (
                            <Link key={cat.id} href={`/${userName}/${cat.id}`} className="inline-block border-2 border-[#FFCA3C] rounded-full px-4 py-1 text-white hover:bg-[#FFCA3C] hover:text-[#002352] transition-colors text-[0.98rem]">
                                {cat.name}
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
