<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Participant;
use App\Models\Event;

class ParticipantTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_create_a_participant()
    {
        // Supprimer tous les participants pour éviter les doublons
        Participant::query()->delete();

        $participant = Participant::create([
            'first_name' => 'Jane',
            'last_name' => 'Doe',
            'email' => 'jane@example.com',
        ]);

        $this->assertDatabaseHas('participants', [
            'first_name' => 'Jane',
            'last_name' => 'Doe',
            'email' => 'jane@example.com',
        ]);
    }

    /** @test */
    public function it_can_belong_to_many_events()
    {
        // Supprimer tous les participants et événements pour éviter les doublons
        Participant::query()->delete();
        Event::query()->delete();

        $participant = Participant::create([
            'first_name' => 'Jane',
            'last_name' => 'Doe',
            'email' => 'jane@example.com',
        ]);

        $event = Event::create([
            'event_name' => 'Workshop',
            'event_type' => 'concerts', // Assurez-vous d'utiliser une valeur valide
        ]);

        $participant->events()->attach($event->id);

        $this->assertTrue($participant->events->contains($event));
    }
}
