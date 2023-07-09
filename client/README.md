# Task Management App
> Client

## Table of Contents

- [General Info](#general-information)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Setup](#setup)

## General Information

The Task Manager App is a web application built with Angular that allows users to manage tasks.
- The application consists of three views: Task List View, Task Detail View, and Task Creation View. The Task List View displays a list of all tasks, showing the task name, description, priority, and status. Users can click on a task to view its details where they can also edit or delete the task. The Task Creation View enables users to create new tasks by providing a name, description, priority, and status.

## Technologies Used

 - Angular - version 16.1.0
 - Angular Material
 - RxJS

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.0.

## Features

1. Task List View: Displays a list of all tasks, showing task name, description, priority, and status.
 - Task Detail View: Shows the details of a selected task, including task name, description, priority, and status. Users can edit or delete the task from this view.
 - Task Creation View: Allows users to create a new task by providing a name, description, priority, and status using Reactive Forms for input validation and data binding.
  - Angular Services: Implements Angular Services to handle CRUD operations (Create, Read, Update, Delete) on the task list.
 - Angular Material: Incorporates Angular Material components to provide a user-friendly interface.
  - Observables and RxJS: Uses  to handle asynchronous operations.
 - Authentication and Authorization: Implements authentication and authorization to restrict access to certain views and APIs. Auth Guard: checks if the authenticated user has the necessary role to access a particular view or perform a specific action. If the user lacks the required role, redirect them to Login page.
 - Custom Directive: Includes a custom directive to highlight the priority of a task, and highlight searched term in the task list view.

Setup

In orded to run this project first clone this repository with following command:
1. Clone this repository by running the following command:

     ```bash
   git clone https://github.com/Sliskovic/TaskManagement

2. Navigate to the project's directory:
   
     ```bash
   cd client


3. Install the project dependencies with the following commands:
     ```bash
     npm install

4.  Run server (view Server Readme)

5.  Run Client
     ```bash
    npm run start
