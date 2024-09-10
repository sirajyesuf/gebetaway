<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ReviewController;
use Inertia\Inertia;
use App\Http\Resources\ReviewResource;
use App\Models\Review;
use Illuminate\Http\Request;

Route::get('/',[ReviewController::class,'index']);

Route::get('/reviews',function(Request $request){

    $restaurant_name = $request->restaurant;
    $reviewers  = $request->input('reviewers');

    $reviews = Review::query()
    ->when($restaurant_name, function ($query, $restaurant_name) {
        return $query->where('restaurant_name', 'like', '%' . $restaurant_name . '%');
    })
    ->when($reviewers!=null, function ($query, $reviewers) {
        return $query->whereIn('reviewer_id', explode(',',$reviewers));
    })
    ->paginate(5);

    return ReviewResource::collection($reviews);

})->name('reviews');

Route::get('/about',function(){
    return Inertia::render('About');
});

Route::get('/privacy',function(){
    return Inertia::render('PrivacyPolicy');
});