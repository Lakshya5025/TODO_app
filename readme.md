# **Todo App**

A simple and efficient Node.js application for managing your daily tasks. This full-stack application allows users to create an account, log in, and manage their to-do lists with a clean and intuitive interface.

## **Features**

- **User Authentication:** Secure user registration and login using JSON Web Tokens (JWT). Passwords are encrypted using bcrypt for enhanced security.
- **CRUD Operations for Todos:** Create, retrieve, update, and delete tasks.
- **Database Integration:** Uses MongoDB to store user and task data.
- **Frontend Interface:** A user-friendly interface built with EJS, HTML, and CSS for a seamless user experience.

## **Technologies Used**

- **Node.js:** A JavaScript runtime environment.
- **Express.js:** A minimalist web framework for Node.js.
- **MongoDB:** A NoSQL database for storing data.
- **Mongoose:** An object modeling tool for MongoDB in a Node.js environment.
- **JSON Web Token (JWT):** For secure user authentication.
- **dotenv:** Loads environment variables from a .env file.
- **bcrypt:** A library for hashing passwords.
- **Zod:** A TypeScript-first schema declaration and validation library.
- **EJS:** A simple templating language that lets you generate HTML markup with plain JavaScript.

## **Getting Started**

Follow these instructions to get a copy of the project up and running on your local machine.

### **Prerequisites**

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (which includes npm)
- [MongoDB](https://www.mongodb.com/try/download/community)

### **Installation**

1. **Clone the repository:**  
   Bash  
   git clone https://github.com/lakshya5025/todo\_app.git  
   cd todo_app

2. **Install NPM packages:**  
   Bash  
   npm install

### **Configuration**

1. Create a .env file in the root of the project.
2. Add the following environment variables to your .env file:  
   MONGO_URL="your_mongodb_connection_string"  
   JWT_SECRET="your_jwt_secret"  
   PORT=3000

   - Replace "your_mongodb_connection_string" with your MongoDB connection string.
   - Replace "your_jwt_secret" with a secret key of your choice.

### **Running the Application**

To start the server, run:

Bash

npm start

The server will start on http://localhost:3000 or the port specified in your .env file.

## **File Structure**

/  
├── public/  
│ ├── pages/  
│ │ ├── signin.ejs  
│ │ ├── signup.ejs  
│ │ └── todo.ejs  
│ └── styles/  
│ ├── sign.css  
│ └── todo.css  
├── .env  
├── .gitignore  
├── db.js  
├── index.js  
├── package-lock.json  
├── package.json  
└── readme.md

## **API Endpoints**

All todo management endpoints require a JWT token in the token header for authorization.

### **User Authentication**

#### **POST /signup**

Creates a new user account.

**Request Body:**

JSON

{  
 "username": "your_username",  
 "password": "your_password",  
 "email": "your\_email@example.com"  
}

#### **POST /signin**

Logs in an existing user and returns a JWT token.

**Request Body:**

JSON

{  
 "username": "your_username",  
 "password": "your_password"  
}

**Response:**

JSON

{  
 "token": "your_jwt_token"  
}

### **Todo Management**

#### **POST /todo**

Adds a new task.

**Request Body:**

JSON

{  
 "task": "My new task"  
}

#### **GET /todos**

Retrieves all tasks for the authenticated user.

#### **PUT /todo/:id**

Updates the status of a task (e.g., marks it as complete).

#### **DELETE /todo/:id**

Deletes a task.
