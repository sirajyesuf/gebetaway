<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Reviewer;
use App\Models\Review;
use App\Http\Resources\ReviewResource;

class ReviewController extends Controller
{
    public function index(Request $request) {
    
    $restaurant_name = $request->restaurant;

    $reviewers = Reviewer::get()->toArray();

    $reviews = Review::query()
    ->when($restaurant_name, function ($query, $restaurant_name) {
        return $query->where('restaurant_name', 'like', '%' . $restaurant_name . '%');
    })
    ->paginate(5);


    return Inertia::render('Home', [
        'reviewers' => $reviewers,
        'reviews' => ReviewResource::collection($reviews),
    ]);

    }










}
