
# 🛒 Simple Store with Laravel Breeze, Inertia, React + TypeScript

Project ini dibuat oleh **Natz** sebagai toko sederhana berbasis web. Fitur utama dari project ini adalah **CRUD Produk** dan opsi untuk melakukan pembelian melalui **tautan WhatsApp**.



## 🚀 Tech Stack

- [Laravel](https://laravel.com/) - Backend & Routing
- [Laravel Breeze](https://laravel.com/docs/starter-kits#breeze) - Auth Starter Kit
- [Inertia.js](https://inertiajs.com/) - Bridge antara Laravel dan React
- [React (TypeScript)](https://reactjs.org/) - Frontend Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS Framework



## ⚙️ How to Install

```bash
# Clone project
git clone https://github.com/username/nama-project.git
cd nama-project

# Install dependencies
composer install
npm install

# Copy .env
cp .env.example .env

# Generate key
php artisan key:generate

# Migrate database
php artisan migrate

# Run dev server
npm run dev
php artisan serve
````

---

## 📦 Fitur

* CRUD Produk (Create, Read, Update, Delete)
* Integrasi WhatsApp untuk pembelian cepat
* UI responsif menggunakan Tailwind CSS
* Authentikasi menggunakan Laravel Breeze

---

## 📄 License

Project ini menggunakan lisensi **MIT**. Silakan gunakan, modifikasi, atau distribusikan sesuai kebutuhan.

---

## 📝 Keterangan Tambahan

* Kamu dapat mengkustomisasi link WhatsApp untuk produk di bagian frontend.
* Belum ada fitur keranjang atau pembayaran otomatis, karena konsepnya adalah toko sederhana dengan komunikasi via WhatsApp.
* Project ini cocok untuk pembelajaran Laravel + React + Inertia, atau untuk toko kecil-kecilan berbasis web.

---

> Feel free to fork or contribute!
> Dibuat dengan ❤️ oleh Natz

```
