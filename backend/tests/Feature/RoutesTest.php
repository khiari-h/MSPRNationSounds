<?php

namespace Tests\Feature;

use Mockery;
use Tests\TestCase;
use App\Services\WordpressService; // Assurez-vous d'inclure cette ligne

class RoutesTest extends TestCase
{
    protected $wordpressServiceMock;

    protected function setUp(): void
    {
        parent::setUp();

        // Création du mock pour le service WordpressService
        $this->wordpressServiceMock = Mockery::mock(WordpressService::class);
        $this->app->instance(WordpressService::class, $this->wordpressServiceMock);
    }

    /** @test */
    public function wordpress_points_of_interest_route_exists()
    {
        // Mock de la méthode getPointsOfInterest
        $this->wordpressServiceMock
            ->shouldReceive('getPointsOfInterest')
            ->once()
            ->andReturn(['poi1', 'poi2']);

        $response = $this->get('/api/wordpress/points-interets');
        $response->assertStatus(200)
                 ->assertJson(['poi1', 'poi2']);
    }

    /** @test */
    public function wordpress_artists_meetings_route_exists()
    {
        // Mock de la méthode getArtistsMeetings
        $this->wordpressServiceMock
            ->shouldReceive('getArtistsMeetings')
            ->once()
            ->andReturn(['meeting1', 'meeting2']);

        $response = $this->get('/api/wordpress/artists_meetings');
        $response->assertStatus(200)
                 ->assertJson(['meeting1', 'meeting2']);
    }

    /** @test */
    public function wordpress_concerts_route_exists()
    {
        // Mock de la méthode getConcerts
        $this->wordpressServiceMock
            ->shouldReceive('getConcerts')
            ->once()
            ->andReturn(['concert1', 'concert2']);

        $response = $this->get('/api/wordpress/concerts');
        $response->assertStatus(200)
                 ->assertJson(['concert1', 'concert2']);
    }

    /** @test */
    public function wordpress_partners_route_exists()
    {
        // Mock de la méthode getPartnersWithMedia
        $this->wordpressServiceMock
            ->shouldReceive('getPartnersWithMedia')
            ->once()
            ->andReturn(['partner1', 'partner2']);

        $response = $this->get('/api/wordpress/partners');
        $response->assertStatus(200)
                 ->assertJson(['partner1', 'partner2']);
    }

    /** @test */
    public function wordpress_media_route_exists()
    {
        $mediaId = 1;

        // Mock de la méthode getMedia
        $this->wordpressServiceMock
            ->shouldReceive('getMedia')
            ->with($mediaId)
            ->once()
            ->andReturn(['source_url' => 'http://example.com/media.jpg']);

        $response = $this->get("/api/wordpress/media/{$mediaId}");
        $response->assertStatus(200)
                 ->assertJson(['source_url' => 'http://example.com/media.jpg']);
    }

    /** @test */
    public function wordpress_programming_homepage_route_exists()
    {
        // Mock de la méthode getProgrammingHomepageData
        $this->wordpressServiceMock
            ->shouldReceive('getProgrammingHomepageData')
            ->once()
            ->andReturn([
                'concert' => 'concertData',
                'artists_meetings' => ['meeting1', 'meeting2'],
            ]);

        $response = $this->get('/api/wordpress/programming-homepage');
        $response->assertStatus(200)
                 ->assertJson([
                     'concert' => 'concertData',
                     'artists_meetings' => ['meeting1', 'meeting2'],
                 ]);
    }

    /** @test */
    public function wordpress_concerts_homepage_route_exists()
    {
        // Mock de la méthode getConcertsHomepage
        $this->wordpressServiceMock
            ->shouldReceive('getConcertsHomepage')
            ->once()
            ->andReturn(['concert1', 'concert2', 'concert3']);

        $response = $this->get('/api/wordpress/concerts-homepage');
        $response->assertStatus(200)
                 ->assertJson(['concert1', 'concert2', 'concert3']);
    }

    /** @test */
    public function wordpress_concert_names_route_exists()
    {
        // Mock de la méthode getConcerts
        $this->wordpressServiceMock
            ->shouldReceive('getConcerts')
            ->once()
            ->andReturn([
                ['id' => 1, 'acf' => ['nom' => 'Concert 1']],
                ['id' => 2, 'acf' => ['nom' => 'Concert 2']],
            ]);

        $response = $this->get('/api/wordpress/concert-names');
        $response->assertStatus(200)
                 ->assertJson([
                     ['id' => 1, 'name' => 'Concert 1'],
                     ['id' => 2, 'name' => 'Concert 2'],
                 ]);
    }

    /** @test */
    public function wordpress_artist_meeting_names_route_exists()
    {
        // Mock de la méthode getArtistsMeetings
        $this->wordpressServiceMock
            ->shouldReceive('getArtistsMeetings')
            ->once()
            ->andReturn([
                ['id' => 1, 'acf' => ['nom' => 'Meeting 1']],
                ['id' => 2, 'acf' => ['nom' => 'Meeting 2']],
            ]);

        $response = $this->get('/api/wordpress/artist-meeting-names');
        $response->assertStatus(200)
                 ->assertJson([
                     ['id' => 1, 'name' => 'Meeting 1'],
                     ['id' => 2, 'name' => 'Meeting 2'],
                 ]);
    }
}
