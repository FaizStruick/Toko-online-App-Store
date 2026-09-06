'use client';

import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Pembayaran berhasil!");
      removeAll();
    }

    if (searchParams.get("canceled")) {
      toast.error("Pembayaran dibatalkan.");
    }
  }, [searchParams, removeAll]);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price) * (item.quantity || 1);
  }, 0);

  const onCheckout = async () => {
    if (items.length === 0) return;

    try {
      setLoading(true);

      // Mengirim array item lengkap beserta id, size, color, dan quantity
    const checkoutItems = items.map((item) => ({
      id: item.id,
      name: item.name,
      size: item.size?.name || null,
      color: item.color?.name || null,
      quantity: item.quantity || 1,
      price: item.price,
    }));

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      {
        items: checkoutItems,
        // Jika backend Stripe/Midtrans kamu masih membaca productIds:
        productIds: items.flatMap((item) =>
          Array(item.quantity || 1).fill(item.id)
        ),
      }
    );

    window.location = response.data.url;
  } catch (error) {
    toast.error("Terjadi kesalahan saat checkout.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="mt-16 rounded-2xl bg-gray-50 dark:bg-neutral-800/50 p-6 sm:p-8 lg:col-span-5 lg:mt-0 border border-gray-200/80 dark:border-neutral-700/60">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white">
        Ringkasan Belanja
      </h2>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-neutral-700 pb-4">
          <div className="text-sm text-gray-600 dark:text-neutral-400">
            Subtotal Produk
          </div>
          <Currency value={totalPrice} />
        </div>

        <div className="flex items-center justify-between border-b border-gray-200 dark:border-neutral-700 pb-4">
          <div className="text-sm text-gray-600 dark:text-neutral-400">
            Estimasi Pengiriman
          </div>
          <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full">
            Gratis Ongkir
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="text-base font-bold text-gray-900 dark:text-white">
            Total Harga
          </div>
          <div className="text-base font-bold text-gray-900 dark:text-white">
            <Currency value={totalPrice} />
          </div>
        </div>
      </div>

      <Button
        onClick={onCheckout}
        disabled={items.length === 0 || loading}
        className="w-full mt-6 bg-black dark:bg-white text-white dark:text-black hover:opacity-90 rounded-xl py-3.5 font-semibold transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Memproses..." : "Checkout"}
      </Button>
    </div>
  );
};

export default Summary;