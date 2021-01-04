<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(AdminSeeder::class);
        \App\Models\User::factory(10)->create();
        \App\Models\Team::factory(18)->create();
        // $this->call(StadiumSeeder::class);
        \App\Models\Stadium::factory(5)->create();
        \App\Models\Match::factory(5)->create();
    }
}
