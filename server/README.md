# Project Name

> Server

## Table of Contents

- [General Info](#general-information)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Setup](#setup)

## General Information

- The Server is a backend application that provides authentication, user and task management.
- The application allows users to sign up and log in securely using authentication tokens (JWT) and manage tasks.
- The app uses NestJS as the backend framework and PostgreSQL as the database.

## Technologies Used

- NestJS
- TypeORM
- ESLint
- Nodemailer
- Axios
- JWT
- bycript

## Features

- Authentication: Implements user authentication using JWT (JSON Web Tokens) for managing user sessions and securing the endpoints.
- User: Enables users to create accounts and store in a model that includes unique email, hashed password, first name, last name and date.
- Task: Enables users to create tasks and store in a model that includes unique name, description, status, actions.
- Error Handling: Implements error handling mechanisms to handle exceptions and provide informative error messages to users. Handles validation errors, authentication failures, and other potential errors that may occur during application execution.
- Testing: Includes some test suite to verify the functionality and integrity of the application.

## Setup

In orded to run this project first clone this repository with following command:

1.  Clone this repository by running the following command:

    ```bash
    git clone https://github.com/Sliskovic/TaskManagement

    ```
2.  Navigate to the project's directory:

    ```bash
    cd Server

    ```
3.  Create a .env file in the root directory of the project.
    Fill in the .env file with the required configuration data and secrets. For example: [^.env]
    [^.env]:
     ```bash
        # APPLICATION
        APP_PORT=3000
        NODE_ENV=development
        
        # DATABASE
        DB_USER=postgres
        DB_PASSWORD=postgres
        DB_NAME=postgres
        DB_HOST=db
        DB_PORT=5432
        POSTGRES_PASSWORD=postgres
        
        # JWT
        JWT_SECRET=secret
        JWT_EXP=1h

5.  Install the project dependencies with the following commands:

    ```bash
    npm install

    ```

6.  Before starting the application, create a Docker volume for PostgreSQL data by executing the following command:

    ```bash
    docker volume create pgdata

    ```

7.  Run the project using Docker Compose. Start the containers by running the following command: \*\*docker installed

    ```bash
    docker-compose up --build

    ```

8.  Once the application is up and running, you can access it by opening your web browser and visiting the following URLs:
    - NestJS application: http://localhost:3000
    - Adminer (database management tool): http://localhost:8080
