'use client';

import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";

import Currency from "@/components/ui/currency";
import useCart, { CartItem as CartItemType } from "@/hooks/use-cart";
import IconButton from "@/components/ui/icon-button";
import { span } from "framer-motion/client";

interface CartItemProps {
  data: CartItemType;
}

const CartItem = ({ data }: CartItemProps) => {
  const cart = useCart();

  const onRemove = () => {
    cart.removeItem(data.id);
  };

  const onIncrease = () => {
    cart.updateQuantity(data.id, (data.quantity || 1) + 1);
  };

  const onDecrease = () => {
    if ((data.quantity || 1) > 1) {
      cart.updateQuantity(data.id, data.quantity - 1);
    } else {
      cart.removeItem(data.id);
    }
  };

  const itemQuantity = data.quantity || 1;
  const totalPrice = Number(data.price) * itemQuantity;

  return (
    <li className="flex py-6 border-b border-neutral-200 dark:border-neutral-800">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-32 sm:w-32 bg-neutral-100 dark:bg-neutral-800 shrink-0">
        <Image
          fill
          src={data.images[0]?.url || "/place"}
          alt={data.name || "Gambar Produk"}
          className="object-cover object-center"
        />
      </div>

      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div>

        <div className="pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div>
            <p className="text-lg font-semibold text-black dark:text-white">
              {data.name}
            </p>

          <div className="mt-1 flex items-center text-sm gap-x-2 text-gray-500 dark:text-neutral-500">
            {data.color?.name && (
              <span>{data.color.name}</span>
            )}
            {data.color?.name && data.size?.name && (
              <span className="text-gray-300">.</span>
            )}
            {data.size.name && (
              <span className="font-medium text-gray-700 dark:text-neutral-300">
                {data.size.name}
              </span>
            )}
          </div>
        </div>

          <div className="mt-1 sm:mt-0 sm:text-right">
            <Currency value={totalPrice} />
          </div>
        </div>

        {/* Counter Kuantitas */}
        <div className="mt-3 flex items-center gap-x-2">
          <button
            onClick={onDecrease}
            className="h-7 w-7 rounded-full border border-gray-300 dark:border-neutral-700 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-neutral-800 text-black dark:text-white transition cursor-pointer"
            aria-label="Kurangi Jumlah"
          >
            <Minus size={12} />
          </button>

          <span className="text-sm font-medium w-6 text-center text-black dark:text-white">
            {itemQuantity}
          </span>

          <button
            onClick={onIncrease}
            className="h-7 w-7 rounded-full border border-gray-300 dark:border-neutral-700 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-neutral-800 text-black dark:text-white transition cursor-pointer"
            aria-label="Tambah Jumlah"
          >
            <Plus size={12} />
          </button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;