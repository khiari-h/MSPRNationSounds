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
        // Les données pour l'inscription
        $data = [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john.doe@example.com',
        ];

        // Appelle l'API pour s'inscrire
        $response = $this->postJson('/api/newsletter', $data);

        // Vérifie que l'inscription a été réussie avec un statut 200
        $response->assertStatus(200)
                 ->assertJson(['message' => 'Inscription réussie!']);

        // Vérifie que les données sont présentes dans la base de données
        $this->assertDatabaseHas('subscribers', ['email' => 'john.doe@example.com']);
    }

    /** @test */
    public function it_prevents_duplicate_email_subscription()
    {
        
        Subscriber::truncate();
    
        // Crée un enregistrement avec l'e-mail john.doe@example.com
        Subscriber::create([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john.doe@example.com',
        ]);
    
        // Tentative de s'inscrire de nouveau avec la même adresse e-mail
        $data = [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john.doe@example.com',
        ];
    
        $response = $this->postJson('/api/newsletter', $data);
    
        // Vérifie que l'inscription est refusée avec un statut 422
        $response->assertStatus(422);
    
        // Vérifie qu'il n'y a toujours qu'un seul enregistrement dans la base de données avec cet e-mail
        $this->assertDatabaseCount('subscribers', 1);
    }
    
}
