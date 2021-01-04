<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Stadium;
use App\Models\Seat;

class StadiumSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();

        for($i = 0 ; $i < 10; $i++){
            $data = [
                'name' => $faker->company,
                'rows' => $faker->numberBetween(3, 10),
                'seats_per_row' => $faker->numberBetween(3, 10),
            ];

            $Stadium = Stadium::create($data);
            $allData = [];
            for($j = 1 ; $j <= $data["rows"]; $j++){
                for($k = 1 ; $k <= $data["seats_per_row"]; $k++){
                    $temp = [
                        "row" => $j,
                        "col" => $k,
                        "stadium_id" => $Stadium->id,
                        "reserved" => false
                    ];
                    array_push($allData, $temp);
                }
            }
            Seat::insert($allData);
        }
    }
}
