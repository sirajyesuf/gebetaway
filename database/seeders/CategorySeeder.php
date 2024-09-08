<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    
    public function run(): void
    {
        $categories = [
            [
                'name' => 'pizza'
            ],
            [
                'name' => 'burger'
            ],
            [
                'name' => 'raw meat'
            ],
            [
                'name' => 'injera'
            ],
            [
                'name' => 'dessert'
            ],
            [
                'name' => 'pastry'
            ],
            [
                'name' => 'kitfo'
            ]
        ];

        DB::table('categories')->truncate();
        DB::table('categories')->insert($categories);

    }
}
