<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ReviewResource\Pages;
use App\Filament\Resources\ReviewResource\RelationManagers;
use App\Models\Review;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Facades\Http;
use Filament\Forms\Set;
use Filament\Forms\Components\Section;
use Illuminate\Support\Str;
use Closure;
use Filament\Forms\Get;

class ReviewResource extends Resource
{
    protected static ?string $model = Review::class;

    protected static ?string $navigationIcon = 'heroicon-o-video-camera';


    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make()
                            ->schema([
                        Forms\Components\TextInput::make('tiktok_video_url')
                        ->label('Video URL')
                        ->url()
                        ->prefix('URL')
                        ->columnSpanFull()
                        ->required()
                        ->live(onBlur: true)
                        ->afterStateUpdated(fn(Set $set, ?string $state) => ReviewResource::fetchDataFromApi($set,$state)),

                        Forms\Components\TextInput::make('thumbnail_url')
                        ->label('Thumbnail URL')
                        ->prefix('URL')
                        ->columnSpanFull(),
                        Forms\Components\TextInput::make('restaurant_name')
                        ->label('Restaurant Name')
                        ->required()
                        ->maxLength(255)
                        ->columnSpanFull(),
                        Forms\Components\TextInput::make('restaurant_address')
                        ->label('Restaurant Address')
                        ->required()
                        ->columnSpanFull(),
                        ])->columns(2),

                        Forms\Components\Section::make('Restaurant Location')
                            ->schema([
                            Forms\Components\TextInput::make('restaurant_location')
                            ->label('Latitude, Longitude')
                            ->placeholder('Enter lat, lon (e.g., 12.34, 56.78)')
                            ->required()
                            ->live()
                            ->rules([
                                fn (Get $get): Closure => function (string $attribute, $value, Closure $fail) use ($get) {
                                    $parts = explode(',', $value);
            
                                    if (count($parts) !== 2) {
                                        return $fail('The :attribute must contain both latitude and longitude.');
                                    }
                                    $lat = floatval(trim($parts[0]));
                                    $lon = floatval(trim($parts[1]));
                
                                    if ($lat < -90 || $lat > 90) {
                                        return $fail('Latitude must be between -90 and 90 degrees.');
                                    }
                
                                    if ($lon < -180 || $lon > 180) {
                                        return $fail('Longitude must be between -180 and 180 degrees.');
                                    }
                                },
                            ])
                            ->required()
                            ->columnSpanFull()

                            ])->columns(2),

                    ])
                    ->columnSpan(['lg' => 2]),

                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Author')
                        ->schema([
                        Forms\Components\TextInput::make('reviewer_tiktok_handler')
                        ->label('Reviewer Handler')
                        ->required(),
                        Forms\Components\Select::make('categories')
                        ->searchable()
                        ->multiple()
                        ->options([
                            'tailwind' => 'Tailwind CSS',
                            'alpine' => 'Alpine.js',
                            'laravel' => 'Laravel',
                            'livewire' => 'Laravel Livewire',
                        ])
                        ]),
                    ])
                    ->columnSpan(['lg' => 1]),
            ])
            ->columns(3);
    }

    public static function fetchDataFromApi($set,$state)
    {
        $url = "https://www.tiktok.com/oembed?url=".$state;
        $response = Http::get($url);
        if($response->ok()){
            $data = $response->json();
            $restaurantInfo = ReviewResource::extractRestaurantInfo($data['title']);
            $set('restaurant_name', $restaurantInfo['restaurant_name']);
            $set('restaurant_address',$restaurantInfo['restaurant_address']);
            $set('reviewer_name',$data['author_name'] );
            $set('reviewer_tiktok_handler',$data['author_unique_id']);
            $set('thumbnail_url', $data['thumbnail_url']);  
        }else{

            $set('restaurant_name', 'Api error'.$response->status());

        }

    }

    public static function  extractRestaurantInfo($text) {
        // Define patterns to match the restaurant name and address
        $namePattern = '/📌\s*(.*?)📍/';
        $addressPattern = '/📍\s*(.*?)\s*(?:\.|$)/';
    
        // Extract restaurant name
        if (preg_match($namePattern, $text, $nameMatches)) {
            $restaurantName = trim($nameMatches[1]);
        } else {
            $restaurantName = 'Name not found';
        }
    
        // Extract address
        if (preg_match($addressPattern, $text, $addressMatches)) {
            $location = trim($addressMatches[1]);
        } else {
            $location = 'address not found';
        }
    
        return [
            'restaurant_name' => $restaurantName,
            'restaurant_address' => $location
        ];
    }
    

    

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('restaurant_name')
                ->label('Restaurant Name'),
                Tables\Columns\TextColumn::make('restaurant_address'),
                Tables\Columns\TextColumn::make('restaurant_location'),
                Tables\Columns\TextColumn::make('reviewer_tiktok_handler'),
                Tables\Columns\TextColumn::make('tiktok_video_url')
                ->badge()
                ->url(fn (Review $record): string => ReviewResource::googleMap($record->restaurant_location))
                ->openUrlInNewTab(),
                Tables\Columns\TextColumn::make('thumbnail_url')
                ->label('Thumbnail URL')
                ->badge()
            ])
            ->filters([
                Tables\Filters\TrashedFilter::make(),
                Tables\Filters\SelectFilter::make('reviewer_tiktok_handler')
                    ->label('Reviewer')
                    ->options(Review::all()->pluck('reviewer_tiktok_handler', 'reviewer_tiktok_handler'))
                    ->searchable()
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    Tables\Actions\ForceDeleteBulkAction::make(),
                    Tables\Actions\RestoreBulkAction::make(),
                ]),
            ]);
    }

    public static function googleMap($restaurant_location){
        $location =  array_map('floatval',$restaurant_location);
        $lat = $location[0];
        $lon = $location[1];
        return  'https://www.google.com/maps?q='.$lat.','.$lon;
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListReviews::route('/'),
            'create' => Pages\CreateReview::route('/create'),
            'edit' => Pages\EditReview::route('/{record}/edit'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->withoutGlobalScopes([
                SoftDeletingScope::class,
            ]);
    }
}
