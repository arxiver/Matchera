<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Authenticated
{
    public function handle(Request $request, Closure $next, $guard, $role)
    {

        if($guard == "all" && (auth("api")->check() || auth("api_admin")->check()))
            return $next($request);

        if($guard == "all")
            return response()->json([
                'error' => 'forbidden'
            ],201);
        
        if($guard == "api_admin" && auth($guard)->check())
            return $next($request);

        if(auth($guard)->check()){
            if(auth($guard)->user()->role == $role){
                if(auth($guard)->user()->email_verified_at)
                    return $next($request);
                else 
                    return response()->json([
                        "error" => "You must wait till the adminstrator approve your account"
                    ],201);
            }
        }

        return response()->json([
            'error' => 'forbidden'
        ],201);
    }
}
