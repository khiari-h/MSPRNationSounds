<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Subscriber;

class SubscriberTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_create_a_subscriber()
    {
        $subscriber = Subscriber::create([
            'first_name' => 'Alice',
            'last_name' => 'Smith',
            'email' => 'alice@example.com',
        ]);

        $this->assertDatabaseHas('subscribers', [
            'first_name' => 'Alice',
            'last_name' => 'Smith',
            'email' => 'alice@example.com',
        ]);
    }
}
