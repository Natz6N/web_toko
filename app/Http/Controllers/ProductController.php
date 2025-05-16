<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use App\Models\Categories;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\StoreProductRequest;

use App\Http\Requests\UpdateProductRequest;

class ProductController extends Controller
{
    // Daftar semua produk (publik)
    public function index()
    {
        return Product::all();
    }

    // Tampilkan detail produk berdasarkan slug (publik)
    public function show($slug)
    {
        $product = Product::where('slug', $slug)->firstOrFail();

        // Get related products - products with same categories or similar price range
        $relatedProducts = Product::where('id', '!=', $product->id)
            ->take(4)
            ->get();

        return Inertia::render('web/showProduct', [
            'product' => $product,
            'relatedProducts' => $relatedProducts
        ]);
    }

    // Tampilkan detail produk di dashboard admin
    public function showDashboard($id)
    {
        $product = Product::findOrFail($id);
        return Inertia::render('Dashboard/Products/show', [
            'product' => $product
        ]);
    }

    // Tampilkan form untuk membuat produk baru
    public function create()
    {
        $categories = Categories::all();
        return Inertia::render('Dashboard/Products/create', [
            'categories' => $categories
        ]);
    }

    // Tampilkan form untuk mengedit produk
    public function edit($id)
    {
        $product = Product::findOrFail($id);
        $categories = Categories::all();

        return Inertia::render('Dashboard/Products/update', [
            'product' => $product,
            'categories' => $categories
        ]);
    }

    // Simpan produk baru (admin)
    public function store(StoreProductRequest $request)
    {
        try {
            $validatedData = $request->validated();
            
            // Generate slug from product name
            $validatedData['slug'] = Str::slug($validatedData['name']);

            // Handle image upload if present
            if ($request->hasFile('image')) {
                $path = $request->file('image')->store('products', 'public');
                $validatedData['image'] = $path;
            }

            // Create new product
            Product::create($validatedData);

            // Return with success flash message
            return redirect()->route('products.index.dashboard')
                ->with('success', "Product '{$validatedData['name']}' has been created successfully!");
        } catch (\Exception $e) {
            // Return with error flash message
            return redirect()->route('products.index.dashboard')
                ->with('error', 'Failed to create product: ' . $e->getMessage());
        }
    }

    // Update an existing product (admin)
    public function update(UpdateProductRequest $request, $id)
    {
        try {
            $product = Product::findOrFail($id);
            $validatedData = $request->validated();
            
            // Generate slug from product name if name has changed
            if ($product->name !== $validatedData['name']) {
                $validatedData['slug'] = Str::slug($validatedData['name']);
            }
            
            // Handle image upload if present
            if ($request->hasFile('image')) {
                // Delete old image if exists
                if ($product->image && Storage::disk('public')->exists($product->image)) {
                    Storage::disk('public')->delete($product->image);
                }
                
                $path = $request->file('image')->store('products', 'public');
                $validatedData['image'] = $path;
            }
            
            // Update product
            $product->update($validatedData);
            
            // Return with success flash message
            return redirect()->route('products.index.dashboard')
                ->with('success', "Product '{$product->name}' has been updated successfully!");
        } catch (\Exception $e) {
            // Return with error flash message
            return redirect()->route('products.index.dashboard')
                ->with('error', 'Failed to update product: ' . $e->getMessage());
        }
    }

    // Delete a product (admin)
    public function destroy($id)
    {
        try {
            $product = Product::findOrFail($id);
            $productName = $product->name;

            // Hapus gambar jika ada
            if ($product->image && Storage::disk('public')->exists($product->image)) {
                Storage::disk('public')->delete($product->image);
            }

            $product->delete();
            return redirect()->route('products.index.dashboard')
                ->with('success', "Product '{$productName}' has been deleted successfully!");
        } catch (\Exception $e) {
            return redirect()->route('products.index.dashboard')
                ->with('error', 'Failed to delete product: ' . $e->getMessage());
        }
    }

    public function browse(Request $request)
    {
        $query = Product::with('category');

        if ($request->filled('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        if ($request->filled('search')) {
            $searchTerm = '%' . $request->search . '%';
            $query->where(function($q) use ($searchTerm) {
                $q->where('name', 'like', $searchTerm)
                  ->orWhere('description', 'like', $searchTerm)
                  ->orWhere('slug', 'like', $searchTerm);
            });
        }

        $products = $query->get();
        $categories = Categories::all();

        return Inertia::render('web/Browse', [
            'products' => $products,
            'categories' => $categories,
            'filters' => $request->only(['category', 'search']),
        ]);
    }
}
