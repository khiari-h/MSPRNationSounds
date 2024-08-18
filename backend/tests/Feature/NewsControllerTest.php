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
        News::factory()->count(3)->create();

        $response = $this->getJson('/api/news');

        $response->assertStatus(200)
                 ->assertJsonCount(3);
    }

    /** @test */
    public function it_can_show_a_specific_news_item()
    {
        $news = News::factory()->create();

        $response = $this->getJson("/api/news/{$news->id}");

        $response->assertStatus(200)
                 ->assertJson([
                     'id' => $news->id,
                     'title' => $news->title,
                 ]);
    }

    /** @test */
    public function it_returns_404_if_news_item_not_found()
    {
        $response = $this->getJson('/api/news/999');

        $response->assertStatus(404)
                 ->assertJson(['message' => 'News item not found']);
    }

    /** @test */
    public function it_can_create_a_news_item()
    {
        $data = [
            'title' => 'New Title',
            'description' => 'New description',
            'category' => 'Category 1',
        ];

        $response = $this->postJson('/api/news', $data);

        $response->assertStatus(201)
                 ->assertJson($data);

        $this->assertDatabaseHas('news', $data);
    }

    /** @test */
    public function it_can_update_a_news_item()
    {
        $news = News::factory()->create();

        $data = ['title' => 'Updated Title'];

        $response = $this->putJson("/api/news/{$news->id}", $data);

        $response->assertStatus(200)
                 ->assertJson($data);

        $this->assertDatabaseHas('news', $data);
    }

    /** @test */
    public function it_can_delete_a_news_item()
    {
        $news = News::factory()->create();

        $response = $this->deleteJson("/api/news/{$news->id}");

        $response->assertStatus(200)
                 ->assertJson(['message' => 'News item deleted']);

        $this->assertDatabaseMissing('news', ['id' => $news->id]);
    }
}
