<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // ─── Create Admin User ─────
        User::create([
            'name' => 'Admin Profile',
            'email' => 'admin@glownova.com',
            'password' => \Illuminate\Support\Facades\Hash::make('admin123'),
            'is_admin' => true,
        ]);

        // ─── Create Categories ─────
        $categories = [
            ['name' => 'Skincare', 'slug' => 'skincare', 'description' => 'Premium facial treatments and body care.'],
            ['name' => 'Makeup', 'slug' => 'makeup', 'description' => 'Professional cosmetics for eyes, lips, and face.'],
            ['name' => 'Haircare', 'slug' => 'haircare', 'description' => 'Nourishing shampoos, conditioners, and styling.'],
            ['name' => 'Fragrance', 'slug' => 'fragrance', 'description' => 'Elegant perfumes and luxury colognes.'],
        ];

        foreach ($categories as $cat) {
            \App\Models\Category::create($cat);
        }

        // ─── Create Products ─────
        $skincareId = \App\Models\Category::where('slug', 'skincare')->first()->id;
        $makeupId = \App\Models\Category::where('slug', 'makeup')->first()->id;

        \App\Models\Product::create([
            'name' => 'Luminous Silk Foundation',
            'slug' => 'luminous-silk-foundation',
            'description' => 'A lightweight, liquid foundation that provides a luminous finish.',
            'price' => 64.00,
            'stock_quantity' => 50,
            'brand' => 'GlowNova',
            'category_id' => $makeupId,
            'is_featured' => true,
        ]);

        \App\Models\Product::create([
            'name' => 'Hydrating Night Cream',
            'slug' => 'hydrating-night-cream',
            'description' => 'Intensive moisturizing cream for overnight skin repair.',
            'price' => 45.50,
            'stock_quantity' => 30,
            'brand' => 'GlowNova',
            'category_id' => $skincareId,
            'is_featured' => true,
        ]);

        \App\Models\Product::create([
            'name' => 'Rosewater Facial Mist',
            'slug' => 'rosewater-mist',
            'description' => 'Refreshing and soothing facial mist with pure rose extract.',
            'price' => 18.00,
            'stock_quantity' => 100,
            'brand' => 'NaturePure',
            'category_id' => $skincareId,
            'is_featured' => false,
        ]);

        // ─── Create Coupon ─────
        \App\Models\Coupon::create([
            'code' => 'WELCOME10',
            'type' => 'percentage',
            'value' => 10,
            'min_order_amount' => 50,
            'is_active' => true,
        ]);
    }
}
