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
        // Parent categories
        $parentCategories = [
            [
                'name' => 'Electronics',
                'slug' => 'electronics',
                'status' => 'active',
                'description' => 'All electronic devices and gadgets'
            ],
            [
                'name' => 'Clothing',
                'slug' => 'clothing',
                'status' => 'active',
                'description' => 'Fashion items and apparel'
            ],
            [
                'name' => 'Home & Kitchen',
                'slug' => 'home-kitchen',
                'status' => 'active',
                'description' => 'Items for your home and kitchen'
            ],
            [
                'name' => 'Books',
                'slug' => 'books',
                'status' => 'active',
                'description' => 'Books and reading materials'
            ],
        ];

        // Create parent categories
        foreach ($parentCategories as $category) {
            Categories::create($category);
        }

        // Child categories with parent references
        $childCategories = [
            [
                'name' => 'Smartphones',
                'slug' => 'smartphones',
                'status' => 'active',
                'description' => 'Mobile phones and accessories',
                'parent_slug' => 'electronics'
            ],
            [
                'name' => 'Laptops',
                'slug' => 'laptops',
                'status' => 'active',
                'description' => 'Laptop computers and accessories',
                'parent_slug' => 'electronics'
            ],
            [
                'name' => 'Men\'s Clothing',
                'slug' => 'mens-clothing',
                'status' => 'active',
                'description' => 'Clothing for men',
                'parent_slug' => 'clothing'
            ],
            [
                'name' => 'Women\'s Clothing',
                'slug' => 'womens-clothing',
                'status' => 'active',
                'description' => 'Clothing for women',
                'parent_slug' => 'clothing'
            ],
            [
                'name' => 'Kitchen Appliances',
                'slug' => 'kitchen-appliances',
                'status' => 'active',
                'description' => 'Appliances for your kitchen',
                'parent_slug' => 'home-kitchen'
            ],
            [
                'name' => 'Furniture',
                'slug' => 'furniture',
                'status' => 'active',
                'description' => 'Furniture for your home',
                'parent_slug' => 'home-kitchen'
            ],
        ];

        // Create child categories
        foreach ($childCategories as $childCategory) {
            $parentSlug = $childCategory['parent_slug'];
            unset($childCategory['parent_slug']);

            $parent = Categories::where('slug', $parentSlug)->first();
            if ($parent) {
                $childCategory['parent_id'] = $parent->id;
                Categories::create($childCategory);
            }
        }
    }
}
