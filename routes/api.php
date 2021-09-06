<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get("/user/test","UserController@test");
Route::post("/user/login","UserController@login");
Route::post("/user/signup","UserController@create");

Route::get("/wavehouse/{w}","WaveHouseController@getdata");
Route::patch("/wavehouse","WaveHouseController@update");

// Route::get("/wavehouse_cnc","WaveHouseCNCController@getdata");
// Route::post("/wavehouse_cnc/update","WaveHouseCNCController@update");

Route::get("/type/{table}","TypeController@Getdata");
Route::post("/type/{table}","TypeController@InsertData");

Route::patch("/type/{table}/{id}","TypeController@UpdateData");

Route::delete("/type/{table}/{id}","TypeController@DeleteData");

Route::get("/toolholder","ToolHolderController@Getdata");

Route::get("/datatransfer1","DatatransferController@Getdata");


// Route::post("/toolholder/prepared","ToolHolderController@InsertData_Prepare");
// Route::post("/toolholder/unprepared","ToolHolderController@InsertData_NotPrepare");
// Route::post("/toolholder/maxlife","ToolHolderController@InsertData_Maxlife");



// Route::patch("/toolholder/unprepared/{id}","ToolHolderController@UpdateData_NotPrepare");
// Route::patch("/toolholder/prepared/{id}","ToolHolderController@UpdateData_Prepare");

// Route::delete("/toolholder/unprepared/{id}","ToolHolderController@DeleteData_NotPrepare");
// Route::delete("/toolholder/prepared/{id}","ToolHolderController@DeleteData_Prepare");
