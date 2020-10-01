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

Route::post('/login', 'App\Http\Controllers\API\AuthController@login');
Route::get('/logout', 'App\Http\Controllers\API\AuthController@logout');

Route::middleware('auth:api')->get('/user', 'App\Http\Controllers\API\UserController@show');
Route::middleware('auth:api')->patch('/password', 'App\Http\Controllers\API\UserController@password');