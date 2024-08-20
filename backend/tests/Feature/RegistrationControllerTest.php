<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Event;
use App\Models\Participant;

class RegistrationControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_register_a_participant_to_an_event()
    {
        // Crée un événement
        $event = Event::factory()->create();

        // Données d'inscription
        $data = [
            'first_name' => 'Jane',
            'last_name' => 'Doe',
            'email' => 'jane.doe@example.com',
            'event_id' => $event->id,
        ];

        // Enregistre le participant
        $response = $this->postJson('/api/register', $data);

        // Vérifie la réponse
        $response->assertStatus(201)
                 ->assertJson(['message' => 'Inscription réussie !']);

        // Vérifie la base de données
        $this->assertDatabaseHas('participants', [
            'first_name' => 'Jane',
            'last_name' => 'Doe',
            'email' => 'jane.doe@example.com',
        ]);

        $this->assertDatabaseHas('event_participant', [
            'event_id' => $event->id,
            'participant_id' => Participant::first()->id,
        ]);
    }

    /** @test */
/** @test */
public function it_prevents_duplicate_registration_to_same_event()
{
    // Vider la table des participants pour éviter les duplicata
    Participant::query()->delete(); // Utilisez delete au lieu de truncate

    // Crée un événement
    $event = Event::factory()->create();

    // Crée un participant
    $participant = Participant::factory()->create([
        'email' => 'jane.doe@example.com',
    ]);

    // Associe le participant à l'événement
    $participant->events()->attach($event->id);

    // Tentative d'inscription avec les mêmes données
    $data = [
        'first_name' => 'Jane',
        'last_name' => 'Doe',
        'email' => 'jane.doe@example.com',
        'event_id' => $event->id,
    ];

    // Fait la requête d'inscription
    $response = $this->postJson('/api/register', $data);

    // Vérifie que la réponse est un conflit (409)
    $response->assertStatus(409)
             ->assertJson(['message' => 'Participant déjà inscrit à cet événement.']);
}

}
