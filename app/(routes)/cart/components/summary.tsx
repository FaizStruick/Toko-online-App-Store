'use client';

import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

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
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          productIds: items.map((item) => item.id),
        }
      );

      window.location = response.data.url;
    } catch (error) {
      toast.error("Terjadi kesalahan saat checkout.");
    }
  };

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">
        Ringkasan Belanja
      </h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div className="text-sm text-gray-600">Subtotal Product</div>
          <Currency value={totalPrice} />
        </div>
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div className="text-sm text-gray-600">Estimasi Pengiriman</div>
          <div className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
            Gratis Ongkir
          </div>
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="text-base font-bold text-gray-900">Total Harga</div>
          <div className="text-base font-bold text-gray-900">
            <Currency value={totalPrice} />
          </div>
        </div>
      </div>
      <Button
        onClick={onCheckout}
        disabled={items.length === 0}
        className="w-full mt-6 bg-black text-white hover:bg-black/90 rounded-full py-3"
      >
        Checkout
      </Button>
    </div>
  );
};

export default Summary;