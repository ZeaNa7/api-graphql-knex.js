## Description

This is an Graphql API built with Node.js and Express.js that uses the ORM Knex.js to interact with a MariaDB database (local Docker).

## Installation

1. Clone this repo
2. Run `npm install`
3. Create a `.env` file in the root directory and add the following variables:
    - `DB_HOST`
    - `DB_USER`
    - `DB_PASSWORD`
    - `DB_NAME` 
    - `DB_PORT`
4. Run `npm start` to start the server

## Usage

This API is used to interact with a MariaDB database. It can be used to create, read, update, and delete data from the database.
Use localhost:3000 as the base URL for all requests.
