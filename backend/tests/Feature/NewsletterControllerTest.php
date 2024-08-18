<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Subscriber;

class NewsletterControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_subscribe_a_new_user()
    {
        $data = [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john.doe@example.com',
        ];

        $response = $this->postJson('/api/subscribe', $data);

        $response->assertStatus(200)
                 ->assertJson(['message' => 'Inscription réussie!']);

        $this->assertDatabaseHas('subscribers', $data);
    }

    /** @test */
    public function it_prevents_duplicate_email_subscription()
    {
        Subscriber::factory()->create([
            'email' => 'john.doe@example.com',
        ]);

        $data = [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john.doe@example.com',
        ];

        $response = $this->postJson('/api/subscribe', $data);

        $response->assertStatus(422);
    }
}
