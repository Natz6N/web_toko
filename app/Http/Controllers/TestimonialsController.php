<?php

namespace App\Http\Controllers;

use App\Models\testimonials;
use Illuminate\Http\Request;
use App\Http\Requests\StoretestimonialsRequest;
use App\Http\Requests\UpdatetestimonialsRequest;

class TestimonialsController extends Controller
{
    public function index()
    {
        return testimonials::where('is_approved', true)->get();
    }

    // Kirim testimoni baru (publik)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'review' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
            'image' => 'nullable|string',
        ]);
        $testimonial = testimonials::create($validated + ['is_approved' => false]);
        return response()->json($testimonial, 201);
    }

    // Daftar semua testimoni (admin)
    public function all()
    {
        return testimonials::all();
    }

    // Approve (setujui) testimoni (admin)
    public function update(Request $request, testimonials $testimonial)
    {
        $validated = $request->validate([
            'is_approved' => 'required|boolean',
        ]);
        $testimonial->update($validated);
        return response()->json($testimonial);
    }

    // Hapus testimoni (admin)
    public function destroy(testimonials $testimonial)
    {
        $testimonial->delete();
        return response()->noContent();
    }
}
