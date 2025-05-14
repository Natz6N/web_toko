import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";

export default function Index() {
    return (
        <div>
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-center">Welcome to My E-commerce Site</h1>
                <p className="mt-4 text-center">Shop the latest products and enjoy exclusive deals!</p>
            </div>
            <Footer/>
        </div>
    );
}
