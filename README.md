# Expense Tracker Full-Stack Application

A secure full-stack expense management application built with Angular, ASP.NET Core Web API, Entity Framework Core, SQL Server LocalDB, and JWT-based authentication.

The application allows users to register, sign in, and manage their own income and expense transactions. Every transaction is associated with the authenticated user, ensuring users cannot view, update, or delete transactions belonging to another account.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Key Features](#key-features)
3. [Technology Stack](#technology-stack)
4. [High-Level Architecture](#high-level-architecture)
5. [Project Structure](#project-structure)
6. [Backend Architecture](#backend-architecture)
7. [Frontend Architecture](#frontend-architecture)
8. [Database Design](#database-design)
9. [Entity Relationships](#entity-relationships)
10. [Authentication Flow](#authentication-flow)
11. [JWT Authentication](#jwt-authentication)
12. [Claims-Based Identity](#claims-based-identity)
13. [Authorization and User Ownership](#authorization-and-user-ownership)
14. [Password Security](#password-security)
15. [Angular Authentication Flow](#angular-authentication-flow)
16. [Angular Concepts Used](#angular-concepts-used)
17. [ASP.NET Core Concepts Used](#aspnet-core-concepts-used)
18. [Complete Request Flow](#complete-request-flow)
19. [API Endpoints](#api-endpoints)
20. [Configuration](#configuration)
21. [Running the Application](#running-the-application)
22. [Security Considerations](#security-considerations)
23. [Implemented Best Practices](#implemented-best-practices)
24. [Known Limitations](#known-limitations)
25. [Future Enhancements](#future-enhancements)
26. [Learning Outcomes](#learning-outcomes)
27. [Author](#author)

---

## Project Overview

Expense Tracker is a learning-focused full-stack application demonstrating how an Angular single-page application communicates with an ASP.NET Core Web API.

The project covers the complete application flow:

```text
Angular UI
    ↓
Angular Components
    ↓
Angular Services
    ↓
HTTP Interceptor
    ↓
ASP.NET Core Controllers
    ↓
Service Layer
    ↓
Entity Framework Core
    ↓
SQL Server LocalDB
```

The project demonstrates:

- Frontend and backend separation
- REST API communication
- JWT authentication
- Claims-based identity
- User-specific authorization
- Entity Framework Core database access
- Reactive forms and validation
- Angular route guards and HTTP interceptors
- Dependency Injection on both frontend and backend
- Secure password hashing
- CRUD operations with ownership validation

---

## Key Features

### Authentication

- User registration
- User login
- Secure password hashing
- Password verification during login
- JWT generation after registration or login
- Configurable token expiration
- Client-side token expiration check
- Automatic logout after token expiry
- Automatic logout after a `401 Unauthorized` API response

### Authorization

- Protected transaction endpoints using `[Authorize]`
- Protected Angular routes using an authentication guard
- Current user identification through JWT claims
- User-specific transaction filtering
- Ownership validation before reading, updating, or deleting a transaction

### Transaction Management

- Create income and expense transactions
- View all transactions belonging to the logged-in user
- View transaction details
- Edit an existing transaction
- Delete a transaction
- Select separate categories for income and expense
- Reuse one form component for both create and edit operations

### Dashboard

- Display transaction count
- Calculate total income
- Calculate total expenses
- Calculate net balance
- Dynamically style positive and negative balances
- Format values using Angular currency and date pipes

### User Experience

- Client-side form validation
- Login and signup validation messages
- Password confirmation validation
- Unauthorized transaction error messages
- Navigation back to the transaction list
- Conditional header buttons based on authentication state

---

## Technology Stack

### Frontend

| Technology | Purpose |
| --- | --- |
| Angular | Frontend framework and SPA development |
| TypeScript | Strongly typed frontend application logic |
| RxJS | Observable-based asynchronous programming |
| Angular Router | Client-side navigation |
| Reactive Forms | Form creation, validation, and state management |
| HttpClient | Communication with the ASP.NET Core API |
| Bootstrap | Responsive styling and layout |
| Local Storage | Storage of the JWT access token |

### Backend

| Technology | Purpose |
| --- | --- |
| ASP.NET Core Web API | REST API implementation |
| C# | Backend programming language |
| Entity Framework Core | Object-relational mapping and database access |
| LINQ | Strongly typed database queries |
| SQL Server LocalDB | Local relational database |
| JWT Bearer Authentication | API authentication |
| PasswordHasher | User password hashing and verification |
| Dependency Injection | Service creation and lifetime management |
| Swagger/OpenAPI | API documentation and endpoint testing |

---

## High-Level Architecture

```text
┌───────────────────────────────────┐
│          Angular Browser UI       │
│ Login, Signup, List, Add, Edit    │
└─────────────────┬─────────────────┘
                  │
                  ▼
┌───────────────────────────────────┐
│        Angular Components         │
│ UI State and User Interaction     │
└─────────────────┬─────────────────┘
                  │
                  ▼
┌───────────────────────────────────┐
│         Angular Services          │
│ Auth Service / Transaction Service│
└─────────────────┬─────────────────┘
                  │
                  ▼
┌───────────────────────────────────┐
│          HTTP Interceptor         │
│ Adds Authorization Bearer Token   │
└─────────────────┬─────────────────┘
                  │ HTTPS / JSON
                  ▼
┌───────────────────────────────────┐
│       ASP.NET Core Middleware     │
│ CORS, Authentication, Authorization│
└─────────────────┬─────────────────┘
                  │
                  ▼
┌───────────────────────────────────┐
│             Controllers           │
│ AuthController / Transactions     │
└─────────────────┬─────────────────┘
                  │
                  ▼
┌───────────────────────────────────┐
│            Service Layer          │
│ Business and Ownership Logic      │
└─────────────────┬─────────────────┘
                  │
                  ▼
┌───────────────────────────────────┐
│        Entity Framework Core      │
│ DbContext, DbSet, LINQ, Tracking  │
└─────────────────┬─────────────────┘
                  │
                  ▼
┌───────────────────────────────────┐
│         SQL Server LocalDB        │
│ Users and Transactions Tables     │
└───────────────────────────────────┘
```

---

## Project Structure

```text
Expense-FullStack/
│
├── README.md
├── .gitignore
│
├── Expenses.API/
│   ├── Controllers/
│   │   ├── AuthController.cs
│   │   └── TransactionsController.cs
│   │
│   ├── Data/
│   │   ├── AppDbContext.cs
│   │   └── Services/
│   │       └── TransactionService.cs
│   │
│   ├── Dtos/
│   │   ├── LoginUserDto.cs
│   │   ├── PostUserDto.cs
│   │   ├── PostTransactionDto.cs
│   │   └── PutTransactionDto.cs
│   │
│   ├── Models/
│   │   ├── BaseEntity.cs
│   │   ├── User.cs
│   │   └── Transaction.cs
│   │
│   ├── Program.cs
│   ├── appsettings.json
│   └── Expenses.API.csproj
│
└── Expense.Client/
    ├── src/
    │   └── app/
    │       ├── components/
    │       │   ├── header/
    │       │   ├── footer/
    │       │   ├── login/
    │       │   ├── signup/
    │       │   ├── transaction-list/
    │       │   └── transaction-form/
    │       │
    │       ├── guards/
    │       │   └── auth.guard.ts
    │       │
    │       ├── interceptors/
    │       │   └── auth.interceptor.ts
    │       │
    │       ├── models/
    │       │   ├── transaction.ts
    │       │   ├── user.ts
    │       │   └── auth-response.ts
    │       │
    │       ├── services/
    │       │   ├── auth.ts
    │       │   └── transaction.service.ts
    │       │
    │       ├── app.config.ts
    │       ├── app.routes.ts
    │       └── app.ts
    │
    ├── angular.json
    ├── package.json
    └── package-lock.json
```

The exact paths may differ slightly depending on the local project organization.

---

## Backend Architecture

### Models and Entities

Backend model classes represent the data stored in the database.

#### BaseEntity

```csharp
public class BaseEntity
{
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
```

`BaseEntity` contains fields shared by multiple entities and follows the DRY principle.

#### User

```csharp
public class User : BaseEntity
{
    public string Email { get; set; }
    public string Password { get; set; }
    public List<Transaction> Transactions { get; set; }
}
```

A user can own multiple transactions.

#### Transaction

```csharp
public class Transaction : BaseEntity
{
    public string Type { get; set; }
    public double Amount { get; set; }
    public string Category { get; set; }
    public int? UserId { get; set; }
    public virtual User? User { get; set; }
}
```

`UserId` is the foreign key connecting a transaction to its owner.

### DTOs

DTO stands for Data Transfer Object.

DTOs define the data accepted or returned by API operations without exposing complete database entities.

Examples:

- `PostTransactionDto`: fields allowed during transaction creation
- `PutTransactionDto`: fields allowed during transaction update
- `PostUserDto`: registration data
- `LoginUserDto`: login credentials

DTO benefits include:

- Preventing over-posting
- Hiding internal fields
- Separating API contracts from database models
- Allowing different inputs for create and update operations
- Improving validation and maintainability

### DbContext

```csharp
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Transaction> Transactions { get; set; }
}
```

`AppDbContext` acts as the bridge between C# entities and SQL Server.

It is responsible for:

- Querying records
- Adding records
- Tracking changes
- Updating records
- Deleting records
- Translating LINQ expressions into SQL
- Managing entity relationships

### Service Layer

The service layer contains transaction-related database and business logic.

```text
Controller
    ↓
ITransactionService
    ↓
TransactionService
    ↓
AppDbContext
```

The interface defines the contract, while the implementation defines how each operation works.

Benefits:

- Separation of concerns
- Loose coupling
- Easier unit testing
- Cleaner controllers
- Centralized ownership rules

### Dependency Injection

ASP.NET Core Dependency Injection creates and supplies required objects.

Example:

```csharp
builder.Services.AddScoped<ITransactionService, TransactionService>();
```

`Scoped` means one service instance is created per HTTP request.

Primary service lifetimes:

- `Transient`: a new instance for every resolution
- `Scoped`: one instance per HTTP request
- `Singleton`: one instance for the application lifetime

`DbContext` and database-dependent services should normally be scoped.

---

## Frontend Architecture

```text
Angular Component
       ↓
Angular Service
       ↓
HttpClient
       ↓
Auth Interceptor
       ↓
ASP.NET Core API
```

### Components

Components manage screen state, templates, and user interactions.

Main components:

- `Login`
- `Signup`
- `Header`
- `Footer`
- `TransactionList`
- `TransactionForm`

### Services

Services centralize API communication and shared functionality.

#### Auth Service

Responsibilities:

- Login API calls
- Registration API calls
- JWT storage
- Authentication-state management
- Token retrieval
- Token-expiration checks
- Logout and navigation

#### Transaction Service

Responsibilities:

- Get all transactions
- Get one transaction
- Create a transaction
- Update a transaction
- Delete a transaction

### Guard

The authentication guard prevents unauthenticated navigation to protected routes.

Protected routes include:

```text
/transactions
/add
/edit/:id
```

### Interceptor

The interceptor retrieves the JWT from the Auth service and adds it to outgoing API requests:

```http
Authorization: Bearer <token>
```

It can also detect a `401 Unauthorized` response and log the user out.

---

## Database Design

### Users Table

| Column | Suggested Type | Description |
| --- | --- | --- |
| Id | int | Primary key |
| Email | nvarchar | User email address |
| Password | nvarchar | Hashed password |
| CreatedAt | datetime2 | Creation timestamp |
| UpdatedAt | datetime2 | Last update timestamp |

### Transactions Table

| Column | Suggested Type | Description |
| --- | --- | --- |
| Id | int | Primary key |
| Type | nvarchar | Income or Expense |
| Amount | decimal | Transaction amount |
| Category | nvarchar | Transaction category |
| CreatedAt | datetime2 | Transaction creation date |
| UpdatedAt | datetime2 | Last update timestamp |
| UserId | int | Foreign key to Users |

For financial applications, `decimal` is preferred over `double` because it is more appropriate for precise monetary calculations.

---

## Entity Relationships

The project uses a one-to-many relationship:

```text
User 1 ──────────────── * Transactions
```

One user can have many transactions, while each transaction belongs to one user.

```text
Users
┌──────────────┐
│ Id           │◄──────────┐
│ Email        │           │
│ Password     │           │
└──────────────┘           │
                           │ Foreign Key
Transactions               │
┌──────────────┐           │
│ Id           │           │
│ Type         │           │
│ Amount       │           │
│ Category     │           │
│ UserId       │───────────┘
└──────────────┘
```

The relationship is represented through:

```csharp
public int? UserId { get; set; }
public virtual User? User { get; set; }
```

and:

```csharp
public List<Transaction> Transactions { get; set; }
```

---

## Authentication Flow

### Registration

```text
User enters email and password
              ↓
Angular validates the form
              ↓
Auth service sends POST /api/Auth/Register
              ↓
Backend checks whether email already exists
              ↓
PasswordHasher hashes the password
              ↓
User record is saved
              ↓
JWT is generated
              ↓
JWT is returned to Angular
              ↓
Angular stores the token
              ↓
User is redirected to /transactions
```

### Login

```text
User enters credentials
            ↓
Angular validates the form
            ↓
Auth service sends POST /api/Auth/Login
            ↓
Backend finds user by email
            ↓
Stored hash is compared with supplied password
            ↓
JWT is generated after successful verification
            ↓
Token is returned and stored
            ↓
Authentication state is updated
            ↓
User is redirected to /transactions
```

---

## JWT Authentication

JWT stands for JSON Web Token.

A JWT acts as a signed container that carries claims about the authenticated user.

A token contains three logical parts:

```text
Header.Payload.Signature
```

Example claims:

```json
{
  "nameid": "5",
  "email": "user@example.com",
  "exp": 1780000000,
  "iss": "ExpenseTrackerAPI",
  "aud": "ExpenseTrackerClient"
}
```

JWTs are signed, not necessarily encrypted. The payload can be decoded, but any modification invalidates the signature unless the attacker knows the server-side signing key.

### Token Generation

The backend creates claims:

```csharp
var claims = new[]
{
    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
    new Claim(ClaimTypes.Email, user.Email)
};
```

The token is signed with a server-side key using HMAC SHA-256.

### Token Validation

The API validates:

```csharp
ValidateIssuer = true;
ValidateAudience = true;
ValidateLifetime = true;
ValidateIssuerSigningKey = true;
```

It also uses:

```csharp
ClockSkew = TimeSpan.Zero;
```

so expiration is enforced without the default grace period.

---

## Claims-Based Identity

A claim is a key-value fact about the authenticated user.

Examples:

```text
NameIdentifier = 5
Email = user@example.com
Role = User
```

After JWT validation, ASP.NET Core creates a `ClaimsPrincipal` and exposes it as `User` inside controllers.

The current user ID is retrieved using:

```csharp
User.FindFirst(ClaimTypes.NameIdentifier)?.Value
```

The claim value is converted to an integer and passed to the service layer.

JWT and claims are related as follows:

```text
JWT = Signed container
Claims = User information inside the container
ClaimsPrincipal = ASP.NET Core object created from validated claims
```

---

## Authorization and User Ownership

Authentication answers:

```text
Who is the user?
```

Authorization answers:

```text
What is the user allowed to do?
```

Transaction endpoints are protected using:

```csharp
[Authorize]
```

The backend does not trust a user ID sent from Angular. Instead, it retrieves the authenticated user ID from the validated JWT claim.

### Creating a Transaction

```text
JWT NameIdentifier claim
          ↓
Controller extracts UserId
          ↓
Service assigns Transaction.UserId
          ↓
Transaction saved with ownership
```

### Reading, Updating, and Deleting

Every sensitive query matches both the requested transaction and authenticated user:

```csharp
t.Id == id && t.UserId == userId
```

This protects against insecure direct object reference attempts where a user manually changes the transaction ID in a URL.

If no matching transaction is found, the API returns an error message such as:

```text
Transaction not found or does not belong to the user.
```

The Angular form displays this message and hides the editable form.

---

## Password Security

User passwords and JWT signing keys are different concepts.

### User Password

- Supplied during registration and login
- Hashed before storage
- Never stored as plain text
- Verified using the stored hash

### JWT Signing Key

- Server-owned secret
- Used to sign and validate JWTs
- Never sent to the browser
- Should not be committed to Git

### Registration Hashing

```csharp
var hashedPassword = passwordHasher.HashPassword(
    null,
    user.Password
);
```

### Login Verification

```csharp
var result = passwordHasher.VerifyHashedPassword(
    user,
    user.Password,
    payload.Password
);
```

The same password can produce different hash strings because password hashing uses a random salt.

---

## Angular Authentication Flow

```text
AuthController returns JWT
           ↓
Auth service receives response
           ↓
RxJS tap() stores token
           ↓
BehaviorSubject emits authenticated state
           ↓
Header updates through async pipe
           ↓
Guard allows protected navigation
           ↓
Interceptor adds JWT to API requests
```

### Token Storage

The token is stored using:

```typescript
localStorage.setItem('token', response.token);
```

An expired JWT remains in local storage until application code removes it. Local storage does not understand JWT expiration.

### Expiration Check

The Auth service decodes the token and compares its `exp` claim with the current Unix time.

```typescript
isAuthenticated(): boolean {
  const token = localStorage.getItem('token');

  if (!token) {
    return false;
  }

  try {
    const decodedToken: any = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp <= currentTime) {
      this.logout();
      return false;
    }

    return true;
  } catch {
    this.logout();
    return false;
  }
}
```

### Auto Logout on 401

The HTTP interceptor can catch unauthorized responses and call:

```typescript
authService.logout();
```

This removes the token, updates authentication state, and redirects to Login.

---

## Angular Concepts Used

### Standalone Components

Components import their own required Angular modules and dependencies.

### Root Component

The root component provides the shared application layout:

```text
Header
Router Outlet
Footer
```

`RouterOutlet` renders the component associated with the current route.

### Routing

Routes include:

```text
/login
/signup
/transactions
/add
/edit/:id
```

`edit/:id` uses a route parameter to identify the transaction being edited.

### Route Guard

The authentication guard checks `isAuthenticated()` before allowing navigation to protected pages.

### HttpClient

Angular's `HttpClient` sends GET, POST, PUT, and DELETE requests to the backend.

### HTTP Interceptor

The interceptor automatically adds the bearer token to outgoing requests and can handle `401 Unauthorized` responses globally.

### Reactive Forms

Reactive forms are used for:

- Login
- Signup
- Transaction creation
- Transaction editing

Important types and features:

```typescript
FormGroup
FormBuilder
Validators
formControlName
patchValue()
```

### Custom Validation

The signup form validates that Password and Confirm Password match.

```typescript
return password === confirmPassword
  ? null
  : { passwordMismatch: true };
```

Returning `null` means validation passed.

### Lifecycle Hooks

`OnInit` is the lifecycle interface, while `ngOnInit()` is the method Angular calls after component initialization.

Typical uses:

- Load API data
- Read route parameters
- Initialize component state

### BehaviorSubject

`BehaviorSubject` stores the latest authentication state and emits future changes.

```typescript
private currentUserSubject =
  new BehaviorSubject<string | null>(null);
```

It is exposed as a read-only Observable:

```typescript
currentUser$ = this.currentUserSubject.asObservable();
```

### Observable

An Observable represents asynchronous data that may arrive later.

Examples:

```typescript
Observable<AuthResponse>
Observable<Transaction>
Observable<Transaction[]>
```

### subscribe()

The component subscribes to receive the HTTP result and handle success or failure.

### RxJS pipe()

`pipe()` applies RxJS operators before data reaches the subscriber.

### tap()

`tap()` performs side effects without transforming the response.

Examples:

- Store the JWT
- Update authentication state
- Log information

### Async Pipe

The Angular `async` pipe automatically subscribes to an Observable, renders its latest value, and unsubscribes when the component is destroyed.

### Template Directives

- `*ngIf`: conditionally renders HTML
- `*ngFor`: repeats HTML for array elements
- `[ngClass]`: conditionally applies CSS classes
- `(click)`: handles click events
- `[routerLink]`: performs Angular navigation

### Angular Display Pipes

Angular template pipes format values for display:

```html
{{ amount | currency }}
{{ createdAt | date }}
```

Angular display pipes are different from RxJS `pipe()`.

---

## ASP.NET Core Concepts Used

### Program.cs

`Program.cs` is the backend startup configuration file.

Responsibilities include:

- Registering controllers
- Registering DbContext
- Registering application services
- Configuring CORS
- Configuring JWT authentication
- Enabling Swagger
- Configuring middleware
- Mapping controllers
- Starting the application

### Middleware Pipeline

```text
Request
  ↓
CORS
  ↓
HTTPS Redirection
  ↓
Authentication
  ↓
Authorization
  ↓
Controller Endpoint
```

Authentication must run before authorization:

```csharp
app.UseAuthentication();
app.UseAuthorization();
```

### Attribute Routing

Controller routes combine the controller route and action route.

```csharp
[Route("api/[controller]")]
```

with:

```csharp
[HttpGet("All")]
```

produces:

```text
GET /api/Transactions/All
```

### Model Binding

ASP.NET Core automatically maps:

- Route segments to action parameters
- JSON request bodies to DTO objects
- Claims to the controller's `User` identity

### IActionResult

Controllers return appropriate HTTP results:

- `Ok()` for success
- `BadRequest()` for invalid input
- `Unauthorized()` for missing or invalid authentication
- `NotFound()` when a resource cannot be found
- `NoContent()` for a successful operation with no response body

### Entity Framework Change Tracking

Entities loaded by a DbContext are tracked. After changing their properties, calling `SaveChanges()` generates the required SQL update.

Therefore, an explicit `Update()` call is often unnecessary for an entity loaded by the same context.

### LINQ

Examples:

```csharp
context.Transactions
    .Where(t => t.UserId == userId)
    .ToList();
```

and:

```csharp
context.Transactions.FirstOrDefault(
    t => t.Id == id && t.UserId == userId
);
```

EF Core translates these expressions into SQL.

---

## Complete Request Flow

### Create Transaction

```text
User submits Angular form
          ↓
TransactionForm calls TransactionService.create()
          ↓
HttpClient creates POST request
          ↓
Auth interceptor adds JWT
          ↓
ASP.NET authentication validates JWT
          ↓
TransactionsController receives DTO
          ↓
Controller reads UserId claim
          ↓
TransactionService creates entity
          ↓
AppDbContext tracks new entity
          ↓
SaveChanges() generates INSERT
          ↓
SQL Server stores transaction
          ↓
Created transaction returned to Angular
          ↓
Angular navigates to /transactions
```

### Load Transactions

```text
TransactionList ngOnInit()
          ↓
TransactionService.getAll()
          ↓
GET /api/Transactions/All
          ↓
JWT added and validated
          ↓
Controller obtains current UserId
          ↓
Service filters by UserId
          ↓
Database returns owned transactions
          ↓
Observable emits Transaction[]
          ↓
Component assigns transactions array
          ↓
*ngFor renders table rows
```

### Update Transaction

```text
User navigates to /edit/:id
          ↓
ActivatedRoute reads id
          ↓
Existing transaction is loaded
          ↓
patchValue() fills reactive form
          ↓
User submits changes
          ↓
Backend validates transaction Id and UserId
          ↓
Entity properties are updated
          ↓
SaveChanges() generates UPDATE
```

### Delete Transaction

```text
User confirms deletion
          ↓
DELETE request sent with JWT
          ↓
Backend extracts current UserId
          ↓
Service matches Id and UserId
          ↓
Matching transaction deleted
          ↓
Angular refreshes or filters the list
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description | Authentication |
| --- | --- | --- | --- |
| POST | `/api/Auth/Register` | Register a new user and return a token | Anonymous |
| POST | `/api/Auth/Login` | Authenticate a user and return a token | Anonymous |

The login and registration actions must not require an existing JWT.

### Transactions

| Method | Endpoint | Description | Authentication |
| --- | --- | --- | --- |
| GET | `/api/Transactions/All` | Get current user's transactions | Required |
| GET | `/api/Transactions/Details/{id}` | Get an owned transaction | Required |
| POST | `/api/Transactions/Create` | Create a transaction for current user | Required |
| PUT | `/api/Transactions/Update/{id}` | Update an owned transaction | Required |
| DELETE | `/api/Transactions/Delete/{id}` | Delete an owned transaction | Required |

---

## Configuration

### appsettings.json

Use non-secret configuration or placeholders in the committed file:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "ConnectionStrings": {
    "Default": ""
  },
  "Jwt": {
    "Key": "REPLACE_WITH_LOCAL_SECRET",
    "Issuer": "ExpenseTrackerAPI",
    "Audience": "ExpenseTrackerClient",
    "ExpiryHours": 1
  },
  "AllowedHosts": "*"
}
```

### Development Secrets

Store the actual JWT signing key and local connection string in one of these locations:

- `appsettings.Development.json`, excluded from Git
- Environment variables
- .NET User Secrets
- Azure Key Vault for a hosted production environment

Example local development configuration:

```json
{
  "ConnectionStrings": {
    "Default": "Data Source=(LocalDb)\\MSSQLLocalDB;Initial Catalog=Expenses-Db;Integrated Security=True;Encrypt=False;Trust Server Certificate=True"
  },
  "Jwt": {
    "Key": "USE_A_LONG_RANDOM_LOCAL_SECRET"
  }
}
```

### Angular API URL

The Angular services must point to the running backend address, for example:

```typescript
private apiUrl = 'https://localhost:7193/api/Auth';
```

and:

```typescript
private apiUrl = 'https://localhost:7193/api/Transactions';
```

Update the port if the API uses a different local HTTPS port.

---

## Running the Application

### Prerequisites

Install:

- .NET SDK compatible with the backend project
- Node.js and npm
- Angular CLI
- SQL Server LocalDB
- Visual Studio, Visual Studio Code, or another compatible editor

### Run the Backend

From the API folder:

```bash
cd Expenses.API
dotnet restore
dotnet run
```

Swagger is normally available in the development environment at an address similar to:

```text
https://localhost:<api-port>/swagger
```

### Run the Frontend

From the Angular folder:

```bash
cd Expense.Client
npm install
ng serve
```

Alternatively:

```bash
npm start
```

The Angular application normally runs at:

```text
http://localhost:4200
```

### Run Both Applications

Both projects must run simultaneously:

```text
Angular Client: http://localhost:4200
ASP.NET API:    https://localhost:<api-port>
SQL Database:   (LocalDB)\MSSQLLocalDB
```

### Connect to LocalDB

Use this server name in SQL Server Management Studio:

```text
(LocalDB)\MSSQLLocalDB
```

Use Windows Authentication.

Useful development queries:

```sql
SELECT * FROM Users;
SELECT * FROM Transactions;
```

Join transactions with user email:

```sql
SELECT
    t.Id,
    t.Type,
    t.Amount,
    t.Category,
    t.UserId,
    u.Email
FROM Transactions AS t
INNER JOIN Users AS u
    ON t.UserId = u.Id;
```

---

## Security Considerations

### Never Commit Secrets

Do not commit:

- Real JWT signing keys
- Database passwords
- Personal access tokens
- Production connection strings
- Private certificates or keys

If a secret is committed, rotate it immediately. Removing it only from the latest file does not remove it from previous Git history.

### Backend Ownership Validation

Frontend guards and hidden buttons are not security controls. Ownership must always be validated on the backend.

### Token Storage

This learning project stores the access token in local storage. A production security review should consider alternatives such as secure HttpOnly cookies based on the application's architecture and threat model.

### Token Payload

Do not put sensitive information such as passwords, signing keys, or confidential personal data inside JWT claims. JWT payloads can be decoded by the client.

### CORS

`AllowAnyOrigin`, `AllowAnyMethod`, and `AllowAnyHeader` are convenient for local development. Production deployments should restrict allowed origins to the trusted frontend domain.

### Timestamps

System-controlled timestamps should ideally be assigned by the backend:

```csharp
CreatedAt = DateTime.UtcNow;
UpdatedAt = DateTime.UtcNow;
```

### Financial Amounts

Use `decimal` rather than `double` for monetary values.

### Validation

Frontend validation improves the user experience, but backend validation is still required because API callers can bypass the Angular interface.

---

## Implemented Best Practices

- Layered frontend and backend architecture
- DTO pattern
- Service layer pattern
- Dependency Injection
- Scoped service lifetime
- Entity Framework Core
- LINQ-based queries
- Reactive Forms
- Centralized API services
- JWT authentication
- Claims-based identity
- User ownership validation
- Route guards
- HTTP interceptors
- Password hashing
- Token expiration validation
- Automatic logout
- Configuration-based JWT settings
- Strongly typed TypeScript interfaces
- Responsive Bootstrap layout
- Clear API status handling

---

## Known Limitations

- No refresh-token implementation
- No pagination for large transaction lists
- No global exception middleware
- No centralized Angular error interceptor beyond authentication handling
- No automated unit or integration test suite
- No email verification
- No password reset workflow
- No role-based authorization
- No production deployment configuration
- Local storage is used for the access token
- Some request and response models can be further separated on the Angular side
- Transaction categories are currently defined in frontend arrays

---

## Future Enhancements

### Authentication and Security

- Refresh tokens
- Refresh-token rotation
- Token revocation
- Secure refresh-token persistence
- HttpOnly cookie evaluation
- Email verification
- Forgot-password workflow
- Password-reset tokens
- Multi-factor authentication
- Role-based authorization
- Admin and User roles

### Transactions

- Server-side pagination
- Search by category or type
- Sorting by amount or date
- Date-range filtering
- Category filtering
- Monthly and yearly filtering
- Recurring transactions
- Transaction notes and descriptions
- Custom categories
- Bulk import and export

### Dashboard and Reporting

- Income versus expense charts
- Monthly trend visualization
- Category breakdown charts
- Budget tracking
- Spending-limit alerts
- PDF reports
- Excel export
- Monthly summaries

### Backend Quality

- Asynchronous EF Core methods
- Global exception handling middleware
- Structured logging
- FluentValidation or equivalent validation layer
- Repository pattern evaluation
- Unit tests
- Integration tests
- API versioning
- Health checks
- Rate limiting

### Frontend Quality

- Loading indicators
- Toast notifications
- Centralized error handling
- Typed create and update request models
- Reusable form controls
- Confirmation modal component
- Improved accessibility
- Responsive mobile refinements
- Signal-based state management evaluation

### DevOps and Deployment

- Docker support
- GitHub Actions CI/CD
- Azure App Service deployment
- Azure SQL Database
- Azure Key Vault
- Environment-specific Angular configuration
- Automated database deployment strategy
- Production monitoring and telemetry

---

## Learning Outcomes

This project demonstrates practical understanding of the following areas.

### Angular

- Standalone components
- Application configuration
- Routing
- Route parameters
- Route guards
- HTTP interceptors
- Services
- Dependency Injection
- Reactive Forms
- Built-in and custom validators
- RxJS Observables
- BehaviorSubject
- `subscribe()`
- `pipe()` and `tap()`
- Async pipe
- Template interpolation
- `*ngIf`
- `*ngFor`
- `[ngClass]`
- Event binding
- Property binding
- Angular currency and date pipes
- Component lifecycle hooks

### ASP.NET Core

- Web API controllers
- Attribute routing
- Model binding
- DTOs
- Interfaces
- Service layer
- Dependency Injection
- Service lifetimes
- Middleware ordering
- CORS
- Swagger
- Configuration
- JWT bearer authentication
- ClaimsPrincipal
- Authorization attributes
- HTTP status results

### Entity Framework Core

- DbContext
- DbSet
- Entity tracking
- SaveChanges
- LINQ queries
- One-to-many relationships
- Foreign keys
- Navigation properties
- Insert, read, update, and delete operations
- User-specific query filtering

### Security

- Password hashing
- Password verification
- JWT signing
- JWT validation
- Token expiration
- Claims-based identity
- Authorization
- Ownership checks
- Protection against cross-user transaction access
- Secret-management awareness

### Database

- Relational data modeling
- SQL Server LocalDB
- Primary keys
- Foreign keys
- One-to-many relationships
- Joining related tables
- Financial data storage considerations

---

## Author

**Aditya Gour**

---

## Repository Note

This is a learning and portfolio project. Configuration values, security settings, and deployment practices should be reviewed and strengthened before using the application in a production environment.

If this project is useful, consider starring the repository.
