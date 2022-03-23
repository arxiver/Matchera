Matchera
=============
Fully integrated website, Match Reservation System
Document is attached as pdf file. "requirements.pdf"
![matchera demo3](https://user-images.githubusercontent.com/39674365/159631955-57ecaa46-3634-4578-9c85-999a273b849d.gif)
![matchera demo2](https://user-images.githubusercontent.com/39674365/159631894-4db6b521-b989-4b23-8fbd-3c75efae71af.gif)

## How to run locally 
- Recommended xampp 7.4.13 / PHP 7.4.13 (contains)
    - PHP
    - MySQL
- Composer
- NPM

1. Start MySQL service besides Apache service at XAMPP installed
2. Go to PhpMyAdmin and make a new db e.g. called `laravel`
3. Clone this repo and go ahead to its directory
4. Make .env file using the terminal/cmd
    1. Windows copy .env.example .env, Linux cp .env.example .env
    2. Configure the database name as you made at PhpMyAdmin
5. Run the following commands
    - `composer install`
    - `php artisan key generate`
    - `php artisan jwt:secret`
    - `php artisan migrate --seed`
    - `npm install`
    - `npm run dev`
    - `php artisan serve`
6. Go to http://localhost:8000 and Have fun!

Backend services are created as an API 
The system has many types of users, each one of them has its own functions, like the following

* Adminstrator
    * Approve new users as an authority.
    * Remove an existing user.

* Managers
    * Create a new match event
    * Edit the details of an existing match.
    * Add a new stadium.
    * View match details
    * View vacant/reserved seats for each match.

* Customers (Fans):
    * Edit their data.
    * View matches details
    * Reserve vacant seat(s) in future matches.
    * Cancel a reservation

* Guest
    * Register a new account.
    * Sign in as an existing account
    * View matches details


## API Documentation
You can see the API documentation by just clicking [here](https://docs0.herokuapp.com/#introduction)

## Built with 
- Backend
    * [PHP]()
    * [Laravel]()
    * [MySQL]()
- Frontend
    * [ReactJS]()
    * [MaterialUI]()

## Development and support 
If you have any questions on how to use this website, or have ideas for future development, 
please send me an e-mail to sofyan1020@gmail.com, rrrokhtar@gmail.com or kindly make any pull requests


## Authors
* [Sofyan Mahmoud](https://github.com/sofyanmahmoud0000)
* [Mohamed Mokhtar]()
* [Khaled Amgad]()
