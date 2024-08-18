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
        $event = Event::factory()->create();
        $data = [
            'first_name' => 'Jane',
            'last_name' => 'Doe',
            'email' => 'jane.doe@example.com',
            'event_id' => $event->id,
        ];

        $response = $this->postJson('/api/register', $data);

        $response->assertStatus(201)
                 ->assertJson(['message' => 'Inscription réussie !']);

        $this->assertDatabaseHas('participants', [
            'first_name' => 'Jane',
            'last_name' => 'Doe',
            'email' => 'jane.doe@example.com',
        ]);

        $this->assertDatabaseHas('event_participant', [
            'event_id' => $event->id,
        ]);
    }

    /** @test */
    public function it_prevents_duplicate_registration_to_same_event()
    {
        $event = Event::factory()->create();
        $participant = Participant::factory()->create(['email' => 'jane.doe@example.com']);

        $participant->events()->attach($event->id);

        $data = [
            'first_name' => 'Jane',
            'last_name' => 'Doe',
            'email' => 'jane.doe@example.com',
            'event_id' => $event->id,
        ];

        $response = $this->postJson('/api/register', $data);

        $response->assertStatus(409)
                 ->assertJson(['message' => 'Participant déjà inscrit à cet événement.']);
    }
}
