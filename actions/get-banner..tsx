import { Banner } from "@/types";

const URL = "http://localhost:3001/api/3e05ecf7-04a4-46e4-a858-bf5f3fadca98/banners";

const getBanner = async (id: string): Promise<Banner> => {
    const res = await fetch(`${URL}/${id}`);
    return res.json();
};

export default getBanner;