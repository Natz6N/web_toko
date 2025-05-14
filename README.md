# Laravel E-commerce Admin Dashboard

A modern e-commerce admin dashboard built with Laravel and React.

## Features

- Product management with image uploads
- Category management
- Admin dashboard with statistics
- Beautiful UI built with React and Tailwind CSS

## Setup Instructions

1. Clone the repository
```bash
git clone https://github.com/yourusername/ecommerce-admin.git
cd ecommerce-admin
```

2. Install PHP dependencies
```bash
composer install
```

3. Install JavaScript dependencies
```bash
npm install
```

4. Create `.env` file
```bash
cp .env.example .env
```

5. Generate application key
```bash
php artisan key:generate
```

6. Set up database in `.env` file
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ecommerce_admin
DB_USERNAME=root
DB_PASSWORD=
```

7. Run migrations and seed the database
```bash
php artisan migrate --seed
```

8. Create symbolic link for storage
```bash
php artisan storage:link
```

9. Build assets
```bash
npm run build
```

10. Start the development server
```bash
php artisan serve
```

## File Upload Configuration

The application is configured to store uploaded files in the `storage/app/public` directory. The `storage:link` command creates a symbolic link from `public/storage` to `storage/app/public`, making the files accessible from the web.

If you're experiencing issues with file uploads, please check:

1. The `storage:link` command has been run
2. The storage directory permissions are set correctly
3. The disk configuration in `config/filesystems.php` is correctly set to use the `public` disk

## Development

For development, you can use:

```bash
# Run the Laravel server
php artisan serve

# Watch for front-end changes
npm run dev
```

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT). 
