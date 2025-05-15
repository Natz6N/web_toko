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
    public function store(StoreProductRequest $request)
    {
        try {
            $validated = $request->validated();

            // Generate slug dari nama produk
            $validated['slug'] = Str::slug($validated['name']);

            // Simpan file gambar jika ada
            if ($request->hasFile('image')) {
                $validated['image'] = Storage::disk('public')->put('products', $request->file('image'));
            }

            $product = Product::create($validated);

            return redirect()->back()->with('success', "Produk '{$product->name}' berhasil ditambahkan.");
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal menambahkan produk: ' . $e->getMessage());
        }
    }

    // Update produk (admin)
    public function update(UpdateProductRequest $request, $id)
    {
        try {
            $product = Product::findOrFail($id);
            $validated = $request->validated();

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

            return redirect()->back()->with('success', "Produk '{$product->name}' berhasil diperbarui.");
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal memperbarui produk: ' . $e->getMessage());
        }
    }

    // Hapus produk (admin)
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
            return redirect()->route('products.index.dashboard')->with('success', "Produk '{$productName}' berhasil dihapus.");
        } catch (\Exception $e) {
            return redirect()->route('products.index.dashboard')->with('error', 'Gagal menghapus produk: ' . $e->getMessage());
        }
    }
}
