import { Product } from "@/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CartStore {
    items: Product[];
    addItem: (data: Product) => void;
    removeItem: (id: string) => void;
    removeAll: () => void;
}

const useCart = create<CartStore> ()(
    persist((set, get) => ({
        items: [],
        addItem: (data: Product) => {
            const currentItems = get().items;
            const existingItem = currentItems.find((item) => item.id === data.id);

            if(existingItem){
                return alert("Barang sudah ada di keranjang!");
            }

            set({items: [...get().items, data]});
            alert("Berhasil menambah barang ke keranjang");
        },
        removeItem: (id: string) => {
            set({ items: [...get().items.filter((item) => item.id !== id)]});
            alert("Barang dihapus dari keranjang");
        },
        removeAll: () => set({ items: [] }),
    }), {
        name: 'cart-storage',
        storage: createJSONStorage(() => localStorage),
    })
);

export default useCart;