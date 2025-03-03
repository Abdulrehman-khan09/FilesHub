# Project FilesHub

## Overview

This web application handles user authentication and file management. It provides routes for user login, registration, and file upload/download functionalities.

## Features

- User Registration
- User Login
- File Upload
- File Download

## Routes

### User Authentication

#### Register

- **URL:** `/register`
- **Method:** `POST`
- **Description:** Registers a new user.
- **Request Body:**
    ```json
    {
        "username": "string",
        "password": "string"
    }
    ```
- **Response:**
    ```json
    {
        "message": "User registered successfully."
    }
    ```

#### Login

- **URL:** `/login`
- **Method:** `POST`
- **Description:** Authenticates a user.
- **Request Body:**
    ```json
    {
        "username": "string",
        "password": "string"
    }
    ```
- **Response:**
    ```json
    {
        "message": "Login successful.",
        "token": "jwt_token"
    }
    ```

### File Management

#### Upload File

- **URL:** `/upload`
- **Method:** `POST`
- **Description:** Uploads a file.
- **Headers:**
    ```json
    {
        "Authorization": "Bearer jwt_token"
    }
    ```
- **Request Body:** `multipart/form-data`
- **Response:**
    ```json
    {
        "message": "File uploaded successfully.",
        "fileUrl": "url_to_uploaded_file"
    }
    ```

#### Download File

- **URL:** `/download/:fileId`
- **Method:** `GET`
- **Description:** Downloads a file.
- **Headers:**
    ```json
    {
        "Authorization": "Bearer jwt_token"
    }
    ```
- **Response:** Binary file data

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:
     ```sh
     git clone https://github.com/yourusername/your-repo.git
     ```
2. Navigate to the project directory:
     ```sh
     cd your-repo
     ```
3. Install dependencies:
     ```sh
     npm install
     ```

### Running the Application

1. Start the server:
     ```sh
     npm start
     ```
2. The application will be running at `http://localhost:3000`.

## License

This project is licensed under the MIT License.
