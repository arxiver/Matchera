<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Matches extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('matches', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("home_team_id");
            $table->unsignedBigInteger("away_team_id");
            $table->foreign("home_team_id")->references("id")->on("teams")->onDelete("cascade");
            $table->foreign("away_team_id")->references("id")->on("teams")->onDelete("cascade");
            $table->unsignedBigInteger("stadium_id");
            $table->foreign("stadium_id")->references("id")->on("stadiums")->onDelete("cascade");
            $table->dateTime("date_time");
            $table->string("main_referee");
            $table->string("linesmen_1");
            $table->string("linesmen_2");
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
        Schema::dropIfExists('matches');
    }
}
