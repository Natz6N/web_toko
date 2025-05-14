<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
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
        return $product;
    }

    // Simpan produk baru (admin)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'        => 'required|string',
            'price'       => 'required|numeric',
            'stock'       => 'required|integer',
            'description' => 'nullable|string',
            'image'       => 'nullable|image',
        ]);

        // Generate slug dari nama produk
        $validated['slug'] = Str::slug($validated['name']);

        // Simpan file gambar jika ada
        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('products', 'public');
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
            'image'       => 'nullable|image',
        ]);

        // Jika nama berubah, perbarui slug
        if (isset($validated['name'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        // Update file gambar jika ada
        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('products', 'public');
        }

        $product->update($validated);
        return response()->json($product, 200);
    }

    // Hapus produk (admin)
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        return response()->json(['message' => 'Produk dihapus'], 200);
    }
}
