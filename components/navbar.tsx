import Link from "next/link";
import Container from "./ui/container";
import MainNav from "./main-nav";
import getCategories from "@/actions/get-categories";

export const revalidate = 0;

const Navbar = async () => {
    try {
    const categories = await getCategories();

    return (
        <nav className="sticky top-0 z-50 w-full bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 shadow-sm transition-all">
                <Container>
                    <div className="relative px-4 sm:px-6 lg:px-8 flex h-20 items-center">
                    <Link href="/" className="flex gap-x-2 transition-transform hover:scale-105 active:scale-95">
                <p className="text-xl font-bold uppercase tracking-wider">Toko <span className="text-blue-400">Faiz Market</span></p>
                </Link>
                <MainNav data={categories} />
                </div>
                </Container>
        </nav>
    )
} catch (error){
    console.log("NAVBAR_ERROR:", error);
    return <nav className="h-16 border-b flex items-center px-4">Error memuat kategori</nav>;
}
}

export default Navbar;