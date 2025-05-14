import AppLayout from '@/layouts/app-layout';
import { Category } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Edit, Trash2, ExternalLink, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BreadcrumbItem } from '@/types/index';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ShowCategory({ category }: { category: Category }) {
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
      title: 'Categories',
      href: route('categories.index.dashboard'),
    },
    {
      title: category.name,
      href: route('categories.show.dashboard', { Categories: category.id }),
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Category: ${category.name}`} />
      <div className="p-6">
        {/* Header with actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">{category.name}</h1>
              <Badge variant="outline" className="ml-3">
                <Tag className="h-3 w-3 mr-1" />
                {category.slug}
              </Badge>
            </div>

            <p className="text-gray-500 text-sm">
              {category.created_at && `Created: ${formatDate(category.created_at)}`}
              {category.updated_at && ` • Updated: ${formatDate(category.updated_at)}`}
            </p>
          </div>
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Link href={route('categories.index.dashboard')}>
              <Button variant="outline" size="sm" className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to List
              </Button>
            </Link>
            <Link href={`/dashboard/categories/edit/${category.id}`}>
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

        {/* Category details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Category image (if available) */}
          {category.image && (
            <div className="md:col-span-1">
              <Card className="overflow-hidden">
                <img
                  src={`/storage/${category.image}`}
                  alt={category.name}
                  className="w-full h-auto object-cover aspect-square"
                />
              </Card>
            </div>
          )}

          {/* Category info */}
          <div className={category.image ? "md:col-span-2" : "md:col-span-3"}>
            <Card className="p-6">
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Category ID</dt>
                  <dd className="mt-1 text-sm text-gray-900">{category.id}</dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">Name</dt>
                  <dd className="mt-1 text-gray-900 font-medium">{category.name}</dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">Slug</dt>
                  <dd className="mt-1 text-sm text-gray-900">{category.slug}</dd>
                </div>

                {category.description && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Description</dt>
                    <dd className="mt-1 text-sm text-gray-900 whitespace-pre-line">{category.description}</dd>
                  </div>
                )}

                {category.parent_id && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Parent Category</dt>
                    <dd className="mt-1 text-sm text-gray-900">{category.parent_id}</dd>
                  </div>
                )}

                <div>
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="mt-1">
                    <Badge
                      variant={category.status === 'active' ? 'default' : 'secondary'}
                      className={category.status === 'active' ? 'bg-green-100 text-green-800 hover:bg-green-100' : ''}
                    >
                      {category.status.charAt(0).toUpperCase() + category.status.slice(1)}
                    </Badge>
                  </dd>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <dt className="text-sm font-medium text-gray-500">Products in this Category</dt>
                  <dd className="mt-1">
                    <a
                      href={`/dashboard/products?category=${category.id}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800"
                    >
                      View related products
                      <ExternalLink className="ml-1 h-4 w-4" />
                    </a>
                  </dd>
                </div>
              </dl>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
