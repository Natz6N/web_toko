import {Button} from "@/components/ui/button";
import { Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [darkMode, setDarkMode] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { url } = usePage();

    // Load dark mode preference from localStorage after component mounts
    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedDarkMode = localStorage.getItem("dark-mode") === "true";
            setDarkMode(savedDarkMode);
        }
    }, []);

    // Apply or remove dark mode class on <html>
    useEffect(() => {
        if (typeof window !== "undefined") {
            if (darkMode) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
            localStorage.setItem("dark-mode", darkMode.toString());
        }
    }, [darkMode]);

    const toggleDarkMode = () => setDarkMode((prev) => !prev);
    const toggleMenu = () => setMenuOpen((prev) => !prev);

    const navLinkClass = (path: string) =>
        `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            url === path
                ? "text-blue-500 dark:text-blue-400"
                : "text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
        }`;

    return (
        <nav className="bg-white dark:bg-gray-900 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    {/* Brand */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-2xl font-bold text-gray-800 dark:text-white">
                            MyBrand
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-8">
                        <Link href="/" className={navLinkClass("/")}>Home</Link>
                        <Link href="/about" className={navLinkClass("/about")}>About</Link>
                        <Link href="/services" className={navLinkClass("/services")}>Services</Link>
                        <Link href="/contact" className={navLinkClass("/contact")}>Contact</Link>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center space-x-4">
                        <Button
                            onClick={toggleDarkMode}
                            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded"
                        >
                            {darkMode ? "Light Mode" : "Dark Mode"}
                        </Button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={toggleMenu}
                            aria-label="Toggle menu"
                            aria-expanded={menuOpen}
                            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                {menuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {menuOpen && (
                <div className="md:hidden bg-white dark:bg-gray-900 px-2 pt-2 pb-3 space-y-1 shadow-md transition-all duration-300 ease-in-out">
                    <Link href="/" className={navLinkClass("/")} onClick={() => setMenuOpen(false)}>Home</Link>
                    <Link href="/about" className={navLinkClass("/about")} onClick={() => setMenuOpen(false)}>About</Link>
                    <Link href="/services" className={navLinkClass("/services")} onClick={() => setMenuOpen(false)}>Services</Link>
                    <Link href="/contact" className={navLinkClass("/contact")} onClick={() => setMenuOpen(false)}>Contact</Link>
                </div>
            )}
        </nav>
    );
}
