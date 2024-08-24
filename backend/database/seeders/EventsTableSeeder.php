<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Event;

class EventsTableSeeder extends Seeder
{
    public function run()
    {
        Event::create([
            'event_name' => 'Summer Festival',
            'event_type' => 'concerts',
        ]);

        Event::create([
            'event_name' => 'Art Expo',
            'event_type' => 'artists',
        ]);

    
    }
}
