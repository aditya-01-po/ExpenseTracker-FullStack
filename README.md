# 💰 Expense Tracker Full Stack Application

A full-stack Expense Management System built using **Angular**, **ASP.NET Core Web API**, **Entity Framework Core**, **SQL Server LocalDB**, and **JWT Authentication**.

The application allows users to securely register, log in, and manage their personal financial transactions while ensuring that users can only access, update, and delete their own data.

---

# 🚀 Features

## Authentication & Authorization

- User Registration
- User Login
- Password Hashing using ASP.NET Core Identity PasswordHasher
- JWT Token Generation
- JWT Token Validation
- Route Guards
- HTTP Interceptors
- Token Expiry Validation
- Auto Logout on Token Expiry
- User-Specific Data Isolation
- Protected API Endpoints

---

## Transaction Management

- Create Transaction
- View Transactions
- Edit Transaction
- Delete Transaction
- Categorize Transactions
- Income & Expense Tracking
- Dashboard Summary Cards
- User Ownership Validation

---

## Dashboard

- Total Income
- Total Expenses
- Net Balance
- Transaction Count
- Dynamic UI Updates

---

# 🛠️ Technology Stack

## Frontend

- Angular
- TypeScript
- RxJS
- Bootstrap
- Reactive Forms

## Backend

- ASP.NET Core Web API
- C#
- Entity Framework Core
- LINQ
- Dependency Injection

## Database

- SQL Server LocalDB

## Security

- JWT Authentication
- ASP.NET PasswordHasher
- Claims-Based Authentication
- Authorization Filters

---

# 📂 Project Structure

```text
Expense-FullStack
│
├── Expenses.API
│   ├── Controllers
│   ├── Models
│   ├── DTOs
│   ├── Services
│   ├── Data
│   ├── Program.cs
│   └── appsettings.json
│
└── Expense.Client
    ├── src
    │   ├── app
    │   │   ├── components
    │   │   ├── services
    │   │   ├── guards
    │   │   ├── interceptors
    │   │   └── models
    │   └── assets
    │
    ├── angular.json
    └── package.json
```
