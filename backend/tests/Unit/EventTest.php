<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Event;
use App\Models\Participant;

class EventTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_create_an_event()
    {
        $event = Event::create([
            'event_name' => 'Festival',
            'event_type' => 'Music',
        ]);

        $this->assertDatabaseHas('events', [
            'event_name' => 'Festival',
            'event_type' => 'Music',
        ]);
    }

    /** @test */
    public function it_can_have_many_participants()
    {
        $event = Event::create([
            'event_name' => 'Festival',
            'event_type' => 'Music',
        ]);

        $participant = Participant::create([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
        ]);

        $event->participants()->attach($participant->id);

        $this->assertTrue($event->participants->contains($participant));
    }
}
