<?php

namespace App\Http\Controllers;

use App\Models\testimonials;
use Illuminate\Http\Request;
use Inertia\Inertia;
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
        try {
            $validated = $request->validate([
                'name' => 'required|string',
                'review' => 'required|string',
                'rating' => 'required|integer|min:1|max:5',
                'image' => 'nullable|string',
            ]);
            $testimonial = testimonials::create($validated + ['is_approved' => false]);

            // For API requests
            if ($request->expectsJson()) {
                return response()->json($testimonial, 201);
            }

            // For web requests with redirect and flash message
            return redirect()->back()
                ->with('success', 'Testimonial has been submitted successfully and is awaiting approval.');
        } catch (\Exception $e) {
            // For API requests
            if ($request->expectsJson()) {
                return response()->json(['error' => $e->getMessage()], 500);
            }

            // For web requests with redirect and flash message
            return redirect()->back()
                ->with('error', 'Failed to submit testimonial: ' . $e->getMessage());
        }
    }

    // Daftar semua testimoni (admin)
    public function all()
    {
        return testimonials::all();
    }

    // Approve (setujui) testimoni (admin)
    public function update(Request $request, testimonials $testimonial)
    {
        try {
            $validated = $request->validate([
                'is_approved' => 'required|boolean',
            ]);
            $testimonial->update($validated);

            $status = $validated['is_approved'] ? 'approved' : 'unapproved';

            // For API requests
            if ($request->expectsJson()) {
                return response()->json($testimonial);
            }

            // For web requests with redirect and flash message
            return redirect()->back()
                ->with('success', "Testimonial has been {$status} successfully.");
        } catch (\Exception $e) {
            // For API requests
            if ($request->expectsJson()) {
                return response()->json(['error' => $e->getMessage()], 500);
            }

            // For web requests with redirect and flash message
            return redirect()->back()
                ->with('error', 'Failed to update testimonial: ' . $e->getMessage());
        }
    }

    // Hapus testimoni (admin)
    public function destroy(testimonials $testimonial)
    {
        try {
            $testimonial->delete();

            // For web requests with redirect and flash message
            return redirect()->back()
                ->with('success', 'Testimonial has been deleted successfully.');
        } catch (\Exception $e) {
            // For web requests with redirect and flash message
            return redirect()->back()
                ->with('error', 'Failed to delete testimonial: ' . $e->getMessage());
        }
    }
}
