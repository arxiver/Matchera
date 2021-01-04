<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Laravel\Ui\Presets\React;
use App\Models\Team;
use App\Models\Stadium;
use App\Models\Match;
use App\Models\Reservation;

class ManagerController extends Controller
{

    /**
    * @group Manager
    * @authenticated
    * @response 200 {
    *    "teams": [
    *        {
    *            "id": 1,
    *            "name": "Barton, Streich and Mayer",
    *            "created_at": "2020-12-31T03:00:34.000000Z",
    *            "updated_at": "2020-12-31T03:00:34.000000Z"
    *        },
    *        {
    *            "id": 2,
    *            "name": "Cormier, Reynolds and Langosh",
    *            "created_at": "2020-12-31T03:00:34.000000Z",
    *            "updated_at": "2020-12-31T03:00:34.000000Z"
    *        },
    *        {
    *            "id": 3,
    *            "name": "Hermann-Sauer",
    *            "created_at": "2020-12-31T03:00:34.000000Z",
    *            "updated_at": "2020-12-31T03:00:34.000000Z"
    *        },
    *        {
    *            "id": 4,
    *            "name": "Thompson-Rutherford",
    *            "created_at": "2020-12-31T03:00:34.000000Z",
    *            "updated_at": "2020-12-31T03:00:34.000000Z"
    *        },
    *        {
    *            "id": 5,
    *            "name": "Schulist-Keebler",
    *            "created_at": "2020-12-31T03:00:34.000000Z",
    *            "updated_at": "2020-12-31T03:00:34.000000Z"
    *        },
    *        {
    *            "id": 6,
    *            "name": "Hudson-Towne",
    *            "created_at": "2020-12-31T03:00:34.000000Z",
    *            "updated_at": "2020-12-31T03:00:34.000000Z"
    *        },
    *        {
    *            "id": 7,
    *            "name": "Wiza, Rice and Lehner",
    *            "created_at": "2020-12-31T03:00:34.000000Z",
    *            "updated_at": "2020-12-31T03:00:34.000000Z"
    *        },
    *        {
    *            "id": 8,
    *            "name": "Cole-Bechtelar",
    *            "created_at": "2020-12-31T03:00:34.000000Z",
    *            "updated_at": "2020-12-31T03:00:34.000000Z"
    *        },
    *        {
    *            "id": 9,
    *            "name": "Kohler PLC",
    *            "created_at": "2020-12-31T03:00:34.000000Z",
    *            "updated_at": "2020-12-31T03:00:34.000000Z"
    *        },
    *        {
    *            "id": 10,
    *            "name": "Kerluke, Thiel and Bergnaum",
    *            "created_at": "2020-12-31T03:00:35.000000Z",
    *            "updated_at": "2020-12-31T03:00:35.000000Z"
    *        },
    *        {
    *            "id": 11,
    *            "name": "Barton, Langworth and Skiles",
    *            "created_at": "2020-12-31T03:00:35.000000Z",
    *            "updated_at": "2020-12-31T03:00:35.000000Z"
    *        },
    *        {
    *            "id": 12,
    *            "name": "Kohler-Schaefer",
    *            "created_at": "2020-12-31T03:00:35.000000Z",
    *            "updated_at": "2020-12-31T03:00:35.000000Z"
    *        },
    *        {
    *            "id": 13,
    *            "name": "Wolff, Luettgen and Lueilwitz",
    *            "created_at": "2020-12-31T03:00:35.000000Z",
    *            "updated_at": "2020-12-31T03:00:35.000000Z"
    *        },
    *        {
    *            "id": 14,
    *            "name": "Nikolaus, Runte and Smitham",
    *            "created_at": "2020-12-31T03:00:35.000000Z",
    *            "updated_at": "2020-12-31T03:00:35.000000Z"
    *        },
    *        {
    *            "id": 15,
    *            "name": "Parker, Walker and Pfannerstill",
    *            "created_at": "2020-12-31T03:00:35.000000Z",
    *            "updated_at": "2020-12-31T03:00:35.000000Z"
    *        },
    *        {
    *            "id": 16,
    *            "name": "Senger, Yost and O'Kon",
    *            "created_at": "2020-12-31T03:00:35.000000Z",
    *            "updated_at": "2020-12-31T03:00:35.000000Z"
    *        },
    *        {
    *            "id": 17,
    *            "name": "Donnelly, Leffler and Casper",
    *            "created_at": "2020-12-31T03:00:35.000000Z",
    *            "updated_at": "2020-12-31T03:00:35.000000Z"
    *        },
    *        {
    *            "id": 18,
    *            "name": "Kiehn-Grady",
    *            "created_at": "2020-12-31T03:00:35.000000Z",
    *            "updated_at": "2020-12-31T03:00:35.000000Z"
    *        }
    *    ]
    *}
    */
    public function allTeams(){
        $teams = Team::all();
        return response()->json([
            "teams" => $teams
        ],200);
    }


