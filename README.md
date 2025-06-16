# BookHaven Library Management System

BookHaven is a comprehensive library management system built with React, allowing users to browse, borrow, and return books from the library's collection.

## Live Demo

Visit the live application: [BookHaven](https://rijoan-book-haven.netlify.app/)

## Features

- **User Authentication**: Secure login and registration with Firebase Auth
- **Book Browsing**: View all books with filtering and search functionality
- **Category Browsing**: Browse books by categories/genres
- **Book Details**: View comprehensive information about each book
- **Book Borrowing System**: Borrow books with automated quantity management
- **Borrowed Books Tracking**: View all books you've borrowed and their return dates
- **Book Return System**: Return books with a simple click
- **Responsive Design**: Fully responsive UI that works on all device sizes

## Technologies Used

- **React**: Front-end library for building user interfaces
- **React Router**: For handling navigation and routing
- **Tailwind CSS**: For styling components with utility classes
- **Firebase Authentication**: For user authentication
- **Axios**: For handling API requests
- **SweetAlert2**: For beautiful, responsive alerts and confirmations

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with your Firebase configuration:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## Application Structure

- `src/components`: Reusable UI components
- `src/Pages`: Page components for different routes
- `src/api`: API integration with the backend
- `src/Providers`: Context providers for state management
- `src/Route`: Routing configuration and route protection
- `src/assets`: Static assets like images

## Available Scripts

- `npm run dev`: Starts the development server
- `npm run build`: Builds the app for production
- `npm run lint`: Runs ESLint for code quality
- `npm run preview`: Previews the production build locally
