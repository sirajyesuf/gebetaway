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

    $selected_reviewers  = $request->input('reviewers');
    $location = $request->input('location') ?  array_map('floatval', explode(',',$request->input('location')))  : null;   
    $address = $request->input('address');
    $categories = $request->input('categories');

    // dump($location);
    // dump($address);

    $reviews = Review::query()
    ->when($address and $location === null, function ($query, $address) {
        return $query->whereRaw('LOWER(restaurant_address) like ?', ['%' . strtolower($address) . '%']);
    })
    ->when($categories, function ($query, $categories) {
        return $query->whereRaw('LOWER(categories) like ?', ['%' . strtolower($categories) . '%']);
    })
    ->when($selected_reviewers, function ($query, $selected_reviewers) {
        return $query->whereIn('reviewer_tiktok_handler', explode(',', $selected_reviewers) );
    })
    ->get();


    if($location !== null){

        $userLatitude = $location[0];
        $userLongitude = $location[1];

        // calculate distance and append it
        $reviews = $reviews->map(function ($review) use ($userLatitude, $userLongitude) {
        $lat = (float) $review->restaurant_location[0];
        $lon =  (float)$review->restaurant_location[1];
        $distance = $this->calculateDistance($userLatitude, $userLongitude, $lat, $lon);
        $review->distance = round($distance,2);


        return $review;


        });
    }



    // sort the reviews by distance
    $sortedReviews = $reviews->sortBy('distance');

    // // paginate the sorted results
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
        // Earth radius in kilometers
        $earthRadius = 6371;
    
        $dLat = deg2rad($lat2 - $lat1);
        $dLon = deg2rad($lon2 - $lon1);
    
        $a = sin($dLat / 2) * sin($dLat / 2) +
             cos(deg2rad($lat1)) * cos(deg2rad($lat2)) *
             sin($dLon / 2) * sin($dLon / 2);
    
        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));
    
        return $earthRadius * $c; // Distance in kilometers
    }




}
