<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
 * Public Routes
 */
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);
});


/*
 * Public Routes
 */
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{slug}', [ProductController::class, 'show']);

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
