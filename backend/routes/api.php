<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\WishlistController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\CouponController;
use Illuminate\Support\Facades\Route;

// ─── Public Routes ─────
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::apiResource('/products', ProductController::class)->only(['index', 'show']);
Route::apiResource('/categories', CategoryController::class)->only(['index', 'show']);

Route::post('/coupons/validate', [CouponController::class, 'validate']);

// ─── Protected Routes (Requires Authentication) ─────
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::put('/profile', [AuthController::class, 'updateProfile']);

    Route::apiResource('/orders', OrderController::class)->only(['index', 'show', 'store']);
    Route::apiResource('/wishlist', WishlistController::class)->only(['index', 'store']);
    Route::delete('/wishlist/{productId}', [WishlistController::class, 'destroy']);
    
    Route::post('/reviews', [ReviewController::class, 'store']);

    // ─── Admin Routes ─────
    Route::middleware('admin')->prefix('admin')->group(function () {
        Route::get('/dashboard', [AdminController::class, 'dashboard']);
        
        Route::post('/products', [AdminController::class, 'storeProduct']);
        Route::put('/products/{id}', [AdminController::class, 'updateProduct']);
        Route::delete('/products/{id}', [AdminController::class, 'destroyProduct']);
        
        Route::post('/categories', [AdminController::class, 'storeCategory']);
        Route::put('/categories/{id}', [AdminController::class, 'updateCategory']);
        Route::delete('/categories/{id}', [AdminController::class, 'destroyCategory']);
        
        Route::get('/orders', [AdminController::class, 'allOrders']);
        Route::patch('/orders/{id}/status', [AdminController::class, 'updateOrderStatus']);
        
        Route::get('/users', [AdminController::class, 'allUsers']);
        
        Route::get('/coupons', [AdminController::class, 'allCoupons']);
        Route::post('/coupons', [AdminController::class, 'storeCoupon']);
        Route::delete('/coupons/{id}', [AdminController::class, 'destroyCoupon']);
    });
});
