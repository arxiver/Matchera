<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Unauthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next, $guard)
    {
        if(!auth($guard)->check())
            return $next($request);
        return response()->json([
            'error' => 'You\'re already logged in'
        ],201);
    }
}
