<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class banners extends Model
{
    /** @use HasFactory<\Database\Factories\BannersFactory> */
    use HasFactory;
    protected $fillable = ['title', 'description', 'image', 'is_active'];

}
