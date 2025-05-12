<?php

use App\Http\Controllers\Admin\ExpertController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Auth\AuthController;
use Illuminate\Support\Facades\Route;

// Auth routes
Route::post('auth/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('auth/logout', [AuthController::class, 'logout']);
    Route::get('auth/me', [AuthController::class, 'me']);
});

// Public routes
Route::get('projects', [ProjectController::class, 'index']);
Route::get('projects/{project}', [ProjectController::class, 'show']);
Route::get('experts', [ExpertController::class, 'index']);
Route::get('experts/{expert}', [ExpertController::class, 'show']);

// Admin routes (protected)
Route::middleware(['auth:sanctum', \App\Http\Middleware\AdminMiddleware::class])->prefix('admin')->group(function () {
    // Projects management
    Route::post('projects', [ProjectController::class, 'store']);
    Route::put('projects/{project}', [ProjectController::class, 'update']);
    Route::delete('projects/{project}', [ProjectController::class, 'destroy']);

    // Experts management
    Route::post('experts', [ExpertController::class, 'store']);
    Route::put('experts/{expert}', [ExpertController::class, 'update']);
    Route::delete('experts/{expert}', [ExpertController::class, 'destroy']);
}); 