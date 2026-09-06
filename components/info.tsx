'use client'

import { Product } from "@/types";
import Currency from "./ui/currency";
import { Button } from "./ui/button";
import { MessageCircleIcon, Share2, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import useCart from "@/hooks/use-cart";
import toast from "react-hot-toast";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const [isMounted, setIsMounted] = useState(false);
  const cart = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Mencegah hydration error saat akses window.location
  const origin = isMounted && typeof window !== "undefined" ? window.location.origin : "";
  const productUrl = `${origin}/product/${data?.id}`;
  const telp = process.env.NEXT_PUBLIC_TELP || "";
  const pesan = encodeURIComponent(
    `Halo, saya tertarik membeli ${data?.name} dengan harga Rp${data?.price}. Link produk: ${productUrl}`
  );
  const waLink = `https://wa.me/${telp}?text=${pesan}`;

  const onAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    cart.addItem(data);
  };

  const onCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(productUrl);
      toast.success("Link produk berhasil disalin!");
    }
  };

  return (
    <div className="bg-white dark:bg-neutral-900 p-6 sm:p-8 rounded-2xl border border-neutral-100 dark:border-neutral-800 shadow-xl shadow-neutral-200/50 dark:shadow-none transition-all">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
          {data.name}
        </h1>
        <div className="mt-3 flex items-center justify-between">
          <div className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
            <Currency value={data?.price} />
          </div>
        </div>
      </div>

      <hr className="my-6 border-neutral-100 dark:border-neutral-800" />

      {/* Variasi: Ukuran & Warna */}
      <div className="flex flex-col gap-y-4 mb-6">
        <div className="flex items-center gap-x-4">
          <span className="w-16 text-sm font-semibold text-neutral-500 dark:text-neutral-400">
            Ukuran:
          </span>
          <span className="rounded-md border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-3 py-1 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
            {data?.size?.name ? `${data.size.name} (${data.size.value})` : "-"}
          </span>
        </div>

        <div className="flex items-center gap-x-4">
          <span className="w-16 text-sm font-semibold text-neutral-500 dark:text-neutral-400">
            Warna:
          </span>
          <div className="flex items-center gap-x-2">
            <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200">
              {data?.color?.name || "-"}
            </span>
            {data?.color?.value && (
              <div
                className="h-5 w-5 rounded-full border border-neutral-300 dark:border-neutral-600 shadow-sm"
                style={{ backgroundColor: data.color.value }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Deskripsi & Badging */}
      <div className="space-y-4">
        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed italic text-sm">
          "Dapatkan penawaran harga terbaik dan promo menarik untuk unit{" "}
          <span className="font-semibold text-neutral-800 dark:text-neutral-200">
            {data.name}
          </span>{" "}
          hanya di Faiz Market."
        </p>

        <div className="flex gap-2">
          <span className="bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 text-xs px-2.5 py-1 rounded-full font-medium">
            Ready Stock
          </span>
          <span className="bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs px-2.5 py-1 rounded-full font-medium">
            Garansi Resmi
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          {/* Tombol Add to Cart */}
          <Button
            onClick={onAddToCart}
            className="flex-1 flex items-center justify-center gap-x-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold rounded-xl py-6 hover:opacity-90 active:scale-98 transition shadow-md"
          >
            <span>Keranjang</span>
            <ShoppingCart size={18} />
          </Button>

          {/* Tombol Copy Link */}
          <button
            onClick={onCopyLink}
            className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-700 text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all cursor-pointer"
            title="Salin Link Produk"
          >
            <Share2 size={20} />
          </button>
        </div>

        {/* Tombol Whatsapp */}
        {isMounted && (
          <Link href={waLink} target="_blank" className="w-full">
            <Button className="w-full flex items-center justify-center gap-x-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl py-6 transition-all active:scale-98 shadow-md shadow-green-200 dark:shadow-none">
              <span>Chat Penjual (WhatsApp)</span>
              <MessageCircleIcon size={20} />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Info;