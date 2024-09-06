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
            'restaurant_name' => $this->faker->company(),
            'restaurant_address' => $this->faker->address(),
            'restaurant_location' => $this->faker->address(),
            'reviewer_tiktok_handler' => Reviewer::all()->random()->tiktok_handler,
            'tiktok_video_url' => "https://www.tiktok.com/@ela__review/video/7409959436124441862?q=ela%20review&t=1725361398128",
            'tiktok_video_embed' => '<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@ela__review/video/7385460086384102661" data-video-id="7385460086384102661" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@ela__review" href="https://www.tiktok.com/@ela__review?refer=embed">@ela__review</a> <p>📌 ሳሮን ሽሮ ወዛደር በአምባሳደር:170 ሁሉ አይቅርብኝ:270 የ ፆም ጥብስ:110 የ ፆም ቀይ ወጥ:110 📍አድራሻ: አፄ ናኦድ ትምህርት ቤት ጀርባ</p> <a target="_blank" title="♬ original sound - ኤላ Review" href="https://www.tiktok.com/music/original-sound-7385460125407955717?refer=embed">♬ original sound - ኤላ Review</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>'
        ];
    }
}
