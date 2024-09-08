<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReviewResource extends JsonResource
{


    function extractLastNumberFromUrl($url) {
        // Define the regex pattern to match the last number in the URL
        $pattern = '/(\d+)$/';

        // Apply regex to extract the number
        if (preg_match($pattern, $url, $matches)) {
            return (int) $matches[1];  // Return the captured number
        }

        return null;  // Return null if no match is found
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'restaurant_name' => $this->restaurant_name,
            'restaurant_address' => $this->restaurant_address,
            'restaurant_location' => $this->restaurant_location,
            'reviewer_tiktok_handler' => $this->reviewer_tiktok_handler,
            'tiktok_video_url' => $this->tiktok_video_url,
            'videoID' => $this->extractLastNumberFromUrl($this->tiktok_video_url),
            'tiktok_video_embed' => $this->tiktok_video_embed,
            'distance' => $this->distance,
            'categories' => $this->categories
        ];

    }
}
