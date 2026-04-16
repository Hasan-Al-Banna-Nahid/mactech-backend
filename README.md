<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>


# MackTech Backend Service

This repository contains the backend service for the MackTech application, built with NestJS, TypeScript, and leveraging Prisma for database interactions. It provides a robust, modular, and scalable API solution for managing various aspects of the platform, including user authentication, community features, orders, produce, rental spaces, sustainability certifications, and vendor profiles.

## Technologies Used

*   **NestJS**: A progressive Node.js framework for building efficient, reliable and scalable server-side applications.
*   **TypeScript**: A strongly typed superset of JavaScript that compiles to plain JavaScript.
*   **Prisma**: An open-source ORM (Object-Relational Mapper) for TypeScript and Node.js, simplifying database access.
*   **PostgreSQL**: A powerful, open-source object-relational database system.
*   **Zod**: A TypeScript-first schema declaration and validation library, used here for DTO validation.
*   **JWT (JSON Web Tokens)**: For secure authentication and authorization.
*   **Bcryptjs**: For password hashing.

## Project Structure

The project follows a modular structure, typical for NestJS applications, organizing features into distinct modules.

```
.
├───src/
│   ├───app.controller.ts        # Main application controller
│   ├───app.module.ts           # Main application module
│   ├───app.service.ts          # Main application service
│   ├───main.ts                 # Application entry point
│   ├───common/                 # Shared utilities, decorators, guards, pipes
│   │   ├───decorators/
│   │   │   └───roles.decorator.ts # Custom decorator for role-based access control
│   │   ├───guards/
│   │   │   ├───jwt-auth.guard.ts  # JWT authentication guard
│   │   │   └───roles.guard.ts     # Role-based authorization guard
│   │   ├───pipes/
│   │   │   └───zod-validation.pipe.ts # Custom pipe for Zod-based validation
│   │   └───utils/
│   │       └───response.util.ts     # Utility functions for standardized API responses
│   ├───lib/                    # Core library services
│   │   ├───prisma.module.ts       # Prisma integration module
│   │   ├───prisma.service.ts      # Prisma client service
│   │   └───prisma.ts              # Prisma client initialization
│   └───modules/                # Feature-specific modules
│       ├───auth/               # Authentication and user management
│       ├───community/          # Community posts and interactions
│       ├───order/              # Order creation, management, and processing
│       ├───produce/            # Produce listing and management
│       ├───rental-space/       # Rental space listing and booking
│       ├───sustainability-cert/ # Management of sustainability certifications
│       └───vendor/             # Vendor profile and specific operations
├───prisma/                     # Prisma schema definitions and migrations
│   ├───migrations/             # Database migration files
│   └───schemas/                # Individual Prisma schema files for each model
│       ├───communityPost.prisma
│       ├───enums.prisma
│       ├───order.prisma
│       ├───produce.prisma
│       ├───rentalSpace.prisma
│       ├───schema.prisma        # Main Prisma schema file (aggregates others)
│       ├───sustainibilityCert.prisma
│       ├───user.prisma
│       └───vendorProfile.prisma
└───test/                       # End-to-end tests
```

## Module Breakdown

Each feature module (`src/modules/*`) generally adheres to the following structure:

*   **`[feature].controller.ts`**:
    *   Handles incoming HTTP requests for the feature.
    *   Defines API endpoints and their corresponding HTTP methods (GET, POST, PUT, DELETE).
    *   Orchestrates the flow by calling methods in the associated service.
    *   Uses decorators like `@Controller()`, `@Get()`, `@Post()`, etc.
    *   Responsible for request validation using DTOs and pipes.
*   **`[feature].service.ts`**:
    *   Contains the core business logic for the feature.
    *   Interacts with the repository to perform database operations.
    *   Applies business rules and validations.
    *   Often decorated with `@Injectable()`.
*   **`[feature].repository.ts`**:
    *   Abstracts database interactions for the feature.
    *   Uses the `PrismaService` to query and manipulate data in the PostgreSQL database.
    *   Provides methods like `findAll`, `findById`, `create`, `update`, `delete`.
    *   Helps separate business logic from data access logic.
*   **`[feature].module.ts`**:
    *   Organizes the components of a feature.
    *   Uses the `@Module()` decorator to define controllers, providers (services, repositories), and imports/exports other modules.
    *   Acts as a container for related functionality.
*   **`dto/[feature].dto.ts`**:
    *   Data Transfer Objects (DTOs) define the shape of data coming into the application (e.g., request bodies, query parameters).
    *   Used for input validation and transformation, often in conjunction with Zod schemas and custom validation pipes.

### Core Modules

*   **`src/app.module.ts`**: The root module of the application, importing all feature modules and global providers.
*   **`src/main.ts`**: The application's entry point, responsible for bootstrapping the NestJS application and setting up global configurations (e.g., global pipes, interceptors).

### Common Utilities (`src/common`)

*   **`decorators/roles.decorator.ts`**: A custom decorator to specify required user roles for certain routes or controllers, used in conjunction with `RolesGuard`.
*   **`guards/jwt-auth.guard.ts`**: A NestJS guard that protects routes by validating JWTs from incoming requests, ensuring only authenticated users can access them.
*   **`guards/roles.guard.ts`**: A NestJS guard that checks if the authenticated user has the necessary roles to access a specific route or resource.
*   **`pipes/zod-validation.pipe.ts`**: A custom validation pipe that integrates Zod schemas for request payload validation.
*   **`utils/response.util.ts`**: Contains helper functions to standardize API response formats across the application.

### Library Services (`src/lib`)

*   **`prisma.module.ts`**: A NestJS module that encapsulates the Prisma client, making it available for injection across the application.
*   **`prisma.service.ts`**: An injectable service that provides access to the Prisma client instance, managing its lifecycle (e.g., connecting on startup, disconnecting on shutdown).
*   **`prisma.ts`**: Initializes and exports the Prisma client.

### Database Schemas (`prisma/schemas`)

These `.prisma` files define the database models and their relationships using Prisma Schema Language (PSL). `schema.prisma` typically aggregates all other individual schema files. Each file corresponds to a specific domain entity (e.g., `user.prisma`, `order.prisma`).

## Getting Started

To get started with the project, follow these steps:

### Prerequisites

*   Node.js (LTS version recommended)
*   npm or Yarn
*   PostgreSQL database instance

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd MackTech
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```
3.  Configure environment variables:
    Create a `.env` file in the project root based on a `.env.example` (if available), or define:
    *   `DATABASE_URL`: Your PostgreSQL connection string.
    *   `JWT_SECRET`: A strong secret key for JWT signing.

### Database Setup

1.  Generate Prisma client and apply migrations:
    ```bash
    npx prisma migrate dev --name init
    ```
    This command will apply any pending migrations and generate the Prisma client code.

### Running the Application

*   **Development (with watch mode):**
    ```bash
    npm run start:dev
    ```
*   **Development (using tsx for faster startup):**
    ```bash
    npm run dev
    ```
*   **Production Build & Start:**
    ```bash
    npm run build
    npm run start:prod
    ```

### Testing

*   **Run all tests:**
    ```bash
    npm test
    ```
*   **Run end-to-end tests:**
    ```bash
    npm run test:e2e
    ```

## Contributing

(Add contributing guidelines here if applicable)

## License

UNLICENSED (as per `package.json`)






