<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Mockery;

class WordpressControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $wordpressServiceMock;

    protected function setUp(): void
    {
        parent::setUp();

        // Création du mock pour le service WordpressService
        $this->wordpressServiceMock = Mockery::mock(\App\Services\WordpressService::class);
        $this->app->instance(\App\Services\WordpressService::class, $this->wordpressServiceMock);
    }

    /** @test */
    public function it_can_get_points_of_interest()
    {

        cache()->flush();
        
        $this->wordpressServiceMock
            ->shouldReceive('getPointsOfInterest')
            ->once()
            ->andReturn(['poi1', 'poi2']);

        $response = $this->getJson('/api/wordpress/points-interets');

        $response->assertStatus(200)
                 ->assertJson(['poi1', 'poi2']);
    }

    /** @test */
    public function it_returns_an_error_if_getting_points_of_interest_fails()
    {
        cache()->flush(); // Invalide le cache avant de commencer le test
    
        $this->wordpressServiceMock
            ->shouldReceive('getPointsOfInterest')
            ->once()
            ->andThrow(new \Exception('Something went wrong'));
    
        $response = $this->getJson('/api/wordpress/points-interets');
    
        $response->assertStatus(500)
                 ->assertJson(['error' => 'Impossible de récupérer les points d\'intérêt']);
    }

    /** @test */
    public function it_can_get_artists_meetings()
    {
        $this->wordpressServiceMock
            ->shouldReceive('getArtistsMeetings')
            ->once()
            ->andReturn(['meeting1', 'meeting2']);

        $response = $this->getJson('/api/wordpress/artists_meetings');

        $response->assertStatus(200)
                 ->assertJson(['meeting1', 'meeting2']);
    }

    /** @test */
    public function it_returns_an_error_if_getting_artists_meetings_fails()
    {
        cache()->flush();

        $this->wordpressServiceMock
            ->shouldReceive('getArtistsMeetings')
            ->once()
            ->andThrow(new \Exception('Something went wrong'));

        $response = $this->getJson('/api/wordpress/artists_meetings');

        $response->assertStatus(500)
                 ->assertJson(['error' => 'Impossible de récupérer les rencontres avec les artistes']);
    }

    /** @test */
    public function it_can_get_concerts()
    {
        $this->wordpressServiceMock
            ->shouldReceive('getConcerts')
            ->once()
            ->andReturn(['concert1', 'concert2']);

        $response = $this->getJson('/api/wordpress/concerts');

        $response->assertStatus(200)
                 ->assertJson(['concert1', 'concert2']);
    }

    /** @test */
    public function it_returns_an_error_if_getting_concerts_fails()
    {
        cache()->flush();

        $this->wordpressServiceMock
            ->shouldReceive('getConcerts')
            ->once()
            ->andThrow(new \Exception('Something went wrong'));

        $response = $this->getJson('/api/wordpress/concerts');

        $response->assertStatus(500)
                 ->assertJson(['error' => 'Impossible de récupérer les concerts']);
    }

    /** @test */
    public function it_can_get_partners()
    {
        $this->wordpressServiceMock
            ->shouldReceive('getPartnersWithMedia')
            ->once()
            ->andReturn(['partner1', 'partner2']);

        $response = $this->getJson('/api/wordpress/partners');

        $response->assertStatus(200)
                 ->assertJson(['partner1', 'partner2']);
    }

    /** @test */
    public function it_returns_an_error_if_getting_partners_fails()
    {
        cache()->flush();

        $this->wordpressServiceMock
            ->shouldReceive('getPartnersWithMedia')
            ->once()
            ->andThrow(new \Exception('Something went wrong'));

        $response = $this->getJson('/api/wordpress/partners');

        $response->assertStatus(500)
                 ->assertJson(['error' => 'Impossible de récupérer les partenaires']);
    }

    /** @test */
    public function it_can_get_media_by_id()
    {
        $mediaId = 123;

        $this->wordpressServiceMock
            ->shouldReceive('getMedia')
            ->with($mediaId)
            ->once()
            ->andReturn(['media' => 'mediaData']);

        $response = $this->getJson("/api/wordpress/media/{$mediaId}");

        $response->assertStatus(200)
                 ->assertJson(['media' => 'mediaData']);
    }

    /** @test */
    public function it_returns_an_error_if_getting_media_fails()
    {
        cache()->flush();

        $mediaId = 123;

        $this->wordpressServiceMock
            ->shouldReceive('getMedia')
            ->with($mediaId)
            ->once()
            ->andThrow(new \Exception('Something went wrong'));

        $response = $this->getJson("/api/wordpress/media/{$mediaId}");

        $response->assertStatus(500)
                 ->assertJson(['error' => 'Impossible de récupérer le média']);
    }

    /** @test */
    public function it_can_get_programming_homepage()
    {
        $data = [
            'concert' => 'concertData',
            'artists_meetings' => ['meeting1', 'meeting2']
        ];

        $this->wordpressServiceMock
            ->shouldReceive('getProgrammingHomepageData')
            ->once()
            ->andReturn($data);

        $response = $this->getJson('/api/wordpress/programming-homepage');

        $response->assertStatus(200)
                 ->assertJson($data);
    }

    /** @test */
    public function it_returns_an_error_if_getting_programming_homepage_fails()
    {
        cache()->flush();

        $this->wordpressServiceMock
            ->shouldReceive('getProgrammingHomepageData')
            ->once()
            ->andThrow(new \Exception('Something went wrong'));

        $response = $this->getJson('/api/wordpress/programming-homepage');

        $response->assertStatus(500)
                 ->assertJson(['error' => 'Impossible de récupérer les données de la page d\'accueil']);
    }

    /** @test */
    public function it_can_get_concerts_homepage()
    {
        $this->wordpressServiceMock
            ->shouldReceive('getConcertsHomepage')
            ->once()
            ->andReturn(['concert1', 'concert2']);

        $response = $this->getJson('/api/wordpress/concerts-homepage');

        $response->assertStatus(200)
                 ->assertJson(['concert1', 'concert2']);
    }

    /** @test */
    public function it_returns_an_error_if_getting_concerts_homepage_fails()
    {
        cache()->flush();
        
        $this->wordpressServiceMock
            ->shouldReceive('getConcertsHomepage')
            ->once()
            ->andThrow(new \Exception('Something went wrong'));

        $response = $this->getJson('/api/wordpress/concerts-homepage');

        $response->assertStatus(500)
                 ->assertJson(['error' => 'Impossible de récupérer les concerts pour la page d\'accueil']);
    }

    /** @test */
    public function it_can_get_concert_names()
    {
        $this->wordpressServiceMock
            ->shouldReceive('getConcerts')
            ->once()
            ->andReturn([
                ['id' => 1, 'acf' => ['nom' => 'Concert 1']],
                ['id' => 2, 'acf' => ['nom' => 'Concert 2']],
            ]);

        $response = $this->getJson('/api/wordpress/concert-names');

        $response->assertStatus(200)
                 ->assertJson([
                    ['id' => 1, 'name' => 'Concert 1'],
                    ['id' => 2, 'name' => 'Concert 2'],
                 ]);
    }

    /** @test */
    public function it_returns_an_error_if_getting_concert_names_fails()
    {
        cache()->flush();

        $this->wordpressServiceMock
            ->shouldReceive('getConcerts')
            ->once()
            ->andThrow(new \Exception('Something went wrong'));

        $response = $this->getJson('/api/wordpress/concert-names');

        $response->assertStatus(500)
                 ->assertJson(['error' => 'Impossible de récupérer les noms des concerts']);
    }

    /** @test */
    public function it_can_get_artist_meeting_names()
    {
        $this->wordpressServiceMock
            ->shouldReceive('getArtistsMeetings')
            ->once()
            ->andReturn([
                ['id' => 1, 'acf' => ['nom' => 'Meeting 1']],
                ['id' => 2, 'acf' => ['nom' => 'Meeting 2']],
            ]);

        $response = $this->getJson('/api/wordpress/artist-meeting-names');

        $response->assertStatus(200)
                 ->assertJson([
                    ['id' => 1, 'name' => 'Meeting 1'],
                    ['id' => 2, 'name' => 'Meeting 2'],
                 ]);
    }

    /** @test */
    public function it_returns_an_error_if_getting_artist_meeting_names_fails()
    {
        cache()->flush();
        
        $this->wordpressServiceMock
            ->shouldReceive('getArtistsMeetings')
            ->once()
            ->andThrow(new \Exception('Something went wrong'));

        $response = $this->getJson('/api/wordpress/artist-meeting-names');

        $response->assertStatus(500)
                 ->assertJson(['error' => 'Impossible de récupérer les noms des rencontres avec les artistes']);
    }
}
