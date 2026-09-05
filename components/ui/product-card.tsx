'use client'

import useCart from "@/hooks/use-cart";
import { motion } from "framer-motion";
import { Product } from "@/types";
import Image from "next/image";
import IconButton from "./icon-button";
import { Expand, Heart, ShoppingCart } from "lucide-react";
import Currency from "./currency";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useEffect, useState } from "react";
import usePreviewModal from "@/hooks/use-preview-modal";
import { useWishlist } from "@/hooks/useWishlist";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";

interface ProductCardProps {
  data: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const previewModal = usePreviewModal();
  const router = useRouter();
  const cart = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const { addToRecent } = useRecentlyViewed();

  const wishlisted = isMounted ? isWishlisted(data.id) : false;

  const handleClick = () => {
    addToRecent({
      id: data.id,
      name: data.name,
      category: data.category?.name,
      imageUrl: data.images?.[0]?.url,
      slug: data.id,
      price: data.price,
    });
    router.push(`/product/${data.id}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    previewModal.onOpen(data);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem(data);
  };

  const onWishList: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    toggle(data.id);
  };

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      onClick={handleClick}
      className="group bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 p-3 flex flex-col justify-between h-full cursor-pointer hover:shadow-xl hover:shadow-neutral-200/50 dark:hover:shadow-neutral-950/50 transition-all duration-300"
    >
      {/* Visual Container Gambar */}
      <div className="aspect-square rounded-xl bg-neutral-100 dark:bg-neutral-800/80 relative overflow-hidden shrink-0 flex items-center justify-center">
        
        {/* Badge "New Arrival" */}
        <div className="absolute top-2.5 left-2.5 z-10">
          <span className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200 border border-neutral-200/50 dark:border-neutral-800 shadow-2xs">
            Baru
          </span>
        </div>

        {/* Tombol Wishlist */}
        <button
          onClick={onWishList}
          className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-200 cursor-pointer ${
            wishlisted
              ? "bg-red-50 border-red-200 text-red-500 dark:bg-red-950/60 dark:border-red-900 scale-105"
              : "bg-white/90 border-white/60 text-neutral-400 dark:bg-neutral-900/90 dark:border-neutral-800 hover:text-red-500 hover:scale-105"
          }`}
          aria-label={wishlisted ? "Hapus dari wishlist" : "Tambah ke wishlist"}
        >
          <Heart size={14} fill={wishlisted ? "currentColor" : "none"} />
        </button>

        {/* Gambar Produk */}
        <Image
          alt={data.name || "Gambar Produk"}
          src={data?.images?.[0]?.url || "/placeholder.png"}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="aspect-square object-cover rounded-xl transition-transform duration-500 group-hover:scale-105 p-1"
        />

        {/* Action Overlay Desktop (Quick View & Add to Cart) */}
        <div className="hidden md:flex opacity-0 group-hover:opacity-100 transition-all duration-300 absolute inset-0 items-end justify-center pb-4 bg-gradient-to-t from-black/20 via-transparent to-transparent">
          <div className="flex gap-x-2.5 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md p-1.5 rounded-full shadow-lg border border-neutral-200/60 dark:border-neutral-800">
            <IconButton
              onClick={onPreview}
              icon={<Expand size={16} className="text-neutral-700 dark:text-neutral-300" />}
            />
            <IconButton
              onClick={onAddToCart}
              icon={<ShoppingCart size={16} className="text-neutral-700 dark:text-neutral-300" />}
            />
          </div>
        </div>
      </div>

      {/* Detail Informasi Produk */}
      <div className="space-y-1 pt-3 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-xs text-neutral-400 dark:text-neutral-500 font-medium">
            {data.category?.name}
          </p>
          <p className="font-semibold text-sm md:text-base line-clamp-2 text-neutral-800 dark:text-neutral-100 leading-snug group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
            {data.name}
          </p>
        </div>

        {/* Area Harga & Tombol Mobile */}
        <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800/60 mt-3 shrink-0">
          <div className="flex items-center gap-x-2">
            <Currency value={data?.price} />
            {data?.color?.value && (
              <span
                className="w-3 h-3 rounded-full border border-neutral-300 dark:border-neutral-700 shadow-2xs"
                style={{ backgroundColor: data.color.value }}
                title={data.color.name}
              />
            )}
          </div>

          <button
            onClick={onAddToCart}
            className="md:hidden p-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 active:scale-95 transition cursor-pointer"
            aria-label="Tambah ke Keranjang"
          >
            <ShoppingCart size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;