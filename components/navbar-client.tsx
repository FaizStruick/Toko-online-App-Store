'use client'

import { useState } from "react"; // Tambahkan ini
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react"; // Import icon
import Link from "next/link";
import Container from "./ui/container";
import MainNav from "./main-nav";
import { Category } from "@/types";
import NavbarActions from "./navbar-actions";

interface NavbarClientProps {
    categories: Category[];
}

const NavbarClient: React.FC<NavbarClientProps> = ({ categories }) => {
    const [isOpen, setIsOpen] = useState(false); // State untuk buka/tutup menu
    const { scrollYProgress } = useScroll();

    return (
        <nav className="sticky top-0 z-50 w-full bg-gray-900/95 backdrop-blur-md border-b border-gray-800 shadow-sm">
            <motion.div 
                className="fixed top-0 left-0 right-0 h-[3px] bg-blue-500 origin-left"
                style={{ scaleX: scrollYProgress}}
            />
            <Container>
                <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
                    
                    {/* LOGO */}
                    <Link href="/" className="flex gap-x-2 transition-transform hover:scale-105 active:scale-95">
                        <p className="text-xl font-bold uppercase tracking-wider text-white">
                            Toko <span className="text-blue-400">Faiz Market</span>
                        </p>
                    </Link>

                    {/* DESKTOP NAV (Sembunyi di HP) */}
                    <div className="hidden md:block flex-1 ml-8">
                        <MainNav data={categories} />
                    </div>

                    <NavbarActions />

                    {/* MOBILE HAMBURGER BUTTON (Hanya muncul di HP) */}
                    <button 
                        onClick={() => setIsOpen(true)}
                        className="md:hidden p-2 text-gray-400 hover:text-white transition"
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </Container>

            {/* MOBILE SIDEBAR OVERLAY */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Background Gelap (Dimmer) */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                        />

                        {/* Menu Panel */}
                        <motion.div 
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 bottom-0 w-[280px] bg-gray-900 border-l border-gray-800 p-6 z-[70] shadow-2xl"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <p className="font-bold text-white text-lg">Menu</p>
                                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="flex flex-col gap-y-6">
                                {categories.map((category) => (
                                    <Link
                                        key={category.id}
                                        href={`/category/${category.id}`}
                                        onClick={() => setIsOpen(false)}
                                        className="text-lg font-medium text-gray-300 hover:text-blue-400 transition"
                                    >
                                        {category.name}
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
}

export default NavbarClient;