
import Link from "next/link";
import Container from "./ui/container";
import MainNav from "./main-nav";
import getCategories from "@/actions/get-categories";
import NavbarActions from "./navbar-actions";


export const revalidate = 0


const Navbar =  async () => {

    const categories = await getCategories();

    return (
        <div className="sticky top-0 z-50 w-full border-b bg-white/70 backdrop-blur-md">
                <Container>
                    <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
                    <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
                <p className="text-2xl font-bold tracking-tighter italic"><span className="hidden min-[380px]:inline">Toko</span> Faiz<span className="text-blue-600"> Market</span></p>
                </Link>
                
                <div className="flex-1 px-4 overflow-x-auto no-scrollbar">
                <MainNav data={categories} />
                </div>

                <div className="flex items-center gap-x-2 shrink-0">
                <NavbarActions />
                </div>
                </div>
            </Container>
        </div>
    );
}

export default Navbar;