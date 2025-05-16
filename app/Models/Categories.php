<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Categories extends Model
{
    /** @use HasFactory<\Database\Factories\CategoriesFactory> */
    use HasFactory;
    protected $fillable = ['name', 'slug', 'status', 'description', 'parent_id'];

    // Relationship with Products
    public function products()
    {
        return $this->hasMany(Product::class, 'category_id');
    }

    // Relationship with parent category
    public function parent()
    {
        return $this->belongsTo(Categories::class, 'parent_id');
    }

    // Relationship with child categories
    public function children()
    {
        return $this->hasMany(Categories::class, 'parent_id');
    }
}
