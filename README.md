## Laravel

Created using Laravel 8

## API

| Verb  | URI       |
|-------|:---------:|
| POST  | /login    |
| GET   | /logout   |
| GET   | /user     |
| PATCH | /password |

## Dev Installation

1. Clone the repository
1. Setup mysql database by modifying .env file
1. Generate app encryption key by entering **php artisan key:generate** in terminal
1. Create database tables by entering **php artisan migrate** in terminal
1. Create default user by entering **php artisan db:seed** in terminal
1. Generate passport keys for the API to work by entering **php artisan passport:keys** in terminal
1. Generate personal passport client for the API to work by entering **php artisan passport:client --personal** in terminal
1. Install php dependency by entering **composer install** in terminal
1. Install javascript dependency by entering **npm install** in terminal

## Running 
1. Run backend API by entering **php artisan serve** in terminal (default url: http://127.0.0.1:8000)
1. Run frontend by entering **npm run watch** in terminal (default url: http://localhost:3000/)

## Default User Credential
Email: sampleuser@gmail.com  
Password: password

## Frontend

The frontend is created using React. Upon logging in the system saved the access_token in sessionStorage. Authentication thru backend needs an Authorization Bearer token.
