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

class ReviewResource extends Resource
{
    protected static ?string $model = Review::class;

    protected static ?string $navigationIcon = 'heroicon-o-video-camera';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('restaurant_name')
                    ->required()
                    ->maxLength(255)
                    ->columnSpanFull(),
                Forms\Components\TextInput::make('restaurant_address')
                    ->required()
                    ->maxLength(65535),
                Forms\Components\TextInput::make('restaurant_location')
                    ->required()
                    ->numeric(),
                Forms\Components\TextInput::make('reviewer_tiktok_handler')
                ->label('Reviewer Handler')
                ->required(),
                Forms\Components\TextInput::make('tiktok_video_url')
                ->label('Video URL')
                ->required()

            
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('restaurant_name'),
                Tables\Columns\TextColumn::make('restaurant_address'),
                Tables\Columns\TextColumn::make('restaurant_location'),
                Tables\Columns\TextColumn::make('reviewer_tiktok_handler'),
                Tables\Columns\TextColumn::make('tiktok_video_url')

            ])
            ->filters([
                Tables\Filters\TrashedFilter::make(),
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
