<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            //restaurant
            $table->string('restaurant_name');
            $table->string('restaurant_address');
            $table->json('restaurant_location');

            //reviewer and video
            $table->string('reviewer_name');
            $table->string('reviewer_tiktok_handler');
            $table->text('tiktok_video_url');
            $table->json('categories');
            $table->timestamps();
            $table->softDeletes();
        });

        // https://www.tiktok.com/oembed?url=https://www.tiktok.com/@scout2015/video/6718335390845095173
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
