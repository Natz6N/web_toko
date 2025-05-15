<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        User::create([
            'name' => 'Admin Natz',
            'email' => 'admin@example.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password123'), // gunakan Hash::make untuk enkripsi password
            'remember_token' => Str::random(10),
    ]);
        // Run our custom seeders
        $this->call([
            CategoriesSeeder::class,
            TestimonialsSeeder::class,
            BannersSeeder::class,
            ProductSeeder::class,
        ]);
    }
}
