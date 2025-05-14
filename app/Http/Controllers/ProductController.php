<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
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
        return Inertia::render('Dashboard/Products/create');
    }

    // Simpan produk baru (admin)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'        => 'required|string',
            'price'       => 'required|numeric',
            'stock'       => 'required|integer',
            'description' => 'nullable|string',
            'image'       => 'nullable|image|max:2048',
        ]);

        // Generate slug dari nama produk
        $validated['slug'] = Str::slug($validated['name']);

        // Simpan file gambar jika ada
        if ($request->hasFile('image')) {
            $validated['image'] = Storage::disk('public')->put('products', $request->file('image'));
        }

        $product = Product::create($validated);
        return response()->json($product, 201);
    }

    // Update produk (admin)
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'name'        => 'sometimes|required|string',
            'price'       => 'sometimes|required|numeric',
            'stock'       => 'sometimes|required|integer',
            'description' => 'nullable|string',
            'image'       => 'nullable|image|max:2048',
        ]);

        // Jika nama berubah, perbarui slug
        if (isset($validated['name'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        // Update file gambar jika ada
        if ($request->hasFile('image')) {
            // Hapus gambar lama jika ada
            if ($product->image && Storage::disk('public')->exists($product->image)) {
                Storage::disk('public')->delete($product->image);
            }

            $validated['image'] = Storage::disk('public')->put('products', $request->file('image'));
        }

        $product->update($validated);
        return response()->json($product, 200);
    }

    // Hapus produk (admin)
    public function destroy($id)
    {
        $product = Product::findOrFail($id);

        // Hapus gambar jika ada
        if ($product->image && Storage::disk('public')->exists($product->image)) {
            Storage::disk('public')->delete($product->image);
        }

        $product->delete();
        return response()->json(['message' => 'Produk dihapus'], 200);
    }
}
