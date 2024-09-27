# Real-Time Chat Application

A modern, real-time chat application built with Remix, Prisma, SQLite, and TypeScript.

## Features

- Real-time messaging using Server-Sent Events (SSE)
- User authentication with Google OAuth
- Message history with auto-scrolling
- Responsive design with Tailwind CSS

## Tech Stack

- [Remix](https://remix.run/)
- [Prisma](https://www.prisma.io/)
- [SQLite](https://www.sqlite.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/chat-application.git
   cd chat-application
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory based on the `.env.example` file and fill in your values:

   ```
   DATABASE_URL="file:./dev.db"
   SESSION_SECRET="your-secret-key"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_SECRET_KEY="your-google-secret-key"
   GOOGLE_CALLBACK_URL="http://localhost:5174/auth/google/callback"
   ```

4. Set up the database:
   ```sh
   npx prisma migrate dev
   ```

### Development

Run the development server:

```sh
npm run dev
```

The application will be available at `http://localhost:3000`.

### Building for Production

Build the app:

```sh
npm run build
```

Start the production server:

```sh
npm start
```

## Project Structure

- `app/routes/chat.tsx`: Main chat component
- `app/services/auth.server.ts`: Authentication logic
- `app/services/emitter.server.ts`: Server-Sent Events handler
- `app/db.server.ts`: Database connection and Prisma client
- `prisma/schema.prisma`: Prisma schema for database models

## Environment Variables

The application uses the following environment variables:

- `DATABASE_URL`: The URL for the SQLite database
- `SESSION_SECRET`: A secret key for session management
- `GOOGLE_CLIENT_ID`: Your Google OAuth client ID
- `GOOGLE_SECRET_KEY`: Your Google OAuth secret key
- `GOOGLE_CALLBACK_URL`: The callback URL for Google OAuth

Make sure to set these in your `.env` file before running the application.

## Real-Time Messaging with SSE

This application uses Server-Sent Events (SSE) for real-time messaging. The `emitter.server.ts` file handles the server-side event emission, while the client-side uses the `useEventSource` hook from `remix-utils` to listen for these events and update the UI in real-time.

## Prisma and SQLite

We use Prisma as an ORM with SQLite as the database. The Prisma schema (`prisma/schema.prisma`) defines the data models for the application.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Acknowledgments

- [Remix Documentation](https://remix.run/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Server-Sent Events (SSE) MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)
