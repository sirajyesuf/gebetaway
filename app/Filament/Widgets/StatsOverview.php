<?php

namespace App\Filament\Widgets;

use App\Models\Review;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Reviews', Review::count()),
            Stat::make('Categories', Review::count()),
            Stat::make('Reviewer', Review::distinct()->pluck('reviewer_tiktok_handler')->count()),
        ];
    }
}
