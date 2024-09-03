<?php

use App\Models\Reviewer;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {

    $reviewers = Reviewer::get()->toArray();

    return Inertia::render('Home', [
        'reviewers' => $reviewers,
    ]);
});
