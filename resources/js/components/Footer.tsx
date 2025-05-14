import { Link } from "@inertiajs/react";

export default function Footer() {
    return (
        <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 mt-10 border-t dark:border-gray-700">
            <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* About Section */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">About Us</h2>
                    <p className="text-sm leading-relaxed">
                        We are a modern web development team passionate about building dynamic and accessible applications using React and Inertia.js.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h2>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/" className="hover:text-blue-500 dark:hover:text-blue-400">Home</Link></li>
                        <li><Link href="/about" className="hover:text-blue-500 dark:hover:text-blue-400">About</Link></li>
                        <li><Link href="/services" className="hover:text-blue-500 dark:hover:text-blue-400">Services</Link></li>
                        <li><Link href="/contact" className="hover:text-blue-500 dark:hover:text-blue-400">Contact</Link></li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Follow Us</h2>
                    <ul className="space-y-2 text-sm">
                        <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">Facebook</a></li>
                        <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">Twitter</a></li>
                        <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">Instagram</a></li>
                        <li><a href="mailto:support@example.com" className="hover:text-green-500">Email Us</a></li>
                    </ul>
                </div>
            </div>

            {/* Bottom */}
            <div className="border-t dark:border-gray-700 text-center py-4 text-sm">
                <p>&copy; {new Date().getFullYear()} MyBrand. All rights reserved.</p>
            </div>
        </footer>
    );
}
