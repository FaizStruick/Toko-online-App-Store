import getBanner from "@/actions/get-banner."
import getProducts from "@/actions/get-products";
import Banner from "@/components/banner"
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container"

export const revalidate = 0;

const HomePage =  async () => {

    const product = await getProducts({isFeatured: true});

    const banner = await getBanner("732817ef-a226-4a3a-b1d9-b749b9e04381")
    return (
        <Container>
            <div className="space-y-10 py-10">
                <Banner data={banner} />
            <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
                <ProductList title="Product unggulan" items={product} />
            </div>
            </div>
        </Container>
    )
}
export default HomePage;