# Task Management App with Next.js and Firebase

This project is a Task Management application built with Next.js and TypeScript, integrating Firebase Authentication and Firestore for managing user tasks. The app allows users to register, log in, and perform CRUD operations on their tasks.

## Features

- User authentication with Firebase
- Create, Read, Update, and Delete (CRUD) tasks
- Protected routes for authenticated users
- Responsive design

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- npm or yarn
- Firebase project with Firestore and Authentication enabled

### Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   cd nextjs-firebase-tasks
   ```

2. Install dependencies:

   ```
   npm install
   ```

   or

   ```
   yarn install
   ```

3. Set up Firebase:

   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Enable Authentication (Email/Password).
   - Create a Firestore database.

4. Configure environment variables:

   - Rename `.env.example` to `.env.local`.
   - Add your Firebase configuration to `.env.local`:

     ```
     NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
     ```

### Running the Application

To start the development server, run:

```
npm run dev
```

or

```
yarn dev
```

Open your browser and navigate to `http://localhost:3000`.

### Usage

- Register a new account or log in with an existing account.
- Once logged in, you can create, view, edit, and delete tasks.
- The dashboard is only accessible to authenticated users.

## Folder Structure

- `src/app`: Contains the main application layout and pages.
- `src/components`: Contains reusable components.
- `src/contexts`: Contains context providers for managing global state.
- `src/hooks`: Contains custom hooks for authentication.
- `src/lib`: Contains Firebase initialization.
- `src/services`: Contains functions for interacting with Firestore.
- `src/styles`: Contains global styles.
- `src/types`: Contains TypeScript type definitions.

## License

This project is licensed under the MIT License.