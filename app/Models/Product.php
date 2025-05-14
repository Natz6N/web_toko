<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;
      protected $fillable = [
        'name', 'slug', 'price', 'stock', 'description', 'image'
    ];

    protected $appends = ['image_url', 'whatsapp_link'];

    // Aksesor untuk URL gambar
    public function getImageUrlAttribute()
    {
        if (!$this->image) {
            return null;
        }

        return Storage::disk('public')->url($this->image);
    }

    // Aksesor untuk membuat tautan WhatsApp pemesanan
    public function getWhatsappLinkAttribute()
    {
        $phone = env('ADMIN_PHONE_NUMBER', '6281234567890');
        $message = "Halo, saya tertarik dengan produk \"{$this->name}\".";
        return "https://api.whatsapp.com/send?phone={$phone}&text=" . urlencode($message);
    }
}
