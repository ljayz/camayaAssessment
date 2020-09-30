<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // create sample user
        DB::table('users')->insert([
            'name' => 'Sample User',
            'email' => 'sampleuser@gmail.com',
            'password' => Hash::make('password'),
        ]);
    }
}
