<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $table = "reservations";

    protected $fillable = [
        "stadium_id",
        "match_id",
        "user_id",
        "row",
        "col",
    ];
}
