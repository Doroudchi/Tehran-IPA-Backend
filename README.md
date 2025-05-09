# Tehran-IPA-Backend

## Description

This is the backend for the Tehran-IPA project built with Express.js.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Doroudchi/Tehran-IPA-Backend.git
   cd Tehran-IPA-Backend/IPA-Backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create environment variables:

   - Copy the example environment file:
     ```bash
     cp ../.env.example IPA-Backend/.env.local
     ```
   - Open `.env.local` and update the variables with your API key

4. Set up the database using Docker:

   ```bash
   cd ..
   docker-compose up -d
   cd IPA-Backend
   ```

5. Start the server:

   ```bash
   npm start
   ```

   For development with automatic restarts:

   ```bash
   npm run dev
   ```

## Environment Variables

The `.env.local` file should contain the following variables (see `.env.example` for reference)

Make sure to properly configure all environment variables before starting the application.
