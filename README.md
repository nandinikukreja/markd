# Markd

![Banner Image](./frontend/public/MarkdBannerImg.png)

Markd is a platform for people who love sharing their knowledge with everyone. It allows users to write and read articles on various topics, connect with others, and discover new ideas.

## Table of Contents

- Features
- Technologies Used
- Directory Structure
- Prerequisites
- Installation
- Environment Variables
- Running the App
- Basic Flow
- Contributing
- License
- Acknowledgments

## Features

- User authentication and authorization (sign up, sign in)
- Create, read, update, and delete articles
- Upvote articles
- View user profiles and their articles
- Responsive design

## Technologies Used

### Frontend

- React
- React Router DOM
- Tailwind CSS
- Vite

### Backend

- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- bcrypt

## Directory Structure

```
backend/
    index.js
    package.json
    .env
    .gitignore
    middleware/
        auth.js
    models/
        Article.js
        User.js
    routes/
        articles.js
        auth.js
        users.js
frontend/
    index.html
    package.json
    .env
    .gitignore
    public/
        MarkdBannerImg.png
        Markd.svg
        Markd.gif
    src/
        App.jsx
        main.jsx
        index.css
        components/
            NavBar.jsx
            Modal.jsx
            ArticleSkeleton.jsx
            ...
        pages/
            HomePage.jsx
            GetStarted.jsx
            SignIn.jsx
            UserProfile.jsx
            Article.jsx
            NewArticle.jsx
            ...
    tailwind.config.js
    vite.config.js
README.md
```

## Prerequisites

- Node.js (v14.x or higher)
- MongoDB instance (local or cloud-based)

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/markd.git
   cd markd
   ```

2. **Install dependencies for both frontend and backend**

   ```bash
   # Navigate to the backend directory and install dependencies
   cd backend
   npm install

   # Navigate to the frontend directory and install dependencies
   cd ../frontend
   npm install
   ```

## Environment Variables

### Backend

Create a `.env` file inside the 

backend

 directory with the following variables:

```env
PORT=8081
DB_CONNECTION_STRING=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

- **PORT**: The port number on which the backend server will run (default is `8081`).
- **DB_CONNECTION_STRING**: Your MongoDB connection string.
- **JWT_SECRET**: A secret key for JWT authentication.

### Frontend

Create a `.env` file inside the 

frontend

 directory with the following variables:

```env
VITE_API_URL=http://localhost:8081
```

- **VITE_API_URL**: The URL where the backend API is running.

## Running the App

### Backend

**Starting the backend server**

   ```bash
   cd backend
   node index.js
   ```

   The backend server will start on `http://localhost:8081`.

### Frontend

**Starting the frontend development server**

   ```bash
   cd frontend
   npm run dev
   ```

   The frontend app will start on `http://localhost:5173`.

## Basic Flow

1. **Home Page**

   - Visitors can view the landing page with information about the platform.
   - Options to sign up or sign in are available.

2. **User Registration and Authentication**

   - Users can sign up using their name, email, and password.
   - Authentication is handled using JWT tokens.

3. **Dashboard**

   - Once logged in, users are redirected to the dashboard where they can see a list of articles.
   - Users can sort articles by the latest or most upvoted.

4. **Creating an Article**

   - Users can write a new article by navigating to the "Write" page.
   - Articles can include a title, content, and tags.

5. **Viewing Articles**

   - Users can read articles written by others.
   - Articles display the author's information, content, and tags.

6. **Upvoting Articles**

   - Logged-in users can upvote articles.

7. **User Profiles**

   - Users can view their profile, edit their information, and see the articles they've written.
   - Users can visit other users' profiles to see their articles.