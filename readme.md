# **Todo App API**

A simple and efficient Node.js application for managing your daily tasks. This backend service allows you to create an account, log in, and manage your to-do list with ease.

## **Features**

- **User Authentication:** Secure user registration and login using JSON Web Tokens (JWT).
- **Create Todos:** Add new tasks to your personal to-do list.
- **View Todos:** Retrieve all your saved tasks.
- **Database Integration:** Uses MongoDB to store user and task data.

## **Technologies Used**

- **Node.js:** A JavaScript runtime environment.
- **Express.js:** A fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB:** A NoSQL database for storing data.
- **Mongoose:** An elegant MongoDB object modeling for Node.js.
- **JSON Web Token (JWT):** A compact, URL-safe means of representing claims to be transferred between two parties.
- **dotenv:** A zero-dependency module that loads environment variables from a .env file into process.env.
- **bcrypt:** A library for hashing passwords.
- **Zod:** A TypeScript-first schema declaration and validation library.

## **Getting Started**

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### **Prerequisites**

Make sure you have the following installed on your machine:

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

   - Replace "your_mongodb_connection_string" with your actual MongoDB connection string.
   - Replace "your_jwt_secret" with a secret key of your choice.

### **Running the Application**

To start the server, run the following command:

Bash

npm start

The server will start on http://localhost:3000 or the port you specified in your .env file.

## **API Endpoints**

Here are the available API endpoints:

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

**Response:**

JSON

{  
 "message": "User added successfully"  
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
 "message": "your_jwt_token"  
}

### **Todo Management**

_Note: All todo endpoints require a JWT token in the token header for authorization._

#### **POST /todo**

Adds a new task to the user's to-do list.

**Headers:**

token: your_jwt_token

**Request Body:**

JSON

{  
 "task": "My new task"  
}

**Response:**

JSON

{  
 "message": "task added successfully"  
}

#### **GET /todos**

Retrieves all tasks for the authenticated user.

**Headers:**

token: your_jwt_token

**Response:**

JSON

{  
 "message": \[  
 {  
 "\_id": "60d0fe4f5311236168a109ca",  
 "task": "My first task",  
 "isDone": false,  
 "userId": "60d0fe4f5311236168a109c9"  
 },  
 {  
 "\_id": "60d0fe4f5311236168a109cb",  
 "task": "My second task",  
 "isDone": false,  
 "userId": "60d0fe4f5311236168a109c9"  
 }  
 \]  
}
