<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use App\Http\Requests\StoreCategoriesRequest;
use App\Http\Requests\UpdateCategoriesRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CategoriesController extends Controller
{
     // Daftar semua kategori (bisa diakses publik)
    public function index() {
        return Categories::all();
    }

    // Simpan kategori baru (admin)
    public function store(Request $request) {
        $validated = $request->validate([
            'name' => 'required|string',
            'slug' => 'required|string|unique:categories,slug',
        ]);
        $Categories = Categories::create($validated);
        return response()->json($Categories, 201);
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
        $validated = $request->validate([
            'name' => 'sometimes|required|string',
            'slug' => 'sometimes|required|string|unique:categories,slug,' . $Categories->id,
        ]);
        $Categories->update($validated);
        return response()->json($Categories);
    }

    // Hapus kategori (admin)
    public function destroy(Categories $Categories) {
        $Categories->delete();
        return response()->noContent();
    }
}
