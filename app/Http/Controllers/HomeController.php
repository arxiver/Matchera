<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function Home(){
        return response()->json([
            'app_name' => env("APP_NAME"),
            'test' => 'test'
        ]);
    }
}
