<?php

namespace Database\Seeders;
use App\Models\Categories;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Electronics',
            'Clothing',
            'Home & Kitchen',
            'Books',
            'Smartphones',
            'Laptops',
            'Men\'s Clothing',
            'Women\'s Clothing',
            'Kitchen Appliances',
            'Furniture',
        ];

        foreach ($categories as $name) {
            Categories::create([
                'name' => $name,
                'slug' => Str::slug($name),
            ]);
        }
    }
}
