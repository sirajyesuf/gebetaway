<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia; 
use App\Models\Reviewer;

Route::get('/', function () {

    $reviewers = Reviewer::get()->toArray();


    return Inertia::render('Home',[
        'reviewers' => $reviewers
    ]);
});
