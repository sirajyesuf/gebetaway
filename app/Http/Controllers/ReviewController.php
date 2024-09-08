<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Reviewer;
use App\Models\Review;
use App\Http\Resources\ReviewResource;
use App\Models\Category;
use Illuminate\Pagination\LengthAwarePaginator;

class ReviewController extends Controller
{
    public function index(Request $request) {

    $restaurant_name = $request->restaurant;
    $selected_reviewers  = $request->input('reviewers');
    $location = $request->input('location');
    $categories = $request->input('categories');

    $userLatitude = 9.008295047747442;  // User's Latitude
    $userLongitude = 38.69530080556199; // User's Longitude
    $radius = 6371; // Earth's radius in kilometers

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
    ->get();

    // Calculate distance and append it
    $reviews = $reviews->map(function ($review) use ($userLatitude, $userLongitude) {
        $lat = (int) $review->restaurant_location[0];
        $lon = (int) $review->restaurant_location[1];
        $distance = $this->calculateDistance($userLatitude, $userLongitude, $lat, $lon);
        $review->distance = $distance;
        return $review;
    });

    // Sort the reviews by distance
    $sortedReviews = $reviews->sortBy('distance');

    // // Paginate the sorted results
    $currentPage = LengthAwarePaginator::resolveCurrentPage();
    $perPage = 10;
    $paginatedReviews = new LengthAwarePaginator(
        $sortedReviews->forPage($currentPage, $perPage),
        $sortedReviews->count(),
        $perPage,
        $currentPage,
        ['path' => LengthAwarePaginator::resolveCurrentPath()]
    );
    
    


    return Inertia::render('Home', [
        'reviewers' => Reviewer::get()->toArray(),
        'categories' => Category::get()->toArray(),
        'reviews' => ReviewResource::collection($paginatedReviews),
    ]);

    }






    private function calculateDistance($lat1, $lon1, $lat2, $lon2)
    {
        $earthRadius = 6371; // Earth radius in kilometers
    
        $dLat = deg2rad($lat2 - $lat1);
        $dLon = deg2rad($lon2 - $lon1);
    
        $a = sin($dLat / 2) * sin($dLat / 2) +
             cos(deg2rad($lat1)) * cos(deg2rad($lat2)) *
             sin($dLon / 2) * sin($dLon / 2);
    
        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));
    
        return $earthRadius * $c; // Distance in kilometers
    }




}
