<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\TestimonialsController;
/*
 * Admin Routes
 */
Route::middleware(['auth', 'verified'])->group(function () {
    Route::group(['prefix' => 'dashboard'], function () {
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
        Route::get('/categories', [DashboardController::class, 'CategoryIndex'])->name('categories.index.dashboard');
        Route::get('/products', [DashboardController::class, 'ProductIndex'])->name('products.index.dashboard');

        // Categories routes (admin)
        Route::post('/categories', [CategoriesController::class, 'store'])->name('categories.store.dashboard');
        Route::post('/categories/create', [CategoriesController::class, 'create'])->name('categories.create.dashboard');
        Route::post('/categories/edit/{Categories}', [CategoriesController::class, 'edit'])->name('categories.edit.dashboard');
        Route::get('/categories/{Categories}', [CategoriesController::class, 'showDashboard'])->name('categories.show.dashboard');
        Route::put('/categories/{Categories}', [CategoriesController::class, 'update'])->name('categories.update.dashboard');
        Route::delete('/categories/{Categories}', [CategoriesController::class, 'destroy'])->name('categories.destroy.dashboard');

        // Products routes (admin)
        Route::get('/products/{id}', [ProductController::class, 'showDashboard'])->name('products.show.dashboard');
        Route::get('/products/create', [ProductController::class, 'create'])->name('products.create.dashboard');
        Route::post('/products', [ProductController::class, 'store'])->name('products.store.dashboard');
        Route::put('/products/{id}', [ProductController::class, 'update'])->name('products.update.dashboard');
        Route::delete('/products/{id}', [ProductController::class, 'destroy'])->name('products.destroy.dashboard');

        // Testimonials routes (admin)
        Route::get('/testimonials/all', [TestimonialsController::class, 'all'])->name('testimonials.all.dashboard');
        Route::put('/testimonials/{testimonial}', [TestimonialsController::class, 'update'])->name('testimonials.update.dashboard');
        Route::delete('/testimonials/{testimonial}', [TestimonialsController::class, 'destroy'])->name('testimonials.destroy.dashboard');
    });
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
