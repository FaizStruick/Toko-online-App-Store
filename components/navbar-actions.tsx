'use client'

import { motion } from "framer-motion";
import useCart from "@/hooks/use-cart";
import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

const NavbarActions = () => {
    const [isMounted, setIsMounted] = useState(false);
    const cart = useCart();
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted) return null;

    return(
        <div className="ml-auto flex items-center gap-x-4">
            <motion.button
            key={cart.items.length}
            initial={{scale: 1}}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.3 }}
            onClick={() => router.push("/cart")}
            className="flex items-center rounded-full bg-black px-4 py-2"
            >
                <ShoppingBag size={20} color="white"/>
                <span className="ml-2 text-sm font-medium text-white">
                {cart.items.length}
                </span>
        
                {/* Efek Berdenyut jika ada barang */}
                {cart.items.length}
                </motion.button>
        </div>
    );
}

export default NavbarActions