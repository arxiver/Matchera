<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Reservations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("stadium_id");
            $table->unsignedBigInteger("match_id");
            $table->unsignedBigInteger("user_id");
            $table->integer("row");
            $table->integer("col");

            $table->foreign("stadium_id")->references("id")->on("stadiums")->onDelete("cascade");
            $table->foreign("match_id")->references("id")->on("matches")->onDelete("cascade");
            $table->foreign("user_id")->references("id")->on("users")->onDelete("cascade");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reservations');
    }
}
