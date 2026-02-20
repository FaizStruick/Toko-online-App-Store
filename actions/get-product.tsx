import { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const getProduct = async (id: string): Promise<Product> => {
    const res = await fetch(`${URL}/${id}`, { cache: 'no-cache'});

    if (!res.ok) {
        throw new Error("Gagal mengambil detail produk");
    }

    return res.json();
};

export default getProduct;