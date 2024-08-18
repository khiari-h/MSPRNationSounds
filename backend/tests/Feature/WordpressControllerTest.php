<?php

namespace Tests\Feature;

use Tests\TestCase;
use Mockery;
use App\Services\WordpressService;
use Illuminate\Foundation\Testing\RefreshDatabase;

class WordpressControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $wordpressServiceMock;

    public function setUp(): void
    {
        parent::setUp();

        // Mock du service WordpressService
        $this->wordpressServiceMock = Mockery::mock(WordpressService::class);
        $this->app->instance(WordpressService::class, $this->wordpressServiceMock);
    }

    /** @test */
    public function it_can_get_points_of_interest()
    {
        $this->wordpressServiceMock
            ->shouldReceive('getPointsOfInterest')
            ->once()
            ->andReturn(['poi1', 'poi2']);

        $response = $this->getJson('/api/wordpress/points-of-interest');

        $response->assertStatus(200)
                 ->assertJson(['poi1', 'poi2']);
    }

    /** @test */
    public function it_returns_error_if_getting_points_of_interest_fails()
    {
        $this->wordpressServiceMock
            ->shouldReceive('getPointsOfInterest')
            ->once()
            ->andThrow(new \Exception('Something went wrong'));

        $response = $this->getJson('/api/wordpress/points-of-interest');

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

        $response = $this->getJson('/api/wordpress/artists-meetings');

        $response->assertStatus(200)
                 ->assertJson(['meeting1', 'meeting2']);
    }

    /** @test */
    public function it_returns_error_if_getting_artists_meetings_fails()
    {
        $this->wordpressServiceMock
            ->shouldReceive('getArtistsMeetings')
            ->once()
            ->andThrow(new \Exception('Something went wrong'));

        $response = $this->getJson('/api/wordpress/artists-meetings');

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
    public function it_returns_error_if_getting_concerts_fails()
    {
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
    public function it_returns_error_if_getting_partners_fails()
    {
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
        $mediaData = ['id' => $mediaId, 'url' => 'https://example.com/media.jpg'];

        $this->wordpressServiceMock
            ->shouldReceive('getMedia')
            ->with($mediaId)
            ->once()
            ->andReturn($mediaData);

        $response = $this->getJson("/api/wordpress/media/{$mediaId}");

        $response->assertStatus(200)
                 ->assertJson($mediaData);
    }

    /** @test */
    public function it_returns_error_if_getting_media_fails()
    {
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
        $data = ['section1' => 'data1', 'section2' => 'data2'];

        $this->wordpressServiceMock
            ->shouldReceive('getProgrammingHomepageData')
            ->once()
            ->andReturn($data);

        $response = $this->getJson('/api/wordpress/programming-homepage');

        $response->assertStatus(200)
                 ->assertJson($data);
    }

    /** @test */
    public function it_returns_error_if_getting_programming_homepage_fails()
    {
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
        $concerts = ['concert1', 'concert2'];

        $this->wordpressServiceMock
            ->shouldReceive('getConcertsHomepage')
            ->once()
            ->andReturn($concerts);

        $response = $this->getJson('/api/wordpress/concerts-homepage');

        $response->assertStatus(200)
                 ->assertJson($concerts);
    }

    /** @test */
    public function it_returns_error_if_getting_concerts_homepage_fails()
    {
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
        $concerts = [
            ['id' => 1, 'acf' => ['nom' => 'Concert 1']],
            ['id' => 2, 'acf' => ['nom' => 'Concert 2']],
        ];

        $this->wordpressServiceMock
            ->shouldReceive('getConcerts')
            ->once()
            ->andReturn($concerts);

        $response = $this->getJson('/api/wordpress/concert-names');

        $response->assertStatus(200)
                 ->assertJson([
                     ['id' => 1, 'name' => 'Concert 1'],
                     ['id' => 2, 'name' => 'Concert 2'],
                 ]);
    }

    /** @test */
    public function it_can_get_artist_meeting_names()
    {
        $meetings = [
            ['id' => 1, 'acf' => ['nom' => 'Artist Meeting 1']],
            ['id' => 2, 'acf' => ['nom' => 'Artist Meeting 2']],
        ];

        $this->wordpressServiceMock
            ->shouldReceive('getArtistsMeetings')
            ->once()
            ->andReturn($meetings);

        $response = $this->getJson('/api/wordpress/artist-meeting-names');

        $response->assertStatus(200)
                 ->assertJson([
                     ['id' => 1, 'name' => 'Artist Meeting 1'],
                     ['id' => 2, 'name' => 'Artist Meeting 2'],
                 ]);
    }
}
