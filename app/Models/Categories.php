<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categories extends Model
{
    /** @use HasFactory<\Database\Factories\CategoriesFactory> */
    use HasFactory;
    protected $fillable = ['name', 'slug', 'status'];

    // Relationship with Products
    public function products()
    {
        return $this->hasMany(Product::class, 'category_id');
    }
}
