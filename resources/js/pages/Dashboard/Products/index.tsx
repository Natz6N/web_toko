import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Product } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import {
  Eye,
  Pencil,
  Trash2,
  Plus,
  Search,
  FilterX,
  ArrowUpDown,
  ArrowDown,
  ArrowUp,
  ShoppingBag
} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types/index';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface ProductsIndexProps {
  products: Product[];
}

export default function ProductsIndex({ products }: ProductsIndexProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Product>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Dashboard',
      href: '/dashboard',
    },
    {
      title: 'Products',
      href: route('products.index.dashboard'),
    },
  ];

  // Format price with currency
  const formatPrice = (price: number | string) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(Number(price));
  };

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortField === 'price' || sortField === 'stock') {
      const aValue = Number(a[sortField]);
      const bValue = Number(b[sortField]);
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    } else {
      const aValue = String(a[sortField] || '').toLowerCase();
      const bValue = String(b[sortField] || '').toLowerCase();
      return sortDirection === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
  });

  // Handle sorting
  const handleSort = (field: keyof Product) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Handle delete
  const confirmDelete = (id: number) => {
    setProductToDelete(id);
    setDeleteConfirm(true);
  };

  const handleDelete = () => {
    if (productToDelete) {
      router.delete(route('products.destroy.dashboard', { id: productToDelete }), {
        onSuccess: () => {
          setDeleteConfirm(false);
          setProductToDelete(null);
        },
      });
    }
  };

  // Get sort icon
  const getSortIcon = (field: keyof Product) => {
    if (field !== sortField) {
      return <ArrowUpDown className="ml-1 h-4 w-4" />;
    }
    return sortDirection === 'asc' ? (
      <ArrowUp className="ml-1 h-4 w-4" />
    ) : (
      <ArrowDown className="ml-1 h-4 w-4" />
    );
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Products" />

      <div className="p-6">
        <div className="flex flex-col gap-6">
          {/* Header and actions */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold flex items-center">
                <ShoppingBag className="mr-2 h-6 w-6" />
                Products
              </h1>
              <p className="text-gray-500">Manage your product catalog</p>
            </div>
            <div>
              <Link href={route('products.create.dashboard')}>
                <Button className="flex items-center">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Product
                </Button>
              </Link>
            </div>
          </div>

          {/* Filters */}
          <Card className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select
                  value={sortField}
                  onValueChange={(value) => handleSort(value as keyof Product)}
                >
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="stock">Stock</SelectItem>
                    <SelectItem value="created_at">Created Date</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                >
                  {sortDirection === 'asc' ? (
                    <ArrowUp className="h-4 w-4" />
                  ) : (
                    <ArrowDown className="h-4 w-4" />
                  )}
                </Button>
                {searchTerm && (
                  <Button
                    variant="outline"
                    onClick={() => setSearchTerm('')}
                    className="flex items-center"
                  >
                    <FilterX className="mr-2 h-4 w-4" />
                    Clear
                  </Button>
                )}
              </div>
            </div>
          </Card>

          {/* Products Table */}
          <Card>
            <div className="rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Image</TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort('name')}
                    >
                      <div className="flex items-center">
                        Product Name
                        {getSortIcon('name')}
                      </div>
                    </TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort('price')}
                    >
                      <div className="flex items-center">
                        Price
                        {getSortIcon('price')}
                      </div>
                    </TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort('stock')}
                    >
                      <div className="flex items-center">
                        Stock
                        {getSortIcon('stock')}
                      </div>
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedProducts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                        {searchTerm
                          ? 'No products matching your search'
                          : 'No products available yet'}
                      </TableCell>
                    </TableRow>
                  ) : (
                    sortedProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="h-10 w-10 rounded-md overflow-hidden bg-gray-100">
                            {product.image ? (
                              <img
                                src={'/storage/' + product.image}
                                alt={product.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full w-full text-gray-400">
                                <ShoppingBag className="h-5 w-5" />
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-gray-500 truncate max-w-xs">
                              {product.description
                                ? product.description.substring(0, 50) + (product.description.length > 50 ? '...' : '')
                                : 'No description'}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-mono text-green-700">
                            {formatPrice(product.price)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={product.stock > 10 ? 'default' : (product.stock > 0 ? 'secondary' : 'destructive')}
                            className={product.stock > 10 ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' : ''}
                          >
                            {product.stock > 0 ? `${product.stock} units` : 'Out of stock'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Link href={route('products.show.dashboard', { id: product.id })}>
                              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                <span className="sr-only">View</span>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Link href={`/dashboard/products/edit/${product.id}`}>
                              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                <span className="sr-only">Edit</span>
                                <Pencil className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0 text-red-600"
                              onClick={() => confirmDelete(product.id)}
                            >
                              <span className="sr-only">Delete</span>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteConfirm} onOpenChange={setDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              product and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppLayout>
  );
}
