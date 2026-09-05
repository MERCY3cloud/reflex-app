# Reflex App

A Next.js application with Mongoose MongoDB integration.

## Features

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Mongoose ODM for MongoDB
- API routes with database integration
- Environment configuration

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB installed locally or a MongoDB Atlas connection string

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your MongoDB connection string.

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

### Test Database Connection
```
GET /api/test
```
Returns connection status to MongoDB.

### Users API
```
GET /api/users
```
Fetch all users (limited to 10).

```
POST /api/users
```
Create a new user. Requires JSON body with `name` and `email`.

Example request body:
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

## Project Structure

```
reflex-app/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── test/          # Database test endpoint
│   │   └── users/         # Users CRUD endpoints
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── lib/                   # Utility functions
│   └── mongoose.ts        # MongoDB connection
├── models/                # Mongoose models
│   └── User.ts           # User model
├── .env.example          # Environment template
└── .env.local            # Local environment (gitignored)
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Database Setup

1. Install MongoDB locally or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Update `MONGODB_URI` in `.env.local` with your connection string
3. The app will automatically connect to the database on first API request

## License

MIT