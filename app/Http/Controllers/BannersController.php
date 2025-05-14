<?php

namespace App\Http\Controllers;

use App\Models\banners;
use Illuminate\Http\Request;
use App\Http\Requests\StorebannersRequest;
use App\Http\Requests\UpdatebannersRequest;

class BannersController extends Controller
{
     // Daftar banner aktif (publik, halaman depan)
    public function index() {
        return banners::where('is_active', true)->get();
    }

    // Simpan banner baru (admin)
    public function store(Request $request) {
        $validated = $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
            'image' => 'required|string',
            'is_active' => 'boolean',
        ]);
        $banner = banners::create($validated);
        return response()->json($banner, 201);
    }

    // Tampilkan detail banner (admin)
    public function show(banners $banner) {
        return $banner;
    }

    // Update banner (admin)
    public function update(Request $request, banners $banner) {
        $validated = $request->validate([
            'title' => 'sometimes|required|string',
            'description' => 'nullable|string',
            'image' => 'sometimes|required|string',
            'is_active' => 'boolean',
        ]);
        $banner->update($validated);
        return response()->json($banner);
    }

    // Hapus banner (admin)
    public function destroy(banners $banner) {
        $banner->delete();
        return response()->noContent();
    }
}
