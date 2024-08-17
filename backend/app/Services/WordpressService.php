<?php
namespace App\Services;

use Illuminate\Support\Facades\Http;

class WordpressService
{
    protected $baseUrl;

    public function __construct()
    {
        $this->baseUrl = 'https://nationsounds.online/wp-json/wp/v2/';
    }

    // Récupérer les points d'intérêt
    public function getPointsOfInterest($perPage = 20)
    {
        $cacheKey = 'wordpress_points_of_interest_' . $perPage;
        return cache()->remember($cacheKey, now()->addMinutes(1), function () use ($perPage) {
            return $this->makeRequest('pointsinterets', ['per_page' => $perPage]);
        });
    }

    // Récupérer les rencontres avec les artistes
    public function getArtistsMeetings()
    {
        $cacheKey = 'wordpress_artists_meetings';
        return cache()->remember($cacheKey, now()->addMinutes(1), function () {
            return $this->makeRequest('artists_meetings');
        });
    }

    // Récupérer les concerts
    public function getConcerts()
    {
        $cacheKey = 'wordpress_concerts';
        return cache()->remember($cacheKey, now()->addMinutes(1), function () {
            return $this->makeRequest('concerts');
        });
    }

    // Récupérer les partenaires avec leurs médias
    public function getPartnersWithMedia()
    {
        $cacheKey = 'wordpress_partners_with_media';
        return cache()->remember($cacheKey, now()->addMinutes(1), function () {
            $partners = $this->makeRequest('partners');
            $mediaIds = array_filter(array_column($partners, 'acf.logo'));

            $mediaResponses = [];
            if (!empty($mediaIds)) {
                foreach ($mediaIds as $mediaId) {
                    $mediaResponse = $this->getMedia($mediaId);
                    if (isset($mediaResponse['source_url'])) {
                        $mediaResponses[$mediaId] = $mediaResponse;
                    }
                }
            }

            foreach ($partners as &$partner) {
                $partner['acf']['logoUrl'] = $mediaResponses[$partner['acf']['logo']]['source_url'] ?? '';
            }
            return $partners;
        });
    }

    // Récupérer un média spécifique
    public function getMedia($mediaId)
    {
        $cacheKey = "wordpress_media_{$mediaId}";
        return cache()->remember($cacheKey, now()->addMinutes(1), function () use ($mediaId) {
            return $this->makeRequest("media/{$mediaId}");
        });
    }

    // Récupérer les données pour la page d'accueil de la programmation
    public function getProgrammingHomepageData()
    {
        $concerts = $this->getConcerts();
        $artistsMeetings = $this->getArtistsMeetings();

        $selectedConcert = !empty($concerts) ? $concerts[0] : null;
        $selectedArtistsMeetings = array_slice($artistsMeetings, 0, 2);

        return [
            'concert' => $selectedConcert,
            'artists_meetings' => $selectedArtistsMeetings
        ];
    }

    // Récupérer les concerts pour la page d'accueil des concerts
    public function getConcertsHomepage($limit = 3)
    {
        $concerts = $this->getConcerts();
        return array_slice($concerts, 0, $limit);
    }

    // Fonction pour effectuer la requête à l'API WordPress
    protected function makeRequest($endpoint, $queryParams = [])
    {
        $response = Http::timeout(10)->get($this->baseUrl . $endpoint, $queryParams);

        if ($response->successful()) {
            return $response->json();
        }

        throw new \Exception('Erreur lors de la récupération des données depuis l\'API WordPress');
    }
}
