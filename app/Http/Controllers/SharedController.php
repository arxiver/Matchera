<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Laravel\Ui\Presets\React;
use App\Models\Team;
use App\Models\Stadium;
use App\Models\Match;
use App\Models\Reservation;

/**
 * @group Shared
 * This section for the function which shared with (manager, fan and guest)
 */
class SharedController extends Controller
{
    /**
    * @group Shared
    * @authenticated
    * @response 200 {
    *    "matches": [
    *        {
    *            "id": 1,
    *            "home_team_id": "7",
    *            "away_team_id": "12",
    *            "stadium_id": "3",
    *            "date_time": "2020-04-19",
    *            "main_referee": "River Cole PhD",
    *            "linesmen_1": "Rachel Dickinson",
    *            "linesmen_2": "Ashleigh Fritsch",
    *            "created_at": "2020-12-31T03:00:36.000000Z",
    *            "updated_at": "2020-12-31T03:00:36.000000Z",
    *            "stadium": {
    *                "id": 3,
    *                "name": "Tremblay-Koelpin",
    *                "rows": "2",
    *                "seats_per_row": "4",
    *                "created_at": "2020-12-31T03:00:35.000000Z",
    *                "updated_at": "2020-12-31T03:00:35.000000Z"
    *            },
    *            "away_team": {
    *                "id": 12,
    *                "name": "Kohler-Schaefer",
    *                "created_at": "2020-12-31T03:00:35.000000Z",
    *                "updated_at": "2020-12-31T03:00:35.000000Z"
    *            },
    *            "home_team": {
    *                "id": 7,
    *                "name": "Wiza, Rice and Lehner",
    *                "created_at": "2020-12-31T03:00:34.000000Z",
    *                "updated_at": "2020-12-31T03:00:34.000000Z"
    *            },
    *            "seats": [
    *                [
    *                    1,
    *                    1,
    *                    1,
    *                    1,
    *                ],
    *                [
    *                    1,
    *                    1,
    *                    0,
    *                    1,
    *                ]
    *            ]
    *        },
    *        {
    *            "id": 2,
    *            "home_team_id": "11",
    *            "away_team_id": "11",
    *            "stadium_id": "4",
    *            "date_time": "1983-03-16",
    *            "main_referee": "Jocelyn Hackett",
    *            "linesmen_1": "Clyde Reynolds",
    *            "linesmen_2": "Karina Gaylord",
    *            "created_at": "2020-12-31T03:00:36.000000Z",
    *            "updated_at": "2020-12-31T03:00:36.000000Z",
    *            "stadium": {
    *                "id": 4,
    *                "name": "Feil-Streich",
    *                "rows": "2",
    *                "seats_per_row": "3",
    *                "created_at": "2020-12-31T03:00:35.000000Z",
    *                "updated_at": "2020-12-31T03:00:35.000000Z"
    *            },
    *            "away_team": {
    *                "id": 11,
    *                "name": "Barton, Langworth and Skiles",
    *                "created_at": "2020-12-31T03:00:35.000000Z",
    *                "updated_at": "2020-12-31T03:00:35.000000Z"
    *            },
    *            "home_team": {
    *                "id": 11,
    *                "name": "Barton, Langworth and Skiles",
    *                "created_at": "2020-12-31T03:00:35.000000Z",
    *                "updated_at": "2020-12-31T03:00:35.000000Z"
    *            },
    *            "seats": [
    *                [
    *                    1,
    *                    1,
    *                    1,
    *                ],
    *                [
    *                    1,
    *                    1,
    *                    1,
    *                ]
    *            ]
    *        },
    *    ]
    *}
    */
    public function allMatches(){
        $matches = \App\Models\Match::all();
        foreach($matches as $match){
            $match["stadium"] = $match->stadium;
            $match["away_team"] = $match->away_team;
            $match["home_team"] = $match->home_team;
            $match["seats"] = $this->seats($match);
        }
        return response()->json([
            "matches" => $matches
        ],200);
    }

    /**
    * @group Shared
    * @authenticated
    * @urlParam id integer required The id of the match to be viewed
    * @response 201 {
    *   "error" : "This match doesn't exist"
    * }
    * @response 200 {
    *    "match": {
    *        "id": 1,
    *        "home_team_id": "7",
    *        "away_team_id": "12",
    *        "stadium_id": "3",
    *        "date_time": "2020-04-19",
    *        "main_referee": "River Cole PhD",
    *        "linesmen_1": "Rachel Dickinson",
    *        "linesmen_2": "Ashleigh Fritsch",
    *        "created_at": "2020-12-31T03:00:36.000000Z",
    *        "updated_at": "2020-12-31T03:00:36.000000Z",
    *        "stadium": {
    *            "id": 3,
    *            "name": "Tremblay-Koelpin",
    *            "rows": "2",
    *            "seats_per_row": "4",
    *            "created_at": "2020-12-31T03:00:35.000000Z",
    *            "updated_at": "2020-12-31T03:00:35.000000Z"
    *        },
    *        "away_team": {
    *            "id": 12,
    *            "name": "Kohler-Schaefer",
    *            "created_at": "2020-12-31T03:00:35.000000Z",
    *            "updated_at": "2020-12-31T03:00:35.000000Z"
    *        },
    *        "home_team": {
    *            "id": 7,
    *            "name": "Wiza, Rice and Lehner",
    *            "created_at": "2020-12-31T03:00:34.000000Z",
    *            "updated_at": "2020-12-31T03:00:34.000000Z"
    *        },
    *        "seats": [
    *            [
    *                1,
    *                1,
    *                1,
    *                1,
    *            ],
    *            [
    *                1,
    *                1,
    *                0,
    *                1,
    *            ]
    *        ]
    *    }
    *}
    */
    public function match($id){
        $match = Match::find($id);
        if($match == null)
            return response()->json([
                'error' => 'This match doesn\'t exist'
            ],201);
        
        $match["stadium"] = $match->stadium;
        $match["away_team"] = $match->away_team;
        $match["home_team"] = $match->home_team;
        $match["seats"] = $this->seats($match);
        return response()->json([
            'match' => $match,
        ],200);
    }

    public function seats($match){
        $stadium = $match->stadium;
        $row = array_fill(0,$stadium->seats_per_row,1);
        $seats = array_fill(0,$stadium->rows,$row);

        $reservations = Reservation::where("match_id",$match->id)
                                    ->where("stadium_id",$stadium->id)
                                    ->get();

        foreach($reservations->all() as $i){
            $seats[$i->row][$i->col] = 0;
            if(auth()->user() && auth()->user()->id == $i->user_id){
                    $seats[$i->row][$i->col] = 2;
            }   
        }
        return $seats;
    }
}
