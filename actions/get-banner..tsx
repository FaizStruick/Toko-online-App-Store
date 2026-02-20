import { Banner } from "@/types";

// Gunakan process.env agar saat di Vercel dia pakai link Vercel Admin, 
// dan saat di laptop dia pakai localhost.
const URL = `${process.env.NEXT_PUBLIC_API_URL}/banners`;

const getBanner = async (id: string): Promise<Banner> => {
    // Tambahkan ID ke akhir URL agar mengambil banner yang spesifik
    const res = await fetch(`${URL}/${id}`, { cache: 'no-store' });
    
    if (!res.ok) {
        throw new Error("Gagal mengambil data banner");
    }

    return res.json();
};

export default getBanner;