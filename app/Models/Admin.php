<?php

namespace App\Models;


use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Model;
use Hash;


class Admin extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    protected $table = "adminstrators";

    protected $fillable = [
        'username',
        'password'
    ];

    public function setPasswordAttribute($pass)
    {
        $this->attributes['password'] = Hash::make($pass);
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
