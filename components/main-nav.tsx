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
        <nav className="mx-4 flex items-center space-x-4 lg:space-x-6 overflow-x-auto pb-2 md:pd-0 no-scrollbar">
            {routes.map((route) => (
                <Link 
                    key={route.href}
                    href={route.href}
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-black whitespace-nowrap relative py-1",
                        route.active ? "text-black" : "text-neutral-500"
                    )}
                >
                    {route.label}

                    {route.active && (
                        <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"
                        transition={{type: "spring", stiffness: 300, damping: 30}}
                        />
                    )}
                </Link>
            ))}
        </nav>
    )
}

export default MainNav;