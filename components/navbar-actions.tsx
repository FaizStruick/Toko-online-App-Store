'use client'

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
            <button
            onClick={() => router.push("/cart")}
            className="relative flex items-center rounded-full bg-blue-600 px-4 py-2 hover:bg-blue-700 transition"
            >
                <ShoppingBag size={20} color="white"/>
                <span className="ml-2 text-sm font-medium text-white">
                {cart.items.length}
                </span>
        
                {/* Efek Berdenyut jika ada barang */}
                {cart.items.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                </span>
        )}
            </button>
        </div>
    );
}

export default NavbarActions