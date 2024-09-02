<?php

namespace Database\Seeders;

use App\Models\Reviewer;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Reviewer::factory(10)->create();

    }
}
