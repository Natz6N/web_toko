import { SelectInput } from '@/components/selectOptions';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Category } from '@/types/index';
import { Head, Link, router } from '@inertiajs/react';
import FlashToaster from '@/components/FlashToaster';
import { ArrowLeft, Save, Upload, X } from 'lucide-react';
import React, { FormEvent, useRef, useState } from 'react';

interface CreateProductProps {
    categories: Category[];
}

export default function CreateProduct({ categories }: CreateProductProps) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState<string>('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const dropRef = useRef<HTMLLabelElement>(null);

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        if (dropRef.current) {
            dropRef.current.classList.add('border-blue-500', 'bg-blue-50');
        }
    };

    const handleDragLeave = () => {
        if (dropRef.current) {
            dropRef.current.classList.remove('border-blue-500', 'bg-blue-50');
        }
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Products', href: route('products.index.dashboard') },
        { title: 'Create Product', href: '#' },
    ];

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('stock', stock);
        formData.append('category_id', category);
        formData.append('description', description || '');
        if (image) {
            formData.append('image', image);
        }

        router.post(route('products.store.dashboard'), formData, {
            forceFormData: true,
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                // Success will trigger a redirect with flash messages from backend
                // Toast will be shown by the FlashToaster component
            },
            onError: (errors) => {
                setErrors(errors);
                setLoading(false);
            },
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImage(null);
        setImagePreview(null);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <FlashToaster />
            <Head title="Create Product" />
            <div className="p-6">
                <div className="flex flex-col gap-6">
                    {/* Header and actions */}
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">Create New Product</h1>
                            <p className="text-gray-500">Add a new product to your store</p>
                        </div>
                        <div className="flex gap-2">
                            <Link href={route('products.index.dashboard')}>
                                <Button variant="outline" className="flex items-center">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back to Products
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Product Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Card className="p-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="space-y-6">
                                    {/* Product Name */}
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className={errors.name ? 'text-red-500' : ''}>
                                            Product Name <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="name"
                                            placeholder="Enter product name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className={errors.name ? 'border-red-500' : ''}
                                        />
                                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                    </div>

                                    {/* Category */}
                                    <div className="space-y-2">
                                        <Label htmlFor="category" className={errors.category ? 'text-red-500' : ''}>
                                            Category <span className="text-red-500">*</span>
                                        </Label>
                                        <SelectInput
                                            label="Category"
                                            name="category"
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            options={categories.map((cat) => ({
                                                label: cat.name,
                                                value: cat.id.toString(),
                                            }))}
                                            required
                                            error={errors.category}
                                        />
                                        {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
                                    </div>

                                    {/* Price */}
                                    <div className="space-y-2">
                                        <Label htmlFor="price" className={errors.price ? 'text-red-500' : ''}>
                                            Price <span className="text-red-500">*</span>
                                        </Label>
                                        <div className="relative">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <span className="text-gray-500">Rp</span>
                                            </div>
                                            <Input
                                                id="price"
                                                type="number"
                                                placeholder="0"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                                className={`pl-10 ${errors.price ? 'border-red-500' : ''}`}
                                                min="0"
                                                step="0.01"
                                            />
                                        </div>
                                        {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
                                    </div>

                                    {/* Stock */}
                                    <div className="space-y-2">
                                        <Label htmlFor="stock" className={errors.stock ? 'text-red-500' : ''}>
                                            Stock <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="stock"
                                            type="number"
                                            placeholder="0"
                                            value={stock}
                                            onChange={(e) => setStock(e.target.value)}
                                            className={errors.stock ? 'border-red-500' : ''}
                                            min="0"
                                        />
                                        {errors.stock && <p className="text-sm text-red-500">{errors.stock}</p>}
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {/* Product Description */}
                                    <div className="space-y-2">
                                        <Label htmlFor="description" className={errors.description ? 'text-red-500' : ''}>
                                            Description
                                        </Label>
                                        <Textarea
                                            id="description"
                                            placeholder="Enter product description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            className={`min-h-[120px] ${errors.description ? 'border-red-500' : ''}`}
                                        />
                                        {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                                    </div>

                                    {/* Product Image */}
                                    <div className="space-y-2">
                                        <Label className={errors.image ? 'text-red-500' : ''}>Product Image</Label>
                                        {imagePreview ? (
                                            <div className="group relative mt-2 h-[200px] w-full overflow-hidden rounded-md">
                                                <img src={imagePreview} alt="Product preview" className="h-full w-full object-cover" />
                                                <div className="bg-opacity-40 absolute inset-0 flex items-center justify-center bg-black opacity-0 transition-opacity group-hover:opacity-100">
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={removeImage}
                                                        className="flex items-center"
                                                    >
                                                        <X className="mr-1 h-4 w-4" />
                                                        Remove
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="mt-2">
                                                <Label
                                                    ref={dropRef}
                                                    htmlFor="image"
                                                    className="flex h-[200px] w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed bg-gray-50 hover:bg-gray-100"
                                                    onDrop={handleDrop}
                                                    onDragOver={handleDragOver}
                                                    onDragLeave={handleDragLeave}
                                                >
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <Upload className="mb-2 h-10 w-10 text-gray-400" />
                                                        <p className="mb-2 text-sm text-gray-500">
                                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                                        </p>
                                                        <p className="text-xs text-gray-500">PNG, JPG or WEBP (max. 2MB)</p>
                                                    </div>
                                                    <Input id="image" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                                                </Label>
                                            </div>
                                        )}
                                        {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Form Actions */}
                        <div className="flex justify-end gap-2">
                            <Link href={route('products.index.dashboard')}>
                                <Button variant="outline" type="button">
                                    Cancel
                                </Button>
                            </Link>
                            <Button type="submit" disabled={loading} className="flex items-center">
                                <Save className="mr-2 h-4 w-4" />
                                {loading ? 'Saving...' : 'Save Product'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
