<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {

        return [
            'first_name'    => $this->faker->firstName,
            'last_name'     => $this->faker->lastName,
            'username'      => $this->faker->unique()->userName,
            'email'         => $this->faker->unique()->email,
            'password'      => 'password',
            'city'          => $this->faker->city,
            'birthday'      => $this->faker->date('Y-m-d', 'now'),
            'gender'        => $this->faker->randomElement(["male", "female", "other"]),
            'address'       => $this->faker->address,
            'role'          => $this->faker->randomElement(["manager", "fan"]),
        ];
    }
}
