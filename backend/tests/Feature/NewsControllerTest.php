<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\News;

class NewsControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_list_all_news()
    {
        // Crée 3 enregistrements d'actualités dans la base de données
        News::factory()->count(3)->create();

        // Effectue une requête GET sur l'endpoint /api/news
        $response = $this->getJson('/api/news');

        // Vérifie que la réponse a un statut 200 (succès)
        // et qu'elle contient exactement 3 éléments dans le JSON
        $response->assertStatus(200)
                 ->assertJsonCount(3);
    }

    /** @test */
/** @test */
public function it_can_show_a_specific_news_item()
{
    $news = News::factory()->create();

    $response = $this->getJson("/api/news/{$news->id}");

    $response->assertStatus(200)
             ->assertJson([
                 'id' => $news->id,
                 'title' => $news->title,
                 'description' => $news->description,
                 'category' => $news->category,
                 'importance' => $news->importance,  // Ajoutez le champ importance ici
             ]);
}


    /** @test */
    public function it_returns_404_if_news_item_not_found()
    {
        // Effectue une requête GET sur l'endpoint /api/news/999
        // (cet ID ne correspond à aucune actualité)
        $response = $this->getJson('/api/news/999');

        // Vérifie que la réponse a un statut 404 (non trouvé)
        // et que le message d'erreur est bien celui attendu
        $response->assertStatus(404)
                 ->assertJson(['message' => 'News item not found']);
    }
}
