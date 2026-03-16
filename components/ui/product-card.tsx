'use client'

import useCart from "@/hooks/use-cart";
import { motion  } from "framer-motion";
import { Product } from "@/types";
import Image from "next/image";
import IconButton from "./icon-button";
import { Expand, ShoppingCart } from "lucide-react";
import Currency from "./currency";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";
import usePreviewModal from "@/hooks/use-preview-modal";

interface ProductCardProps {
    data: Product;
}


const ProductCard: React.FC<ProductCardProps> = ({
    data

}) => {

    const previewModal = usePreviewModal();
    const router = useRouter();
    const cart = useCart();

    const handleClick = () => {
        router.push(`/product/${data.id}`);
    }

    const onPreview: MouseEventHandler<HTMLButtonElement>= (event) => {
        event.stopPropagation();

        previewModal.onOpen(data);
    }

    const onAddToCart:MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        cart.addItem(data);
    };

    return (
        <motion.div
        whileTap = {{scale: 0.95}}
        className="group bg-white rounded-xl border p-3 space-y-3"
        whileHover={{ y: -5}}
        transition={{ type: "spring", stiffness: 400, damping: 17}}
        onClick={handleClick}
        >
        
            <div className="aspect-square rounded-xl bg-gray-100 relative overflow-hidden">
                <div className="absolute top-3 left-3 z-10">
                    <span className="bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercae tracking-widest text-black shadow-sm">
                        New Arrival
                    </span>
                </div>
                <Image alt="Image" 
                src={data?.images?.[0]?.url}
                fill
                className="aspect-square object-cover rounded-md"
                />

                <div className="opacity-100 md:opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
                    <div className="flex gap-x-6 justify-center">
                        <IconButton 
                        onClick={onPreview}
                        icon={<Expand size={20} className="text-gray-600" />}
                        />

                        <IconButton
                        onClick={onAddToCart}
                        icon={<ShoppingCart size={20} className="text-gray-600" />}
                        />
                    </div>
                </div>
            </div>
            {/* description product */}
            <div className="space-y-1">
                <p className="font-semibold text-lg line-clamp-1 break-words">{data.name}</p>
                <p className=" text-sm text-gray-500">{data.category?.name}</p>
            </div>
            <div className="flex items-center justify-between">
                <Currency value={data?.price} />
            </div>
        </motion.div>
    );

}

export default ProductCard;