<?php

namespace Database\Seeders;

use App\Models\testimonials;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class TestimonialsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $testimonials = [
            [
                'name' => 'John Smith',
                'review' => "I've been shopping here for years and the quality of products never disappoints. The customer service is exceptional and shipping is always on time!",
                'rating' => 5,
                'image' => 'https://randomuser.me/api/portraits/men/32.jpg',
                'is_approved' => true,
            ],
            [
                'name' => 'Emily Johnson',
                'review' => "This was my first time ordering from this site and I'm extremely impressed. The products arrived earlier than expected and exactly as described.",
                'rating' => 5,
                'image' => 'https://randomuser.me/api/portraits/women/44.jpg',
                'is_approved' => true,
            ],
            [
                'name' => 'Michael Brown',
                'review' => "As someone who's picky about electronics, I can confidently say this store offers the best selection at competitive prices. Their product knowledge is impressive!",
                'rating' => 5,
                'image' => 'https://randomuser.me/api/portraits/men/22.jpg',
                'is_approved' => true,
            ],
            [
                'name' => 'Sarah Davis',
                'review' => "The clothing selection is trendy and high-quality. I receive compliments every time I wear something I've purchased from this store.",
                'rating' => 5,
                'image' => 'https://randomuser.me/api/portraits/women/17.jpg',
                'is_approved' => true,
            ],
            [
                'name' => 'David Wilson',
                'review' => "The home & kitchen section is a treasure trove for decorators like me. I always find unique items that my clients love.",
                'rating' => 5,
                'image' => 'https://randomuser.me/api/portraits/men/41.jpg',
                'is_approved' => true,
            ],
        ];

        foreach ($testimonials as $testimonial) {
            testimonials::create($testimonial);
        }
    }
}
