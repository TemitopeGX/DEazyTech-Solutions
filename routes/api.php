<?php

use App\Http\Controllers\Admin\ExpertController;
use App\Http\Controllers\Admin\ProjectController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::get('projects', [ProjectController::class, 'index']);
Route::get('projects/{project}', [ProjectController::class, 'show']);
Route::get('experts', [ExpertController::class, 'index']);
Route::get('experts/{expert}', [ExpertController::class, 'show']);

// Admin routes (protected)
Route::prefix('api/admin')->middleware(['auth:sanctum', \App\Http\Middleware\AdminMiddleware::class])->group(function () {
    // Projects management
    Route::post('projects', [ProjectController::class, 'store']);
    Route::post('projects/{project}', [ProjectController::class, 'update']);
    Route::delete('projects/{project}', [ProjectController::class, 'destroy']);

    // Experts management
    Route::post('experts', [ExpertController::class, 'store']);
    Route::post('experts/{expert}', [ExpertController::class, 'update']);
    Route::delete('experts/{expert}', [ExpertController::class, 'destroy']);
}); 