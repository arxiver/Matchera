<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Stadium;
use App\Models\Match;


class FanController extends Controller
{

    /**
    * @group Fan
    * @authenticated
    * @response 200 {
    *    "user": {
    *    "id": 11,
    *    "first_name": "new name",
    *    "last_name": "new nam",
    *    "username": "sofyanmahmoud0000",
    *    "email": "sofyan1020@gmail.com",
    *    "email_verified_at": null,
    *    "birthday": "12-12-2000",
    *    "gender": "male",
    *    "city": "Zamalek",
    *    "address": null,
    *    "role": "fan",
    *    "created_at": "2020-12-31T04:07:12.000000Z",
    *    "updated_at": "2020-12-31T04:12:47.000000Z"
    *   }
    *}
    */
    public function informations(){
        $user = auth()->user();
        return response()->json([
            'user' => $user
        ],200);
    }

    /**
    * @group Fan
    * @authenticated
    * @queryParam first_name required	
    * @queryParam last_name required	
    * @queryParam birthday required	
    * @queryParam gender required	
    * @queryParam city required	
    * @queryParam address optional
    * @response 200 {
    *   "message" : "The date have been updated successfully"
    * }	
    * @response 201 {
    *    "errors": {
    *        "first_name": [
    *            "The first name field is required."
    *        ],
    *        "last_name": [
    *            "The last name field is required."
    *        ],
    *        "birthday": [
    *            "The birthday field is required."
    *        ],
    *        "gender": [
    *            "The gender field is required."
    *        ],
    *        "city": [
    *            "The city field is required."
    *        ]
    *    }
    *}
    */
    public function update(Request $request){

        $Validate = Validator::make($request->all(), [
            'first_name' => ['required','string','max:255'],
            'last_name' => ['required','string','max:255'],
            'birthday' => ['required', 'date'],
            'gender' => ['required', 'string',],
            'city' => ['required', 'string'],
            'address' => ['string','nullable'],
        ]);

        if($Validate->fails())
            return response()->json([
                'errors' => $Validate->errors()->messages()
            ],201);

        $user = auth()->user();
        $user->update($request->all());
        return response()->json([
            'message' => 'The date have been updated successfully'
        ],200);
    }



    /**
    * @group Fan
    * @authenticated
    * @queryParam stadium_id integer required	
    * @queryParam match_id integer required	
    * @queryParam row integer required	
    * @queryParam col integer required	
    * @response 200 {
    *   "message" : "The seat has reserved successfully"
    * }	
    * @response 201 {
    *   "error" : "This seat is not valid"
    * }	
    * @response 201 {
    *   "error" : "This stadium doesn't exist"
    * }	
    * @response 201 {
    *   "error" : "This match dosen't exist in this stadium"
    * }	
    * @response 201 {
    *   "error" : "This seat is already reserved"
    * }	
    * @response 201 {
    *   "error" : "You have already reserved this seat"
    * }	
    * @response 201 {
    *    "errors": {
    *        "stadium_id": [
    *            "The stadium id field is required."
    *        ],
    *        "match_id": [
    *            "The match id field is required."
    *        ],
    *        "row": [
    *            "The row field is required."
    *        ],
    *        "col": [
    *            "The col field is required."
    *        ]
    *    }
    *}
    */
    public function reserve(Request $request){

        $Validate = Validator::make($request->all(), [
            'stadium_id' => ['required','numeric'],
            'match_id' => ['required','numeric'],
            'row' => ['required', 'numeric','min:0'],
            'col' => ['required', 'numeric','min:0'],
        ]);

        if($Validate->fails())
            return response()->json([
                'errors' => $Validate->errors()->messages()
            ],201);

        $stadium = Stadium::find($request->stadium_id);
        if($stadium == null)
            return response()->json([
                'error' => 'This stadium doesn\'t exist'
            ],201);
        
        $match = Match::where("id",$request->match_id)
                        ->where("stadium_id", $request->stadium_id)
                        ->first();

        if($match == null)
            return response()->json([
                'error' => 'This match dosen\'t exist in this stadium'
            ],201);
        if($request->row < 0 || $request->row >= $stadium->rows || $request->cols < 0 || $request->cols >= $stadium->seats_per_row)
            return response()->json([
                'error' => 'This seat is not valid'
            ],201);

        $reservation = Reservation::where("stadium_id",$request->stadium_id)
                                    ->where("match_id",$request->match_id)
                                    ->where("row",$request->row)
                                    ->where("col",$request->col)
                                    ->first();

        if($reservation != null){
            if($reservation->user_id == auth()->user()->id)
                return response()->json([
                    'message' => 'You have already reserved this seat'
                ],201);
            else 
                return response()->json([
                    'message' => 'This seat is already reserved'
                ],201);
        }

        Reservation::create(array_merge($request->all(),["user_id" => auth()->user()->id]));
        return response()->json([
            'message' => 'The seat has been reserved successfully'
        ],200);
    }


    /**
    * @group Fan
    * @authenticated
    * @queryParam stadium_id integer required	
    * @queryParam match_id integer required	
    * @queryParam row integer required	
    * @queryParam col integer required	
    * @response 200 {
    *   "message" : "The reservation has deleted successfully"
    * }	
    * @response 201 {
    *   "error" : "This seat is not valid"
    * }	
    * @response 201 {
    *   "error" : "This stadium doesn't exist"
    * }	
    * @response 201 {
    *   "error" : "This match dosen't exist in this stadium"
    * }	
    * @response 201 {
    *   "error" : "This seat is not reserved by you"
    * }	
    * @response 201 {
    *    "errors": {
    *        "stadium_id": [
    *            "The stadium id field is required."
    *        ],
    *        "match_id": [
    *            "The match id field is required."
    *        ],
    *        "row": [
    *            "The row field is required."
    *        ],
    *        "col": [
    *            "The col field is required."
    *        ]
    *    }
    *}
    */
    public function cancelReservation(Request $request){

        $Validate = Validator::make($request->all(), [
            'stadium_id' => ['required','numeric'],
            'match_id' => ['required','numeric'],
            'row' => ['required', 'numeric','min:0'],
            'col' => ['required', 'numeric','min:0'],
        ]);

        if($Validate->fails())
            return response()->json([
                'errors' => $Validate->errors()->messages()
            ],201);

        $stadium = Stadium::find($request->stadium_id);
        if($stadium == null)
            return response()->json([
                'error' => 'This stadium doesn\'t exist'
            ],201);
        
        $match = Match::where("id",$request->match_id)
                        ->where("stadium_id", $request->stadium_id)
                        ->first();

        if($match == null)
            return response()->json([
                'error' => 'This match dosen\'t exist in this stadium'
            ],201);
        if($request->row < 0 || $request->row >= $stadium->rows || $request->cols < 0 || $request->cols >= $stadium->seats_per_row)
            return response()->json([
                'error' => 'This seat is not valid'
            ],201);

        $reservation = Reservation::where("stadium_id",$request->stadium_id)
                                    ->where("match_id",$request->match_id)
                                    ->where("row",$request->row)
                                    ->where("col",$request->col)
                                    ->where("user_id",auth()->user()->id)
                                    ->first();

        if($reservation == null)
            return response()->json([
                "error" => "This seat is not reserved by you"
            ],201);


        $reservation->delete();
        return response()->json([
            'message' => 'The reservation has been deleted successfully'
        ],200);
    }
}
