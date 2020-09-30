<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Login the user
     *
     * @param  string  $email
     * @param  string  $password
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request) 
    {
        if (Auth::check()) {
            return response()->json(['message' => 'You are currently logged in']);
        }

        $loginData = $request->validate([
            'email' => 'email|required',
            'password' => 'required'
        ]);

        if (!Auth::attempt($loginData)) {           
            return response()->json(['message' => 'Invalid email or password']);
        }

        $accessToken = Auth::user()->createToken('authToken')->accessToken;

        return response()->json(['user' => Auth::user(), 'access_token' => $accessToken]);
    }

    /**
     * Logout the user
     *
     * @return \Illuminate\Http\Response
     */
    public function logout() 
    {
        if (Auth::check()) {
            Auth::logout();            
        }
        
        return response()->json(['success' => true]);
    }    
}
