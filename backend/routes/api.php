<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\WordpressController;
use App\Http\Controllers\NewsletterController;

// Route pour l'inscription à la newsletter
Route::post('/newsletter', [NewsletterController::class, 'subscribe']);


// Routes pour les ressources News 
Route::resources([
    'news' => NewsController::class,

]);

// Routes pour les inscription aux concerts et recontres artistes

Route::post('/register', [RegistrationController::class, 'registerParticipant']);


// Routes pour les appels à l'API WordPress
Route::prefix('wordpress')->group(function () {
    Route::get('points-interets', [WordpressController::class, 'getPointsOfInterest']);
    Route::get('artists_meetings', [WordpressController::class, 'getArtistsMeetings']);
    Route::get('concerts', [WordpressController::class, 'getConcerts']);
    Route::get('partners', [WordpressController::class, 'getPartners']);
    Route::get('media/{mediaId}', [WordpressController::class, 'getMedia']);
    Route::get('programming-homepage', [WordpressController::class, 'getProgrammingHomepage']);
    Route::get('concerts-homepage', [WordpressController::class, 'getConcertsHomepage']);
    Route::get('concert-names', [WordpressController::class, 'getConcertNames']);
    Route::get('artist-meeting-names', [WordpressController::class, 'getArtistMeetingNames']);
});
