<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Match extends Model
{

    protected $table = "matches";

    protected $fillable = [
        "home_team_id",
        "away_team_id",
        "stadium_id",
        "date_time",
        "main_referee",
        "linesmen_1",
        "linesmen_2"
    ];

    use HasFactory;

    public function stadium(){
        return $this->belongsTo("App\Models\Stadium","stadium_id","id");
    }

    public function home_team(){
        return $this->belongsTo("App\Models\Team","home_team_id","id");
    }

    public function away_team(){
        return $this->belongsTo("App\Models\Team","away_team_id","id");
    }
}
