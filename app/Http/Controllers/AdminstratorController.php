<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
class AdminstratorController extends Controller
{

    /**
    * @group Adminstator
    * @authenticated
    * @response 200 {
    *   "users": [
    *       {
    *           "id": 1,
    *           "first_name": "Sofyan",
    *           "last_name": "Mahmoud",
    *           "username": "sofyanmahmoud0000",
    *           "email": "sofyan1020@gmail.com",
    *           "email_verified_at": null,
    *           "birthday": "21-02-1998",
    *           "gender": "male",
    *           "city": "Dokki",
    *           "address": null,
    *           "role": "fan",
    *           "created_at": "2020-12-30T08:58:50.000000Z",
    *           "updated_at": "2020-12-30T08:58:50.000000Z"
    *       }
    *   ]
    * }
    */
    public function allUsers(){
        $Users = User::all();
        return response()->json([
            'users' => $Users
        ],200);
    }

    /**
    * @group Adminstator
    * @authenticated
    * urlParam id integer required The id of the user to be verified
    * @response 200 {
    *   "message" : "The user have been verified successfully"
    * }
    * @response 201 {
    *   "message": "This user doesn't exist"   
    * }
    * @response 201 {
    *   "message": "This user is already verified"   
    * }
    */
    public function approveUser($id){
        $User = User::find($id);
        if($User == null)
            return response()->json([
                'message' => 'This user doesn\'t exist'
            ],201);

        if($User->email_verified_at != null)
            return response()->json([
                'message' => 'This user is already verified'
            ],201);

        $User->update(['email_verified_at' => now()]);
        return response()->json([
            'message' => "The user have been verified successfully"
        ],200);
    }

    /**
    * @group Adminstator
    * @authenticated
    * urlParam id integer required The id of the user to be removed
    * @response 200 {
    *   "message" : "The user have been deleted successfully"
    * }
    * @response 201 {
    *   "message": "This user doesn\'t exist"   
    * }
    */
    public function removeUser($id){
        $User = User::find($id);
        if($User == null)
            return response()->json([
                'message' => 'This user doesn\'t exist'
            ],201);

        $User->delete();
        return response()->json([
            'message' => "The user have been deleted successfully"
        ],200);
    }
}
