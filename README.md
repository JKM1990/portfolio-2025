# Portfolio Website

This is a modern portfolio website built with Next.js, TypeScript, Tailwind CSS, and Vercel Postgres.

## Features

- Responsive design
- Projects showcase with featured projects
- Skills section
- Contact form
- API routes for content management
- Smooth animations with Framer Motion

## Getting Started

### Development Setup

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up the environment variables:

```bash
cp .env.example .env.local
```

4. Edit `.env.local` to add your database connection string:

```
DATABASE_URL="postgresql://username:password@localhost:5432/portfolio?schema=public"
```

5. Push the database schema to your Postgres instance:

```bash
npm run prisma:push
```

6. Seed the database with sample data:

```bash
npm run prisma:seed
```

7. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Docker Setup

You can also run the project with Docker:

1. Make sure you have Docker and Docker Compose installed
2. Create `.env.local` file with the following:

```
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/portfolio?schema=public"
SEED_DATABASE="true"
```

3. Start the Docker containers:

```bash
docker-compose up
```

This will start both the Next.js application and a Postgres database.

## Deploy on Vercel

This project is configured to work seamlessly with Vercel deployment and Vercel Postgres.

### Deployment Steps

1. Push your code to GitHub
2. Connect your repository to Vercel
3. In the Vercel dashboard, go to Storage → Create → Postgres
4. Connect the Postgres database to your project
5. Set the `SEED_DATABASE` environment variable to `true` for the first deployment
6. Deploy the project

Vercel will automatically set up the `DATABASE_URL` environment variable for you.

### After First Deployment

Once the database is seeded, you can remove the `SEED_DATABASE` environment variable or set it to `false` to prevent reseeding on subsequent deployments.

## Project Structure

- `app/` - Next.js App Router pages and API routes
- `components/` - React components
- `lib/` - Utilities and database models
- `prisma/` - Prisma schema and seed script
- `public/` - Static assets
- `types/` - TypeScript type definitions
- `utils/` - Utility functions

## Database Schema

The project uses Prisma ORM with the following models:

- `Project` - Portfolio projects with details and technologies
- `Skill` - Skills with name and icon
- `Technology` - Technologies used in projects
- `ProjectDetails` - Detailed information about projects

## Technology Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Prisma
- Vercel Postgres

## License

[MIT](LICENSE)