import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <div className="flex w-screen items-center justify-center bg-white dark:bg-gray-800">
            <footer className="border-t border-gray-200 bg-white text-gray-700">
                <div className="container mx-auto px-6 py-8">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                        <div>
                            <h2 className="flex items-center space-x-2 text-xl font-semibold">
                                <span className="text-2xl text-blue-600">ES</span> <span>BAZAR</span>
                            </h2>
                            <p className="mt-2 text-sm text-gray-600">
                                Lorem ipsum dolor sit amet consectetur. Imperdiet aliquet faucibus malesuada vitae.
                            </p>
                            <p className="mt-2 text-sm text-gray-600">
                                <span className="font-semibold">(219) 555-0114</span>
                            </p>
                            {/* Social Icons */}
                            <div className="mt-3 flex space-x-3">
                                <Link href="#" className="text-blue-600">
                                    <i className="fab fa-facebook"></i>
                                </Link>
                                <Link href="#" className="text-red-600">
                                    <i className="fab fa-reddit"></i>
                                </Link>
                                <Link href="#" className="text-green-500">
                                    <i className="fab fa-whatsapp"></i>
                                </Link>
                                <Link href="#" className="text-pink-600">
                                    <i className="fab fa-pinterest"></i>
                                </Link>
                            </div>
                        </div>

                        {/* My Account */}
                        <div>
                            <h3 className="mb-2 font-semibold">My Account</h3>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <Link href="#" className="hover:text-blue-600">
                                        My Account
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:text-blue-600">
                                        Order History
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:text-blue-600">
                                        Shopping Cart
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:text-blue-600">
                                        Wishlist
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Help Section */}
                        <div>
                            <h3 className="mb-2 font-semibold">Helps</h3>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <Link href="#" className="hover:text-blue-600">
                                        Contact
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:text-blue-600">
                                        FAQs
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:text-blue-600">
                                        Terms & Condition
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:text-blue-600">
                                        Privacy Policy
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Categories */}
                        <div>
                            <h3 className="mb-2 font-semibold">Categories</h3>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <Link href="#" className="hover:text-blue-600">
                                        Printers
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:text-blue-600">
                                        Cartridge
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:text-blue-600">
                                        Ink
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Payment and App Download */}
                    <div className="mt-6 flex flex-col items-center justify-between md:flex-row">
                        <div className="flex space-x-2">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-v52tLnvL3FEjfxjPvZWbvUMYvVUtAm9R6A&s"
                                alt="Google Play"
                                className="h-10"
                            />
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJgk5tpxJC_1CAnsXwo2VvBGyQGI-o5c1PJw&s"
                                alt="App Store"
                                className="h-10"
                            />
                        </div>
                        <div className="mt-4 flex space-x-2 md:mt-0">
                            <img
                                src="https://www.logo.wine/a/logo/Apple_Pay/Apple_Pay-White-Dark-Background-Logo.wine.svg"
                                alt="Apple Pay"
                                className="h-[30px] w-10 rounded-md"
                            />
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSynWEtLag--sQ4XlfTwHh9_DAnfcglW7C3iw&s"
                                alt="Visa"
                                className="h-[30px] w-10 rounded-md"
                            />
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6mJsEDg1aR_JCFb3ohk2nCxjgSvkWnpmlKg&s"
                                alt="Mastercard"
                                className="h-[30px] w-10 rounded-md"
                            />
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQveKfGcJ1tSEY8bLg52DxvVrFDJXmxXJgv1Q&s"
                                alt="discover"
                                className="h-[30px] w-10 rounded-md"
                            />
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDS0zyuJdI4e7E1VGaNDAVtRn3fGTzr0PBOA&s"
                                alt="Secure Payment"
                                className="h-[30px] w-10 rounded-md"
                            />
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="mt-6 border-t pt-4 text-center text-sm text-gray-500">ExpertSquad © 2025. All Rights Reserved.</div>
                </div>
            </footer>
        </div>
    );
}
