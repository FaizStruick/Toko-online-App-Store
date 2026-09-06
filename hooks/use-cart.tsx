import { Product } from "@/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { toast } from 'react-hot-toast';

export interface CartItem extends Product {
    quantity: number;
}

interface CartStore {
    items: CartItem[];
    addItem: (data: Product) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    removeAll: () => void;
}

const useCart = create<CartStore> ()(
    persist(
        (set, get) => ({
        items: [],
        addItem: (data: Product) => {
            const currentItems = get().items;
            const existingItem = currentItems.find((item) => item.id === data.id);

            if(existingItem){
                set({
                items: currentItems.map((item) => 
                    item.id === data.id
                        ? {...item, quantity: (item.quantity || 1) + 1}
                        : item
                ),
            });
            toast.success("Jumlah produk diperbarui di keranjnag");
            } else {
                set({ items: [...get().items, { ...data, quantity: 1 }] });
                toast.success("Berhasil menambah barang ke keranjang");
            }
        },

        removeItem: (id: string) => {
            set({ items: get().items.filter((item) => item.id !== id) });
            toast.success("Produk dihapus dari keranjang")
        },

        updateQuantity: (id: string, quantity: number) => {
            if (quantity <= 0) {
                get().removeItem(id);
                return;
            }

            set({ 
                items: get().items.map((item) => 
                    item.id === id ? { ...item, quantity } : item
                ),
            });
        },
        
        removeAll: () => set({ items: [] }),
    }),
    {
        name: 'cart-storage',
        storage: createJSONStorage(() => localStorage),
    }
    )
);

export default useCart;