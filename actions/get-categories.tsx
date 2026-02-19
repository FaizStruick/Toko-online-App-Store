const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

const getCategories = async () => {

    const res =  await fetch(URL, {next: {revalidate: 0}});

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
        console.error("API tidak mengembalikan JSON! Malah kirim:", contentType);
        return []; 
    }
    return res.json();
};

export default getCategories;