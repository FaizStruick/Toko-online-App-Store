'use client'

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Category } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MainNavProps {
    data: Category[];
}

const MainNav: React.FC<MainNavProps> = ({
    data
}) => { 
    const pathname = usePathname()

    const routes = data.map((route) => ({
        href: `/category/${route.id}`,
        label: route.name,
        active: pathname === `/category/${route.id}`
    }))

    return (
        <nav className="mx-6 flex items-center space-x-4 lg:space-x-6 overflow-x-auto whitespace-nowrap py-2 no-scrollbar">
            {routes.map((route) => (
                <Link 
                    key={route.href}
                    href={route.href}
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-black",
                        route.active ? "text-black" : "text-neutral-500"
                    )}
                >
                    {route.label}

                    {route.active && (
                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black rounded-full"/>
                    )}
                </Link>
            ))}
        </nav>
    )
}

export default MainNav;