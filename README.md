# Sarjan AI Frontend

A modern, responsive frontend application for Sarjan AI, built with Next.js and React. This application provides a studio interface for AI interactions, real-time chat capabilities, and secure user authentication.

## Features

- **Authentication**: Secure Login and Registration functionality.
- **AI Studio**: Interactive studio environment for content creation and chat.
- **Real-time Chat**: Real-time messaging capabilities powered by Socket.IO.
- **Responsive Design**: customized UI components and responsive layouts using CSS Modules.
- **User Management**: User profile and session management.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (v15)
- **Library**: [React](https://reactjs.org/) (v19)
- **Styling**: CSS Modules
- **Real-time**: [Socket.IO Client](https://socket.io/)
- **State/Form Management**: React Hook Form, Axios
- **Icons**: React Icons, Lucide React

## Prerequisites

Before running this project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (Latest LTS version recommended)
- [npm](https://www.npmjs.com/) (Node Package Manager)

## Getting Started

Follow these steps to set up and run the project locally.

1.  **Clone the repository**

    ```bash
    git clone <repository-url>
    cd sarjan-frontend
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Environment Setup**

    Create a `.env` file in the root directory (or ensure it exists). You need to define the API base URL.

    ```bash
    NEXT_PUBLIC_API_BASE_URL=http://your-backend-api-url
    ```

    *Note: The application uses `NEXT_PUBLIC_API_BASE_URL` for API requests and Socket.IO connections.*

4.  **Run the development server**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

The project follows a standard Next.js directory structure within `src/`:

-   **`src/pages`**: Application routes and pages.
    -   `studio.js`: Main studio interface.
    -   `_app.js`: App entry point with global providers.
-   **`src/components`**: Reusable UI components.
    -   `auth/`: Login and Register modals.
    -   `studio/`: Chat area, user menu, and studio-specific components.
-   **`src/styles`**: Global styles and CSS Modules for components.

## Available Scripts

In the project directory, you can run:

-   `npm run dev`: Runs the app in the development mode.
-   `npm run build`: Builds the app for production.
-   `npm run start`: Starts the production server.
-   `npm run lint`: Runs ESLint to check for code quality issues.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.