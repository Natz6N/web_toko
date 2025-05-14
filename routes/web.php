<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\TestimonialsController;

/*
 * Admin Routes
 */
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('Dashboard/index');
    })->name('dashboard');

    // Categories routes (admin)
    Route::get('/categories', [CategoriesController::class, 'index']);
    Route::post('/categories', [CategoriesController::class, 'store']);
    Route::get('/categories/{Categories}', [CategoriesController::class, 'show']);
    Route::put('/categories/{Categories}', [CategoriesController::class, 'update']);
    Route::delete('/categories/{Categories}', [CategoriesController::class, 'destroy']);

    // Products routes (admin)
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);

    // Testimonials routes (admin)
    Route::get('/testimonials/all', [TestimonialsController::class, 'all']);
    Route::put('/testimonials/{testimonial}', [TestimonialsController::class, 'update']);
    Route::delete('/testimonials/{testimonial}', [TestimonialsController::class, 'destroy']);
});

/*
 * Public Routes
 */
// Products public routes
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{slug}', [ProductController::class, 'show']);

// Testimonials public routes
Route::get('/testimonials', [TestimonialsController::class, 'index']);
Route::post('/testimonials', [TestimonialsController::class, 'store']);

Route::get('/', function () {
    return Inertia::render('web/index', [
        'banners' => \App\Models\banners::where('is_active', true)->get(),
        'categories' => \App\Models\Categories::all(),
        'products' => \App\Models\Product::all(),
        'testimonials' => \App\Models\testimonials::where('is_approved', true)->get(),
    ]);
})->name('home');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
