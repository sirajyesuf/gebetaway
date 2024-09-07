<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Reviewer;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Review>
 */
class ReviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            // 'restaurant_name' => $this->faker->company(),
            // 'restaurant_address' => $this->faker->address(),
            // 'restaurant_location' => $this->faker->address(),
            // 'reviewer_tiktok_handler' => Reviewer::all()->random()->tiktok_handler,
            // 'tiktok_video_url' => "https://www.tiktok.com/@ela__review/video/7409959436124441862?q=ela%20review&t=1725361398128",
            // 'categories' => $this->faker->randomElements(['food', 'service', 'ambiance', 'value', 'other'], $this->faker->numberBetween(1, 5)),


            'restaurant_name' => $this->faker->company, // Restaurant name
            'restaurant_address' => $this->faker->address, // Restaurant address
            'restaurant_location' => $this->faker->city . ', ' . $this->faker->country, // Restaurant location (nullable)
            'reviewer_name' => $this->faker->name, // Reviewer's name
            'reviewer_tiktok_handler' => '@' . $this->faker->userName, // Reviewer's TikTok handler
            'tiktok_video_url' => "https://www.tiktok.com/@ela__review/video/7409959436124441862?q=ela%20review&t=1725361398128",
            'categories' => json_encode($this->faker->words(3)), // Categories in JSON format (nullable)
        ];
    }
}
