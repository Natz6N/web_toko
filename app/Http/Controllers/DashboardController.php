<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Categories;
use Illuminate\Support\Str;
use App\Models\testimonials;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class DashboardController extends Controller
{
    /**
     * Display the dashboard homepage.
     */
    public function index()
    {
        // Get counts for dashboard widgets
        $categoryCount = Categories::count();
        $productCount = Product::count();
        $testimonialCount = testimonials::count();
        $userCount = User::count();

        // Get latest data for quick overview
        $recentProducts = Product::latest()->take(5)->get();
        $recentTestimonials = testimonials::latest()->take(5)->get();

        // Get some statistics for the dashboard
        // There's no status column in categories table, so we're showing total instead
        $activeCategories = $categoryCount; // Changed from querying non-existent column
        $pendingTestimonials = testimonials::where('is_approved', false)->count();

        return Inertia::render('Dashboard/index', [
            'stats' => [
                'categoryCount' => $categoryCount,
                'productCount' => $productCount,
                'testimonialCount' => $testimonialCount,
                'userCount' => $userCount,
                'activeCategories' => $activeCategories,
                'pendingTestimonials' => $pendingTestimonials
            ],
            'recentProducts' => $recentProducts,
            'recentTestimonials' => $recentTestimonials
        ]);
    }
    public function CategoryIndex()
    {
        return Inertia::render('Dashboard/Category/index', [
            'categories' => \App\Models\Categories::all(),
        ]);
    }
    public function ProductIndex()
    {
        return Inertia::render('Dashboard/products/index', [
            'products' => \App\Models\Product::all(),
        ]);
    }

}
