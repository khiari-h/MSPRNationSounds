<?php

namespace Database\Factories;

use App\Models\Event;
use Illuminate\Database\Eloquent\Factories\Factory;

class EventFactory extends Factory
{
    protected $model = Event::class;

    public function definition()
    {
        return [
            'event_name' => $this->faker->sentence(3),
            'event_type' => $this->faker->randomElement(['concerts', 'artists']),
        ];
    }
}
