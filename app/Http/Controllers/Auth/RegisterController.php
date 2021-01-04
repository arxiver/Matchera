<?php

namespace App\Http\Controllers\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\Models\User;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class RegisterController extends Controller
{
    use RegistersUsers;

    protected function validator(array $data)
    {
        return Validator::make($data, [
            'first_name' => ['required','string','max:255'],
            'last_name' => ['required','string','max:255'],
            'username' => ['required','string','max:255','unique:users'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'birthday' => ['required', 'date'],
            'gender' => ['required', 'string',],
            'city' => ['required', 'string'],
            'address' => ['string','nullable'],
            'role' => ['required','string',Rule::in(['fan', 'manager'])],
        ]);
    }

    protected function create(array $data){
        return User::create($data);
    }

    /**
    * @group Uesr
    * @queryParam first_name required	
    * @queryParam last_name required	
    * @queryParam username required	
    * @queryParam email required
    * @queryParam password required	
    * @queryParam password_confirmed required	
    * @queryParam birthday required	
    * @queryParam gender required	
    * @queryParam role required	
    * @queryParam city required	
    * @queryParam address optional	
    */
    public function register(Request $request)
    {
        $validator = $this->validator($request->all());
        if($validator->fails()){
            return $this->notRegistered($validator);
        }
        $user = $this->create($request->all());
        return $this->registered($request, $user);

    }


    
    protected function registered(Request $request, $user)
    {
        return response()->json([
            'message' => 'You must wait till the adminstator verify you'
        ],200);
    }

    protected function notRegistered($validate)
    {
        return response()->json(
            $validate->errors()->getMessages()
            ,200);
    }

    protected function guard()
    {
        return Auth::guard();
    }
}
