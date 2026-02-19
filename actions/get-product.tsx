import { Product } from "@/types";

const URL = "http://localhost:3001/api/3e05ecf7-04a4-46e4-a858-bf5f3fadca98/products";

const getProduct = async (id: string): Promise<Product> => {
    const res = await fetch(`${URL}/${id}`);
    return res.json();
};

export default getProduct;