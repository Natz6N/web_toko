import React from 'react';
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import { Product } from "@/types/index";
import { Link } from '@inertiajs/react';
import { WhatsappIcon } from '@/components/icons';
import FlashToaster from "@/components/FlashToaster";

interface ShowProductProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ShowProduct({ product, relatedProducts }: ShowProductProps) {
  // Format price with Indonesian Rupiah
  const formatPrice = (price: number | string) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(Number(price));
  };

  // Helper for product image (fallback to placeholder)
  const getProductImage = (img?: string | null) =>
    img ? `/storage/${img}` : '/images/placeholder-product.jpg';

  // Helper for related product image (support both image and image_url)
  const getRelatedImage = (related: Product) =>
    related.image
      ? `/storage/${related.image}`
      : related.image_url
        ? related.image_url
        : '/images/placeholder-product.jpg';

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <FlashToaster />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="flex mb-8" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                  </svg>
                  <Link href="/products" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2">
                    Products
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                  </svg>
                  <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 truncate max-w-xs">{product.name}</span>
                </div>
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden flex items-center justify-center min-h-[320px]">
              <img
                src={getProductImage(product.image)}
                alt={product.name}
                className="w-full h-auto object-cover aspect-square"
                loading="lazy"
                onError={e => {
                  (e.target as HTMLImageElement).src = '/images/placeholder-product.jpg';
                }}
              />
            </div>

            {/* Product Details */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2 text-gray-900">{product.name}</h1>
                <div className="flex items-center mb-4 flex-wrap gap-2">
                  <span className="text-2xl font-bold text-blue-600">{formatPrice(product.price)}</span>
                  {product.stock > 0 ? (
                    <span className="px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full">
                      In Stock ({product.stock})
                    </span>
                  ) : (
                    <span className="px-3 py-1 text-sm font-medium text-red-800 bg-red-100 rounded-full">
                      Out of Stock
                    </span>
                  )}
                  {product.category && (
                    <span className="px-2 py-0.5 text-xs font-semibold bg-blue-50 text-blue-700 rounded">
                      {product.category.name}
                    </span>
                  )}
                </div>
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2 text-gray-800">Description</h2>
                  <p className="text-gray-700 whitespace-pre-line">{product.description || 'No description available.'}</p>
                </div>

              </div>
              <div className="space-y-4 mt-6">
                <a
                  href={product.whatsapp_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full px-6 py-3 bg-green-500 text-white font-medium rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300"
                >
                  <WhatsappIcon className="w-5 h-5 mr-2" />
                  Order via WhatsApp
                </a>
                <Link
                  href="/products"
                  className="flex items-center justify-center w-full px-6 py-3 bg-gray-100 text-gray-800 font-medium rounded-lg shadow-md hover:bg-gray-200 transition-colors duration-300"
                >
                  Back to All Products
                </Link>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts && relatedProducts.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {relatedProducts.map((related) => (
                  <Link key={related.id} href={`/products/${related.slug}`}>
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group h-full flex flex-col">
                      <div className="relative w-full h-48 bg-gray-100 flex items-center justify-center">
                        <img
                          src={getRelatedImage(related)}
                          alt={related.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                          loading="lazy"
                          onError={e => {
                            (e.target as HTMLImageElement).src = '/images/placeholder-product.jpg';
                          }}
                        />
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-medium text-lg mb-1 text-gray-900 truncate">{related.name}</h3>
                          <p className="font-bold text-blue-600">{formatPrice(related.price)}</p>
                        </div>
                        {related.category && (
                          <span className="mt-2 inline-block px-2 py-0.5 text-xs font-semibold bg-blue-50 text-blue-700 rounded">
                            {related.category.name}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
