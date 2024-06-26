﻿# Lunch Menu Management System

## Overview
The Lunch Menu Management System is a web application designed to streamline the management of lunch menus for employees and administrators. Administrators can manage employees and menus, while employees can view and select their lunch options.

## Technologies Used
- **Frontend**: 
  - React
  - React Router
  - Axios
  - Bootstrap

- **Backend**: 
  - Express
  - Node.js
  - JWT (JSON Web Tokens)
  - Bcrypt

- **Database**: 
  - PostgreSQL

## Features
- **Admin Login**: Secure authentication for administrators to manage the system.
- **Employee Login**: Secure authentication for employees to view and select lunch menus.
- **Admin Dashboard**: Interface for managing employees, viewing profiles, and adding/editing menus.
- **Menu Viewing**: Employees can view the lunch menu for each day.
- **Menu Selection**: Employees can select their lunch choices. [Working On it.]
- **Protected Routes**: Access control for certain routes based on user roles and authentication status.

## Database Schema
### Users Table
| Column    | Type       | Constraints     |
|-----------|------------|-----------------|
| id        | SERIAL     | PRIMARY KEY     |
| username  | VARCHAR    | NOT NULL        |
| password  | VARCHAR    | NOT NULL        |
| role      | VARCHAR    | NOT NULL        |

### Menus Table
| Column | Type       | Constraints     |
|--------|------------|-----------------|
| id     | SERIAL     | PRIMARY KEY     |
| days   | VARCHAR    | NOT NULL        |
| option | VARCHAR    | NOT NULL        |

## Setup Instructions

### Backend Setup
1. **Clone the repository**:
   ```sh
   git clone https://github.com/Rahim-aust/Office-Lunch-Menu-Management.git
   cd lunch-menu-management/server
2. **Install Dependencies and Packages**:
    ```sh
    npm init -y
    npm install express cors body-parser pg pg-hstore jsonwebtoken bcrypt nodemon
3. **Database Setup**:
    Download postgreSQL and SetUp
    Create a new database named "lunch_menu_db"
    ```sql
    CREATE TABLE "Users" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
    );

    CREATE TABLE "Menus" (
    id SERIAL PRIMARY KEY,
    days VARCHAR(25) NOT NULL,
    option VARCHAR(255) NOT NULL
    );
4. **Run the backend Server**:
    ```sh
    npm start


### Frontend Setup

1. **Navigate to the frontend directory**:
    ```sh
    cd frontend
2. **Install Dependencies and Packages**:
    ```sh
    npm install
    npm install axios bootstrap
3. **Run The frontend**:
    ```sh
    npm run dev
