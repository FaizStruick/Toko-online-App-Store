'use client'

import { motion } from "framer-motion";
import Link from "next/link";
import Container from "./ui/container";
import MainNav from "./main-nav";
import getCategories from "@/actions/get-categories";
import { useScroll } from "framer-motion";
import { Category } from "@/types";

export const revalidate = 0


const Navbar =  async () => {
            
    const { scrollYProgress } = useScroll();

    const categories = await getCategories();

    return (
        <nav className="sticky top-0 z-50 w-full bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 shadow-sm transition-all">
            <motion.div 
                className="fixed top-0 left-0 right-0 h-[3px] bg-blue-500 origin left"
                style={{ scaleX: scrollYProgress}}
                />
                <Container>
                    <div className="relative px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:h-20 items-start md:items-center py-4 md:py-0">
                    <Link href="/" className="flex gap-x-2 transition-transform hover:scale-105 active:scale-95">
                <p className="text-xl font-bold uppercase tracking-wider">Toko <span className="text-blue-400">Faiz Market</span></p>
                </Link>

                <div className="w-full md:ml-8 overflow-x-auto no-scrollbar">
                <MainNav data={categories} />
                </div>
                </div>
                </Container>
        </nav>
    );
}

export default Navbar;