    /**
    * @group Manager
    * @authenticated
    * @response 200 {
    *    "stadiums": [
    *        {
    *            "id": 1,
    *            "name": "Blick and Sons",
    *            "rows": "9",
    *            "seats_per_row": "5",
    *            "created_at": "2020-12-31T03:00:35.000000Z",
    *            "updated_at": "2020-12-31T03:00:35.000000Z"
    *        },
    *        {
    *            "id": 2,
    *            "name": "Klocko LLC",
    *            "rows": "7",
    *            "seats_per_row": "9",
    *            "created_at": "2020-12-31T03:00:35.000000Z",
    *            "updated_at": "2020-12-31T03:00:35.000000Z"
    *        },
    *        {
    *            "id": 3,
    *            "name": "Tremblay-Koelpin",
    *            "rows": "6",
    *            "seats_per_row": "10",
    *            "created_at": "2020-12-31T03:00:35.000000Z",
    *            "updated_at": "2020-12-31T03:00:35.000000Z"
    *        },
    *        {
    *            "id": 4,
    *            "name": "Feil-Streich",
    *            "rows": "10",
    *            "seats_per_row": "10",
    *            "created_at": "2020-12-31T03:00:35.000000Z",
    *            "updated_at": "2020-12-31T03:00:35.000000Z"
    *        },
    *        {
    *            "id": 5,
    *            "name": "Ullrich-Pfannerstill",
    *            "rows": "7",
    *            "seats_per_row": "6",
    *            "created_at": "2020-12-31T03:00:36.000000Z",
    *            "updated_at": "2020-12-31T03:00:36.000000Z"
    *        }
    *    ]
    *}
    */
    public function allStadiums(){
        $stadiums = Stadium::all();
        return response()->json([
            "stadiums" => $stadiums
        ],200);
    }


    /**
    * @group Manager
    * @authenticated
    * @queryParam home_team_id integer required 
    * @queryParam away_team_id integer required 
    * @queryParam stadium_id integer required 
    * @queryParam date_time date required 
    * @queryParam main_referee string required The name of the main referee 
    * @queryParam linesmen_1 string required The name of the first linesmen
    * @queryParam linesmen_2 string required The name of the second linesmen
    * @response 200 {
    *   "message" : "The match has been added successfully"
    * }
    * @response 201 {
    *   "error" : "The home team can't be equal the away team"
    * }
    * @response 201 {
    * "errors": {
    *    "home_team_id": [
    *        "The home team id field is required."
    *    ],
    *    "away_team_id": [
    *        "The away team id field is required."
    *    ],
    *    "stadium_id": [
    *        "The stadium id field is required."
    *    ],
    *    "date_time": [
    *        "The date time field is required."
    *    ],
    *    "main_referee": [
    *        "The main referee field is required."
    *    ],
    *    "linesmen_1": [
    *        "The linesmen 1 field is required."
    *    ],
    *    "linesmen_2": [
    *        "The linesmen 2 field is required."
    *    ]
    *   }   
    * }
    */
    public function addMatch(Request $request){

        $Validate = Validator::make($request->all(), [
            "home_team_id" => ['required','numeric','exists:teams,id'],
            "away_team_id" => ['required','numeric','exists:teams,id'],
            "stadium_id" => ['required','numeric','exists:stadiums,id'],
            "date_time" => ['required','date'],
            "main_referee" => ['required','string'],
            "linesmen_1" => ['required','string'],
            "linesmen_2" => ['required','string'],
        ]);

        if($Validate->fails()){
            return response()->json([
                "errors" => $Validate->errors()->messages()
            ],201);
        }

        if($request->home_team_id == $request->away_team_id)
            return response()->json([
                'error' => ['The home team can\'t be equal the away team']
            ],201);

        Match::create($request->all());
        return response()->json([
            'message' => 'The match has been added successfully'
        ],200);

    }

