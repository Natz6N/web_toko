import AppLayout from '@/layouts/app-layout';
import { Product } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Edit, Trash2, ExternalLink, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BreadcrumbItem } from '@/types/index';
import { Card } from '@/components/ui/card';

export default function ShowProduct({ product }: { product: Product }) {
  // Format the price with commas
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(Number(product.price));

  // Format dates
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  };

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Dashboard',
      href: '/dashboard',
    },
    {
      title: 'Products',
      href: route('products.index.dashboard'),
    },
    {
      title: product.name,
      href: route('products.show.dashboard', { id: product.id }),
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Product: ${product.name}`} />
      <div className="p-6">
        {/* Header with actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-gray-500 text-sm">
              {product.created_at && `Created: ${formatDate(product.created_at)}`}
              {product.updated_at && ` • Updated: ${formatDate(product.updated_at)}`}
            </p>
          </div>
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Link href={route('products.index.dashboard')}>
              <Button variant="outline" size="sm" className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to List
              </Button>
            </Link>
            <Link href={route('products.edit.dashboard', { id: product.id })}>
              <Button size="sm" className="flex items-center">
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
            </Link>
            <Button variant="destructive" size="sm" className="flex items-center">
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </div>
        </div>

        {/* Product details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Product image */}
          <div className="md:col-span-1">
            <Card className="overflow-hidden">
              {product.image ? (
                <img
                  src={'/storage/' + product.image}
                  alt={product.name}
                  className="w-full h-auto object-cover aspect-square"
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">No image available</p>
                </div>
              )}
            </Card>
          </div>

          {/* Product info */}
          <div className="md:col-span-2">
            <Card className="p-6">
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Product ID</dt>
                  <dd className="mt-1 text-sm text-gray-900">{product.id}</dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">Name</dt>
                  <dd className="mt-1 text-gray-900 font-medium">{product.name}</dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">Slug</dt>
                  <dd className="mt-1 text-sm text-gray-900">{product.slug}</dd>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Price</dt>
                    <dd className="mt-1 text-lg font-bold text-green-600">{formattedPrice}</dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Stock</dt>
                    <dd className="mt-1 text-lg font-bold">
                      <span className={`${product.stock > 0 ? 'text-blue-600' : 'text-red-600'}`}>
                        {product.stock}
                      </span>
                      <span className="text-sm font-normal ml-1">units</span>
                    </dd>
                  </div>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">Description</dt>
                  <dd className="mt-1 text-sm text-gray-900 whitespace-pre-line">{product.description || 'No description provided.'}</dd>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <dt className="text-sm font-medium text-gray-500">Public URL</dt>
                  <dd className="mt-1">
                    <a
                      href={`/products/${product.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800"
                    >
                      View on website
                      <ExternalLink className="ml-1 h-4 w-4" />
                    </a>
                  </dd>
                </div>

                {product.whatsapp_link && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">WhatsApp Ordering Link</dt>
                    <dd className="mt-1">
                      <a
                        href={product.whatsapp_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-green-600 hover:text-green-800"
                      >
                        Order via WhatsApp
                        <Share2 className="ml-1 h-4 w-4" />
                      </a>
                    </dd>
                  </div>
                )}
              </dl>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
