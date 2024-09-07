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

    $allCategories = Review::distinct('categories')->pluck('categories')->toArray();
    $uniqueCategories = collect($allCategories)
    ->flatMap(function ($item) {
    return json_decode($item, true); // Decode JSON for each row
    })
    ->unique() // Get only unique values
    ->values() // Reset the array keys
    ->toArray();

    $restaurant_name = $request->restaurant;
    $selected_reviewers  = $request->input('reviewers');
    $location = $request->input('location');
    $categories = $request->input('categories');
    
    // dump($selected_reviewers);


    $reviews = Review::query()
    ->when($restaurant_name, function ($query, $restaurant_name) {
        return $query->whereRaw('LOWER(restaurant_name) like ?', ['%' . strtolower($restaurant_name) . '%']);
    })
    ->when($selected_reviewers, function ($query, $selected_reviewers) {
        return $query->whereIn('reviewer_tiktok_handler', explode(',', $selected_reviewers) );
    })
    ->when($location, function ($query, $location) {
        return $query->whereRaw('LOWER(restaurant_address) like ?', ['%' . strtolower($location) . '%']);
    })
    ->when($categories, function ($query, $categories) {
        return $query->whereRaw('LOWER(categories) like ?', ['%' . strtolower($categories) . '%']);
    })
    ->paginate(5);


    return Inertia::render('Home', [
        'reviewers' => Reviewer::get()->toArray(),
        'categories' => $uniqueCategories,
        'reviews' => ReviewResource::collection($reviews),
    ]);

    }










}
