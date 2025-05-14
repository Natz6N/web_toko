import { Button } from '@/components/ui/button';
import { Link, usePage } from '@inertiajs/react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const [darkMode, setDarkMode] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { url } = usePage();

    useEffect(() => {
        const savedDarkMode = localStorage.getItem('dark-mode') === 'true';
        setDarkMode(savedDarkMode);
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('dark-mode', darkMode.toString());
    }, [darkMode]);

    const toggleDarkMode = () => setDarkMode((prev) => !prev);
    const toggleMenu = () => setMenuOpen((prev) => !prev);

    const navLinkClass = (path: string) =>
        `block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            url === path ? 'text-blue-600 dark:text-blue-400' : 'text-gray-800 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400'
        }`;

    return (
        <nav className="sticky top-0 z-50 bg-white shadow-md dark:bg-gray-900">
            <div className="mx-auto container px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-white">
                            ShopWise
                        </Link>
                    </div>

                    {/* Search Bar (desktop) */}
                    <div className="mx-6 hidden flex-1 md:flex">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full rounded-md border bg-gray-100 px-4 py-2 text-gray-900 focus:ring focus:ring-blue-300 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                        />
                    </div>

                    {/* Right Side Controls */}
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </Button>

                        {/* Mobile Toggle */}
                        <button onClick={toggleMenu} className="md:hidden">
                            {menuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>
            <div className="container mx-auto hidden md:flex items-center px-5">
                <Link href="/" className={navLinkClass('/')} onClick={() => setMenuOpen(false)}>
                    Home
                </Link>
                <Link href="/products" className={navLinkClass('/products')} onClick={() => setMenuOpen(false)}>
                    Products
                </Link>
                <Link href="/categories" className={navLinkClass('/categories')} onClick={() => setMenuOpen(false)}>
                    Categories
                </Link>
                <Link href="/contact" className={navLinkClass('/contact')} onClick={() => setMenuOpen(false)}>
                    Contact
                </Link>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="space-y-1 bg-white px-4 py-2 shadow-md md:hidden dark:bg-gray-900">
                    <Link href="/" className={navLinkClass('/')} onClick={() => setMenuOpen(false)}>
                        Home
                    </Link>
                    <Link href="/products" className={navLinkClass('/products')} onClick={() => setMenuOpen(false)}>
                        Products
                    </Link>
                    <Link href="/categories" className={navLinkClass('/categories')} onClick={() => setMenuOpen(false)}>
                        Categories
                    </Link>
                    <Link href="/contact" className={navLinkClass('/contact')} onClick={() => setMenuOpen(false)}>
                        Contact
                    </Link>
                </div>
            )}
        </nav>
    );
}
