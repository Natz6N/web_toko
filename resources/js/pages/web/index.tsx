import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import { SectionCarousel, ProductCarousel, TestimonialCarousel } from "@/components/Carousel";
import { BannerItem, Category, Product, Testimonial } from "@/types/index";

interface IndexProps {
  banners: BannerItem[];
  categories: Category[];
  products: Product[];
  testimonials: Testimonial[];
}

export default function Index({ banners, categories, products, testimonials }: IndexProps) {
    // Create products array with required properties for ProductCarousel
    const productItems = products.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image_url || '/images/placeholder-product.jpg',
        url: `/products/${product.slug}`
    }));

    return (
        <div>
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-center mb-6">Welcome to My E-commerce Site</h1>
                <p className="mt-2 mb-8 text-center">Shop the latest products and enjoy exclusive deals!</p>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
                    <SectionCarousel items={banners} />
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Categories</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {categories.map((category) => (
                            <div key={category.id} className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow">
                                <h3 className="font-medium text-lg">{category.name}</h3>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Best Sellers</h2>
                    <ProductCarousel products={productItems} />
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">What Our Customers Say</h2>
                    <TestimonialCarousel testimonials={testimonials} />
                </section>
            </div>
            <Footer/>
        </div>
    );
}
