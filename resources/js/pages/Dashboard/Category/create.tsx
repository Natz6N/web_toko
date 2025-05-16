import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Category } from '@/types/index';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { FileUploader } from '@/components/FileUploader';
import { X } from 'lucide-react';
import FlashToaster from '@/components/FlashToaster';

interface CreateCategoryProps {
  parentCategories?: Category[];
}

export default function CreateCategory({ parentCategories = [] }: CreateCategoryProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { data, setData, post, processing, errors, reset } = useForm<{
    name: string;
    slug: string;
    description: string;
    parent_id: string | null;
    status: string;
    image: File | null;
  }>({
    name: '',
    slug: '',
    description: '',
    parent_id: null,
    status: 'active',
    image: null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('categories.store.dashboard'));
  };

  const generateSlug = () => {
    const slug = data.name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setData('slug', slug);
  };

  const handleImageChange = (file: File | null) => {
    setData('image', file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const removeImage = () => {
    setData('image', null);
    setImagePreview(null);
  };

  return (
    <>
      <Head title="Create Category" />
      <FlashToaster />

      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Create New Category</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Category Information</CardTitle>
                  <CardDescription>Enter the details for the new category</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
                    <Input
                      id="name"
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                      onBlur={() => {
                        if (data.name && !data.slug) {
                          generateSlug();
                        }
                      }}
                      placeholder="Enter category name"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug <span className="text-red-500">*</span></Label>
                    <div className="flex gap-2">
                      <Input
                        id="slug"
                        value={data.slug}
                        onChange={(e) => setData('slug', e.target.value)}
                        placeholder="enter-slug-here"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={generateSlug}
                        disabled={!data.name}
                      >
                        Generate
                      </Button>
                    </div>
                    {errors.slug && <p className="text-red-500 text-sm">{errors.slug}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={data.description}
                      onChange={(e) => setData('description', e.target.value)}
                      placeholder="Enter category description"
                      rows={5}
                    />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Category Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="parent">Parent Category</Label>
                    <Select
                      value={data.parent_id || 'none'}
                      onValueChange={(value) => setData('parent_id', value === 'none' ? null : value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="No parent category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No parent category</SelectItem>
                        {parentCategories.map((category) => (
                          <SelectItem key={category.id} value={String(category.id)}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.parent_id && <p className="text-red-500 text-sm">{errors.parent_id}</p>}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="status">Status</Label>
                      <Switch
                        id="status"
                        checked={data.status === 'active'}
                        onCheckedChange={(checked) => setData('status', checked ? 'active' : 'inactive')}
                      />
                    </div>
                    <p className="text-sm text-gray-500">
                      {data.status === 'active' ? 'Active: ' : 'Inactive: '}
                      {data.status === 'active'
                        ? 'This category will be visible on the site.'
                        : 'This category will be hidden from the site.'}
                    </p>
                    {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Category Image</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Category preview"
                        className="w-full h-auto rounded-md object-cover"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <FileUploader
                      onFileSelect={handleImageChange}
                      accept="image/*"
                      maxSize={5}
                    />
                  )}
                  {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
                </CardContent>
              </Card>

              <CardFooter className="flex justify-between pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => reset()}
                  disabled={processing}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={processing}>
                  Create Category
                </Button>
              </CardFooter>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
