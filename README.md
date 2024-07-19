# Todo List Application

This is a Todo List application built with Next.js, React, Redux, Tailwind CSS, and MongoDB. The app includes features like user authentication, task management, and password recovery.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Features](#features)

## Getting Started

To get a local copy of the project up and running, follow these steps.

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm (or pnpm or yarn)
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/todo-list-app.git
   cd todo-list-app
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

   or

   ```bash
   npm install
   ```

   or if you are using yarn:

   ```bash
   yarn install
   ```

3. Set up your environment variables. Create a `.env.local` file in the root directory and add the following:
   ```env
   DBURL=<your_mongodb_connection_string>
   SECRET_KEY=<your_secret_key>
   ```

### Running the Application

1. Start the development server:

   ```bash
   pnpm run dev
   ```

   or

   ```bash
   npm run dev
   ```

   or if you are using yarn:

   ```bash
   yarn dev
   ```

2. Open your browser and navigate to `http://localhost:3000`.

## Technologies Used

- **Frontend:**

  - [Next.js](https://nextjs.org/)
  - [React](https://reactjs.org/)
  - [Redux](https://redux.js.org/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [react-hot-toast](https://react-hot-toast.com/)
  - [Next.js Top Loader](https://github.com/klendi/nextjs-toploader)

- **Backend:**
  - [MongoDB](https://www.mongodb.com/)

## Features

- User Authentication (Sign Up, Login, Logout)
- Task Management (Add, View, Edit, Delete tasks)
- Password Recovery (Forgot Password)
- Responsive Design
- Top Loading Bar for navigation feedback
