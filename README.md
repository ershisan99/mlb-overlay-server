# mlb-overlay-server

This project was created with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack), a modern TypeScript stack that combines React, TanStack Router, Hono, TRPC, and more.

## Features

- **TypeScript** - For type safety and improved developer experience
- **TanStack Router** - File-based routing with full type safety
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **shadcn/ui** - Reusable UI components
- **Hono** - Lightweight, performant server framework
- **tRPC** - End-to-end type-safe APIs
- **Bun** - Runtime environment
- **Drizzle** - TypeScript-first ORM
- **PostgreSQL** - Database engine
- **Authentication** - Email & password authentication with Better Auth

## Getting Started

First, install the dependencies:

```bash
bun install
```
## Database Setup

This project uses PostgreSQL with Drizzle ORM.

1. Make sure you have a PostgreSQL database set up.
2. Update your `apps/server/.env` file with your PostgreSQL connection details.

3. Apply the schema to your database:
```bash
bun db:push
```


Then, run the development server:

```bash
bun dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser to see the web application.
The API is running at [http://localhost:3000](http://localhost:3000).



## Project Structure

```
mlb-overlay-server/
├── apps/
│   ├── web/         # Frontend application (React + TanStack Router)
│   └── server/      # Backend API (Hono, TRPC)
```

## Available Scripts

- `bun dev`: Start all applications in development mode
- `bun build`: Build all applications
- `bun dev:web`: Start only the web application
- `bun dev:server`: Start only the server
- `bun check-types`: Check TypeScript types across all apps
- `bun db:push`: Push schema changes to database
- `bun db:studio`: Open database studio UI

## Docker

This project includes a Dockerfile to build and run the server application in a containerized environment.

### Building the Docker Image

To build the Docker image, run the following command from the project root:

```bash
docker build -t mlb-overlay-server .
```

### Running the Docker Container

To run the Docker container:

```bash
docker run -p 3000:3000 -p 4000:4000 --env-file ./apps/server/.env mlb-overlay-server
```

This will:
- Map port 3000 (API server) from the container to port 3000 on your host machine
- Map port 4000 (WebSocket server) from the container to port 4000 on your host machine
- Use the environment variables from your local .env file

### Environment Variables

The Docker container requires the following environment variables:

- `DATABASE_URL`: PostgreSQL connection string
- `CORS_ORIGIN`: CORS origin setting
- `BETTER_AUTH_SECRET`: Secret key for authentication
- `BETTER_AUTH_URL`: URL for authentication service

You can provide these variables in several ways:
1. Using an env file with `--env-file` as shown above
2. Setting them directly with `-e` flags:
   ```bash
   docker run -p 3000:3000 -p 4000:4000 -e DATABASE_URL=postgres://... -e CORS_ORIGIN=* mlb-overlay-server
   ```
3. Creating a custom .env file specifically for Docker

### Docker Compose (Optional)

For a more complete setup, you can create a docker-compose.yml file to manage the application and its dependencies.
