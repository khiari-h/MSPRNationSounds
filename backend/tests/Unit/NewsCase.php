<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\News;

class NewsTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_create_news()
    {
        $news = News::create([
            'title' => 'Breaking News',
            'description' => 'Some important news description.',
            'category' => 'General',
            'importance' => 1,
        ]);

        $this->assertDatabaseHas('news', [
            'title' => 'Breaking News',
            'description' => 'Some important news description.',
            'category' => 'General',
            'importance' => 1,
        ]);
    }
}
