import React, { useState } from "react";
import { Product, Category } from "@/types/index";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import { Link, router } from "@inertiajs/react";
import FlashToaster from "@/components/FlashToaster";

interface BrowseProps {
  products: Product[];
  categories: Category[];
  filters: {
    category?: string;
    search?: string;
  };
}

function formatPrice(price: number | string) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Number(price));
}

export default function Browse({ products, categories, filters }: BrowseProps) {
  const [search, setSearch] = useState(filters.search || "");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    filters.category || null
  );

  const handleSearch = (value: string) => {
    setSearch(value);
    // Only include category parameter if it's not null
    const params: { search?: string; category?: string } = { search: value };
    if (selectedCategory) {
      params.category = selectedCategory;
    }

    router.get(
      route("products.browse"),
      params,
      { preserveState: true, preserveScroll: true, replace: true }
    );
  };

  const handleCategorySelect = (categorySlug: string | null) => {
    setSelectedCategory(categorySlug);

    // Build params object conditionally
    const params: { search?: string; category?: string } = {};
    if (categorySlug) {
      params.category = categorySlug;
    }
    if (search) {
      params.search = search;
    }

    router.get(
      route("products.browse"),
      params,
      { preserveState: true, preserveScroll: true, replace: true }
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <FlashToaster />
      <main className="flex-1 container mx-auto px-4 py-8 flex gap-8">
        {/* Sidebar */}
        <aside className="w-64 bg-white rounded-lg shadow-md p-6 h-fit">
          <h2 className="text-lg font-semibold mb-4">Filter</h2>
          <div className="mb-6">
            <label htmlFor="search" className="block text-sm font-medium mb-2">
              Search Product
            </label>
            <input
              id="search"
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search by name..."
            />
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-2">Category</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleCategorySelect(null)}
                  className={`w-full text-left px-2 py-1 rounded ${
                    !selectedCategory
                      ? "bg-blue-100 text-blue-700 font-bold"
                      : "hover:bg-gray-100"
                  }`}
                >
                  All Categories
                </button>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => handleCategorySelect(cat.slug)}
                    className={`w-full text-left px-2 py-1 rounded ${
                      selectedCategory === cat.slug
                        ? "bg-blue-100 text-blue-700 font-bold"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Products */}
        <section className="flex-1">
          <h1 className="text-2xl font-bold mb-6">Browse Products</h1>
          {products.length === 0 ? (
            <div className="text-gray-500 text-center mt-16">
              No products found.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow group flex flex-col"
                >
                  <div className="relative w-full h-48 bg-gray-100 flex items-center justify-center">
                    <img
                      src={
                        product.image
                          ? `/storage/${product.image}`
                          : "/images/placeholder-product.jpg"
                      }
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/images/placeholder-product.jpg";
                      }}
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-medium text-lg mb-1 text-gray-900 truncate">
                        {product.name}
                      </h3>
                      <p className="font-bold text-blue-600">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                    {product.category && (
                      <span className="mt-2 inline-block px-2 py-0.5 text-xs font-semibold bg-blue-50 text-blue-700 rounded">
                        {product.category.name}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
