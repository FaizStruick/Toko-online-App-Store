'use client'

import useCart from "@/hooks/use-cart";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

const Summary = () => {
    const items = useCart((state) => state.items);
    const removeAll = useCart((state) => state.removeAll);

    const totalPrice = items.reduce((total, item) => {
        return total + Number(item.price);
    },  0);

    const onCheckout = () => {
    // Sementara kita arahkan ke WhatsApp Admin
    const message = items.map((item) => `- ${item.name} (${item.price})`).join("\n");
    const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_TELP}?text=Halo Admin, saya mau order:\n${message}\n\nTotal: ${totalPrice}`;
    
    window.open(whatsappUrl, "_blank");
    removeAll();
    toast.success("Mengarahkan ke WhatsApp...");
  };

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Ringkasan Belanja</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Total Harga</div>
          <div className="font-semibold text-black">Rp {totalPrice.toLocaleString()}</div>
        </div>
      </div>
      <button 
        disabled={items.length === 0}
        onClick={onCheckout}
        className="w-full mt-6 rounded-full bg-black border-transparent px-5 py-3 disabled:cursor-not-allowed disabled:opacity-50 text-white font-semibold hover:opacity-75 transition"
      >
        Checkout via WhatsApp
      </button>
    </div>
  );
};

export default Summary;

