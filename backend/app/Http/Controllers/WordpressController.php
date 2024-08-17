<?php

namespace App\Http\Controllers;

use App\Services\WordpressService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class WordpressController extends Controller
{
    protected $wordpressService;

    public function __construct(WordpressService $wordpressService)
    {
        $this->wordpressService = $wordpressService;
    }

    public function getPointsOfInterest(): JsonResponse
    {
        try {
            $pointsOfInterest = $this->wordpressService->getPointsOfInterest();
            Log::info('Points d\'intérêt récupérés avec succès.');
            return response()->json($pointsOfInterest, 200);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la récupération des points d\'intérêt.', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Impossible de récupérer les points d\'intérêt'], 500);
        }
    }

    public function getArtistsMeetings(): JsonResponse
    {
        try {
            $artistsMeetings = $this->wordpressService->getArtistsMeetings();
            Log::info('Rencontres avec les artistes récupérées avec succès.');
            return response()->json($artistsMeetings, 200);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la récupération des rencontres avec les artistes.', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Impossible de récupérer les rencontres avec les artistes'], 500);
        }
    }

    public function getConcerts(): JsonResponse
    {
        try {
            $concerts = $this->wordpressService->getConcerts();
            Log::info('Concerts récupérés avec succès.');
            return response()->json($concerts, 200);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la récupération des concerts.', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Impossible de récupérer les concerts'], 500);
        }
    }

    public function getPartners(): JsonResponse
    {
        try {
            $partners = $this->wordpressService->getPartnersWithMedia();
            Log::info('Partenaires récupérés avec succès.');
            return response()->json($partners, 200);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la récupération des partenaires.', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Impossible de récupérer les partenaires'], 500);
        }
    }

    public function getMedia($mediaId): JsonResponse
    {
        try {
            $media = $this->wordpressService->getMedia($mediaId);
            Log::info('Média récupéré avec succès.', ['media_id' => $mediaId]);
            return response()->json($media, 200);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la récupération du média.', ['media_id' => $mediaId, 'error' => $e->getMessage()]);
            return response()->json(['error' => 'Impossible de récupérer le média'], 500);
        }
    }

    // Nouvelle méthode pour la page d'accueil de la programmation
    public function getProgrammingHomepage(): JsonResponse
    {
        try {
            $data = $this->wordpressService->getProgrammingHomepageData();
            Log::info('Données de la page d\'accueil récupérées avec succès.');
            return response()->json($data, 200);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la récupération des données pour la page d\'accueil.', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Impossible de récupérer les données de la page d\'accueil'], 500);
        }
    }

    // Nouvelle méthode pour la page d'accueil des concerts
    public function getConcertsHomepage(): JsonResponse
    {
        try {
            $concerts = $this->wordpressService->getConcertsHomepage();
            Log::info('Concerts pour la page d\'accueil récupérés avec succès.');
            return response()->json($concerts, 200);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la récupération des concerts pour la page d\'accueil.', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Impossible de récupérer les concerts pour la page d\'accueil'], 500);
        }
    }

    public function getConcertNames(): JsonResponse
{
    try {
        $concerts = $this->wordpressService->getConcerts();
        $concertNames = array_map(function ($concert) {
            return ['id' => $concert['id'], 'name' => $concert['acf']['nom']];
        }, $concerts);
        Log::info('Noms des concerts récupérés avec succès.');
        return response()->json($concertNames, 200);
    } catch (\Exception $e) {
        Log::error('Erreur lors de la récupération des noms des concerts.', ['error' => $e->getMessage()]);
        return response()->json(['error' => 'Impossible de récupérer les noms des concerts'], 500);
    }
}

public function getArtistMeetingNames(): JsonResponse
{
    try {
        $artistMeetings = $this->wordpressService->getArtistsMeetings();
        $artistMeetingNames = array_map(function ($meeting) {
            return ['id' => $meeting['id'], 'name' => $meeting['acf']['nom']];
        }, $artistMeetings);
        Log::info('Noms des rencontres avec les artistes récupérés avec succès.');
        return response()->json($artistMeetingNames, 200);
    } catch (\Exception $e) {
        Log::error('Erreur lors de la récupération des noms des rencontres avec les artistes.', ['error' => $e->getMessage()]);
        return response()->json(['error' => 'Impossible de récupérer les noms des rencontres avec les artistes'], 500);
    }
}




}
