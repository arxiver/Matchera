<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



//=========================
// UNAUTHENTICATED (GUEST)
//=========================
Route::group(["middleware" => ["unauthenticated:api"]], function(){
    Route::post("user/register","Auth\RegisterController@register")->name("user.register");
    Route::post("user/login","Auth\LoginController@login")->name("user.login");
});

Route::group(["middleware" => ["unauthenticated:api_admin"]], function(){
    Route::post("admin/login","Auth\LoginControllerAdmin@login")->name("admin.login");
});

//========================
// ADMINSTRATOR
//========================
Route::group(["middleware" => ["authenticated:api_admin,null"]],function(){
    Route::get("admin/users", "AdminstratorController@allUsers");
    Route::get("admin/remove/user/{id}", "AdminstratorController@removeUser");
    Route::get("admin/verify/user/{id}", "AdminstratorController@approveUser");
});

//========================
// MANAGER
//========================
Route::group(["middleware" => ["authenticated:api,manager"]],function(){
    Route::get("manager/stadiums","ManagerController@allStadiums");
    Route::get("manager/teams","ManagerController@allTeams");
    Route::post("manager/add/match","ManagerController@addMatch");
    Route::post("manager/update/match/{id}","ManagerController@updateMatch");
    Route::post("manager/add/stadium","ManagerController@addStadium");
});


//=========================
// FAN
//=========================
Route::group(["middleware" => ["authenticated:api,fan"]],function(){
    Route::get("fan/informations","FanController@informations");
    Route::post("fan/update","FanController@update");
    Route::get("fan/reserve","FanController@reserve");
    Route::get("fan/cancel/reservation","FanController@cancelReservation");
});

//=========================
// ANY ONE
//=========================
Route::get("matches","SharedController@allMatches");
Route::get("match/{id}","SharedController@match");
Route::redirect('/home', '/api/');
Route::get('/', 'HomeController@Home');

//=========================
// ANY AUTHENTICATED 
//=========================
Route::group(["middleware" => ["authenticated:all,null"]],function(){
    Route::get('logout',"Auth\LogoutController@logout");
});