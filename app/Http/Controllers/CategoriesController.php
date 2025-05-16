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

    // Tampilkan halaman create kategori (admin)
    public function create() {
        return Inertia::render('Dashboard/Category/create');
    }

    // Simpan kategori baru (admin)
    public function store(Request $request) {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'slug' => 'required|string|max:255|unique:categories,slug',
                'status' => 'sometimes|string|in:active,inactive',
                'description' => 'nullable|string',
            ]);

            // Set default status if not provided
            if (!isset($validated['status'])) {
                $validated['status'] = 'active';
            }

            $category = Categories::create($validated);

            // Handle Inertia/API requests differently
            if ($request->wantsJson()) {
                return response()->json([
                    'success' => true,
                    'category' => $category,
                    'message' => "Kategori '{$category->name}' berhasil ditambahkan."
                ]);
            }

            return redirect()->route('categories.index.dashboard')
                ->with('success', "Kategori '{$category->name}' berhasil ditambahkan.");
        } catch (\Exception $e) {
            if ($request->wantsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Gagal menambahkan kategori: ' . $e->getMessage()
                ], 422);
            }

            return redirect()->back()
                ->withInput()
                ->with('error', 'Gagal menambahkan kategori: ' . $e->getMessage());
        }
    }

    // Tampilkan detail kategori (publik/admin)
    public function show(Categories $Categories) {
        return $Categories;
    }

    // Tampilkan halaman edit kategori (admin)
    public function edit(Categories $Categories) {
        return Inertia::render('Dashboard/Category/update', [
            'category' => $Categories,
            'parentCategories' => Categories::where('id', '!=', $Categories->id)->get()
        ]);
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
                'name' => 'sometimes|required|string|max:255',
                'slug' => 'sometimes|required|string|max:255|unique:categories,slug,' . $Categories->id,
                'status' => 'sometimes|string|in:active,inactive',
                'description' => 'nullable|string',
            ]);

            $Categories->update($validated);

            // Handle Inertia/API requests differently
            if ($request->wantsJson()) {
                return response()->json([
                    'success' => true,
                    'category' => $Categories,
                    'message' => "Kategori '{$Categories->name}' berhasil diperbarui."
                ]);
            }

            return redirect()->route('categories.index.dashboard')
                ->with('success', "Kategori '{$Categories->name}' berhasil diperbarui.");
        } catch (\Exception $e) {
            if ($request->wantsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Gagal memperbarui kategori: ' . $e->getMessage()
                ], 422);
            }

            return redirect()->back()
                ->withInput()
                ->with('error', 'Gagal memperbarui kategori: ' . $e->getMessage());
        }
    }

    // Hapus kategori (admin)
    public function destroy(Categories $Categories) {
        try {
            $categoryName = $Categories->name;
            $Categories->delete();

            return redirect()->route('categories.index.dashboard')
                ->with('success', "Kategori '{$categoryName}' berhasil dihapus.");
        } catch (\Exception $e) {
            return redirect()->route('categories.index.dashboard')
                ->with('error', 'Gagal menghapus kategori: ' . $e->getMessage());
        }
    }
}
