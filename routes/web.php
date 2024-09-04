<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ReviewController;
use Inertia\Inertia;

Route::get('/',[ReviewController::class,'index']);

Route::get('/about',function(){
    return Inertia::render('About');
});