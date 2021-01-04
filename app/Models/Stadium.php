<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stadium extends Model
{
    use HasFactory;

    protected $table = "stadiums";

    protected $timestamp = true;

    protected $fillable = [
        'name',
        'rows',
        'seats_per_row',
    ];
}
