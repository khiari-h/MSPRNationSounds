<?php

namespace Tests\Unit;

use Tests\TestCase;
use Mockery;
use App\Services\WordpressService;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class WordpressServiceTest extends TestCase
{
    protected $wordpressService;

    public function setUp(): void
    {
        parent::setUp();

          // Vider le cache avant chaque test pour éviter les interférences
        Cache::flush();

        // Créer une instance du service à tester
        $this->wordpressService = new WordpressService();
    }

    /** @test */
    public function it_can_get_points_of_interest()
    {
        $mockedResponse = ['point1', 'point2'];

        Http::fake([
            'https://nationsounds.online/wp-json/wp/v2/pointsinterets*' => Http::response($mockedResponse, 200),
        ]);

        $result = $this->wordpressService->getPointsOfInterest();

        $this->assertEquals($mockedResponse, $result);
        $this->assertTrue(Cache::has('wordpress_points_of_interest_20'));
    }

    /** @test */
    public function it_throws_exception_if_getting_points_of_interest_fails()
    {
        Http::fake([
            'https://nationsounds.online/wp-json/wp/v2/pointsinterets*' => Http::response(null, 500),
        ]);

        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Erreur lors de la récupération des données depuis l\'API WordPress');

        $this->wordpressService->getPointsOfInterest();
    }

    /** @test */
    public function it_can_get_artists_meetings()
    {
        $mockedResponse = ['meeting1', 'meeting2'];

        Http::fake([
            'https://nationsounds.online/wp-json/wp/v2/artists_meetings*' => Http::response($mockedResponse, 200),
        ]);

        $result = $this->wordpressService->getArtistsMeetings();

        $this->assertEquals($mockedResponse, $result);
        $this->assertTrue(Cache::has('wordpress_artists_meetings'));
    }

    /** @test */
    public function it_can_get_concerts()
    {
        $mockedResponse = ['concert1', 'concert2'];

        Http::fake([
            'https://nationsounds.online/wp-json/wp/v2/concerts*' => Http::response($mockedResponse, 200),
        ]);

        $result = $this->wordpressService->getConcerts();

        $this->assertEquals($mockedResponse, $result);
        $this->assertTrue(Cache::has('wordpress_concerts'));
    }

    /** @test */
/** @test */
public function it_can_get_partners_with_media()
{
    // Simule la réponse pour les partenaires
    $mockedPartners = [
        ['acf' => ['logo' => 123]],
        ['acf' => ['logo' => 456]],
    ];

    // Fake la requête HTTP pour les partenaires
    Http::fake([
        'https://nationsounds.online/wp-json/wp/v2/partners*' => Http::response($mockedPartners, 200),
    ]);

    // Exécute la méthode à tester
    $result = $this->wordpressService->getPartnersWithMedia();

    // Vérifie que les données des partenaires sont conformes
    $this->assertIsArray($result);
    $this->assertEquals(123, $result[0]['acf']['logo']);
    $this->assertEquals(456, $result[1]['acf']['logo']);
}


    
    

    /** @test */
    public function it_can_get_media_by_id()
    {
        $mediaId = 123;
        $mockedMedia = ['id' => $mediaId, 'source_url' => 'https://example.com/media.jpg'];

        Http::fake([
            "https://nationsounds.online/wp-json/wp/v2/media/{$mediaId}" => Http::response($mockedMedia, 200),
        ]);

        $result = $this->wordpressService->getMedia($mediaId);

        $this->assertEquals($mockedMedia, $result);
        $this->assertTrue(Cache::has("wordpress_media_{$mediaId}"));
    }

    /** @test */
    public function it_can_get_programming_homepage_data()
    {
        $mockedConcerts = [['acf' => ['nom' => 'Concert 1']]];
        $mockedMeetings = [['acf' => ['nom' => 'Meeting 1']], ['acf' => ['nom' => 'Meeting 2']]];

        Http::fake([
            'https://nationsounds.online/wp-json/wp/v2/concerts*' => Http::response($mockedConcerts, 200),
            'https://nationsounds.online/wp-json/wp/v2/artists_meetings*' => Http::response($mockedMeetings, 200),
        ]);

        $result = $this->wordpressService->getProgrammingHomepageData();

        $this->assertArrayHasKey('concert', $result);
        $this->assertArrayHasKey('artists_meetings', $result);
        $this->assertEquals('Concert 1', $result['concert']['acf']['nom']);
    }

    /** @test */
    public function it_can_get_concerts_homepage()
    {
        $mockedConcerts = [['acf' => ['nom' => 'Concert 1']], ['acf' => ['nom' => 'Concert 2']], ['acf' => ['nom' => 'Concert 3']], ['acf' => ['nom' => 'Concert 4']]];

        Http::fake([
            'https://nationsounds.online/wp-json/wp/v2/concerts*' => Http::response($mockedConcerts, 200),
        ]);

        $result = $this->wordpressService->getConcertsHomepage();

        $this->assertCount(3, $result);
        $this->assertEquals('Concert 1', $result[0]['acf']['nom']);
        $this->assertEquals('Concert 3', $result[2]['acf']['nom']);
    }
}
