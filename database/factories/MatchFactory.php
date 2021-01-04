<?php

namespace Database\Factories;

use App\Models\Match;
use Illuminate\Database\Eloquent\Factories\Factory;

class MatchFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Match::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {

        $team_ids = \App\Models\Team::get('id')->all();
        $stadium_ids = \App\Models\Stadium::get('id')->all();
        return [
            "home_team_id" => $this->faker->randomElement($team_ids),
            "away_team_id" => $this->faker->randomElement($team_ids),
            "stadium_id" => $this->faker->randomElement($stadium_ids),
            "date_time" => $this->faker->date('Y-m-d', 'now'),
            "main_referee" => $this->faker->name,
            "linesmen_1" => $this->faker->name,
            "linesmen_2" => $this->faker->name,
        ];
    }
}
