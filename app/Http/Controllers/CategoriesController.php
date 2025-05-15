<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Categories;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Requests\StoreCategoriesRequest;
use App\Http\Requests\UpdateCategoriesRequest;

class CategoriesController extends Controller
{
     // Daftar semua kategori (bisa diakses publik)
    public function index() {
        return Categories::all();
    }

    // Simpan kategori baru (admin)
    public function store(Request $request) {
        try {
            $validated = $request->validate([
                'name' => 'required|string',
                'slug' => 'required|string|unique:categories,slug',
            ]);

            $category = Categories::create($validated);

            return redirect()->back()->with('success', "Kategori '{$category->name}' berhasil ditambahkan.");
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal menambahkan kategori: ' . $e->getMessage());
        }
    }

    // Tampilkan detail kategori (publik/admin)
    public function show(Categories $Categories) {
        return $Categories;
    }

    // Tampilkan detail kategori di dashboard admin
    public function showDashboard(Categories $Categories) {
        // Get products in this category if needed
        // Assuming there's a relationship between categories and products
        return Inertia::render('Dashboard/Category/show', [
            'category' => $Categories,
        ]);
    }

    // Update kategori (admin)
    public function update(Request $request, Categories $Categories) {
        try {
            $validated = $request->validate([
                'name' => 'sometimes|required|string',
                'slug' => 'sometimes|required|string|unique:categories,slug,' . $Categories->id,
            ]);

            $Categories->update($validated);

            return redirect()->back()->with('success', "Kategori '{$Categories->name}' berhasil diperbarui.");
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal memperbarui kategori: ' . $e->getMessage());
        }
    }

    // Hapus kategori (admin)
    public function destroy(Categories $Categories) {
        try {
            $categoryName = $Categories->name;
            $Categories->delete();

            return redirect()->route('categories.index.dashboard')->with('success', "Kategori '{$categoryName}' berhasil dihapus.");
        } catch (\Exception $e) {
            return redirect()->route('categories.index.dashboard')->with('error', 'Gagal menghapus kategori: ' . $e->getMessage());
        }
    }
}