    /**
    * @group Manager
    * @authenticated
    * @queryParam home_team_id integer required 
    * @queryParam away_team_id integer required 
    * @queryParam stadium_id integer required 
    * @queryParam date_time date required 
    * @queryParam main_referee string required The name of the main referee 
    * @queryParam linesmen_1 string required The name of the first linesmen
    * @queryParam linesmen_2 string required The name of the second linesmen
    * @urlParam id string required The id of the match to be updated
    * @response 200 {
    *   "message" : "The match has been updated successfully"
    * }
    * @response 201 {
    *   "error" : "The home team can't be equal the away team"
    * }
    * @response 201 {
    *   "error" : "This match doesn't exist"
    * }
    * @response 201 {
    * "errors": {
    *    "home_team_id": [
    *        "The home team id field is required."
    *    ],
    *    "away_team_id": [
    *        "The away team id field is required."
    *    ],
    *    "stadium_id": [
    *        "The stadium id field is required."
    *    ],
    *    "date_time": [
    *        "The date time field is required."
    *    ],
    *    "main_referee": [
    *        "The main referee field is required."
    *    ],
    *    "linesmen_1": [
    *        "The linesmen 1 field is required."
    *    ],
    *    "linesmen_2": [
    *        "The linesmen 2 field is required."
    *    ]
    *   }   
    * }
    */
    public function updateMatch(Request $request, $id){

        $match = Match::find($id);

        if($match == null)
            return response()->json([
                'error' => 'This match doesn\'t exist'
            ],201);

        $Validate = Validator::make($request->all(), [
            "home_team_id" => ['required','numeric','exists:teams,id'],
            "away_team_id" => ['required','numeric','exists:teams,id'],
            "stadium_id" => ['required','numeric','exists:stadiums,id'],
            "date_time" => ['required','date'],
            "main_referee" => ['required','string'],
            "linesmen_1" => ['required','string'],
            "linesmen_2" => ['required','string'],
        ]);

        if($Validate->fails()){
            return response()->json([
                "errors" => $Validate->errors()->messages()
            ],201);
        }

        if($request->home_team_id == $request->away_team_id)
            return response()->json([
                'error' => ['The home team can\'t be equal the away team']
            ],201);

        $match->update($request->all());
        return response()->json([
            'message' => 'The match has been updated successfully'
        ],200);
    }

    /**
    * @group Manager
    * @authenticated
    * @queryParam name string required The name of the stadium
    * @queryParam rows integer required The number of rows in the stadium
    * @queryParam seats_per_row integer required The number of seats in each row
    * @response 200 {
    *   "message" : "The stadium has been added successfully"
    * }
    */
    public function addStadium(Request $request){
        $rules = [
            "name" => ['required','string'],
            "rows" => ['required','numeric'],
            "seats_per_row" => ['required','numeric'],
        ];

        $validate = Validator::make($request->all(), $rules);

        if($validate->fails())
            return response()->json([
                'errors' => $validate->errors()->messages()
            ],201);

        Stadium::create($request->all());
        return response()->json([
            'message' => 'The stadium has been added successfully'
        ],200);
    }


    

}
