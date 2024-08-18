<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Event;

class EventTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_create_an_event()
    {
        $event = Event::create([
            'event_name' => 'Festival',
            'event_type' => 'concerts',  
        ]);

        $this->assertDatabaseHas('events', [
            'event_name' => 'Festival',
            'event_type' => 'concerts',  
        ]);
    }
}
