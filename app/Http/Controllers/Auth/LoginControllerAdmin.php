<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use JWTAuth;

class LoginControllerAdmin extends Controller
{
    use AuthenticatesUsers;

    /**
    * @group Adminstator
    * @unauthenticated
    * @queryParam username required
    * @queryParam password required
    * @response 200 {
    *  "token": "token_value",
    *  "token_type": "token_type
    * }
    */
    public function login(Request $request)
    {
        $validate = $this->validateLogin($request);
        if($validate->fails()){
            return $this->sendFailedLoginResponse($validate->errors()->messages(),1);
        }

        if (method_exists($this, 'hasTooManyLoginAttempts') &&
            $this->hasTooManyLoginAttempts($request)) {
            $this->fireLockoutEvent($request);

            return $this->sendLockoutResponse($request);
        }

        if ($token = $this->attemptLogin($request)) {
            return $this->sendLoginResponse($request, $token);
        }
        $this->incrementLoginAttempts($request);

        return $this->sendFailedLoginResponse($request,0);
    }

    protected function validateLogin(Request $request)
    {
        return Validator::make($request->all(),[
            $this->username() => 'required|string',
            'password' => 'required|string',
        ]);
    }

    protected function sendFailedLoginResponse($errors,$type){
        return ($type) ? response()->json($errors,200): response()->json(['auth' => 'The password or username is wrong, try again'],201);
    }

    protected function attemptLogin(Request $request){
        return auth("api_admin")->attempt($this->credentials($request));
    }
    
    protected function sendLoginResponse(Request $request, $token)
    {
        $this->clearLoginAttempts($request);
        if ($response = $this->authenticated($request,$token)) {
            return $response;
        }
    }

    protected function authenticated(Request $request, $token)
    {
        return response()->json([
            'token' => $token,
            'token_type' => "bearer"
        ],200);
    }

    public function username()
    {
        return 'username';
    }
}
