<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class LogoutController extends Controller
{

    /**
     * @authenticated
     * @response 200 {
     *      "message": "You have looged out now"
     * }
     */
    public function logout(){
        auth()->logout();
        return response()->json([
            'message' => 'You have logged out now'
        ],200);
    }
}
