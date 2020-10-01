<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
// use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {        
        return 'Hello world';
    }    

    /**
     * Update Password
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function password(Request $request)
    {
        $request->validate([
            'new_password' => 'required',
            'confirm_new_password' => 'same:new_password',
        ]);   

        Auth::user()->update(['password'=> Hash::make($request->new_password)]);
        return response()->json(['success' => true]);
    }

    /**
     * Display the specified resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        return response()->json(['user' => Auth::user()]);
    }    
}
