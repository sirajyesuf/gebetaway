<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder  extends Seeder
{
 
    public function run(): void
    {
        $email = 'gebetaway@gmail.com';
        $password = 'password';

        $user = [
            'email' => $email,
            'name' => 'Gebetaway',
            'password'=> Hash::make($password),
            'created_at' => now(),
            'updated_at' => now(),
        ];
        
        DB::table('users')->truncate();
        DB::table('users')->insert($user);

        echo "User created successfully";
        echo "\n";
        echo "Email: ".$email;
        echo "\n";
        echo "Password: ".$password;
        echo "\n";
        
        

    }
}
