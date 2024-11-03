# MeetUp - Video Calling Web Application (Server)

This repository contains the backend server for the MeetUp video-calling application. The server handles API requests, manages authentication, and provides essential services to support seamless video calls and collaboration.

## Installation Guide

1. **Clone the repository:**
    ```bash
    git clone https://github.com/takbirgazi/meetup-server.git
    ```
2. **Go to the project folder:**
    ```bash
    cd meetup-server 
    ```

3. **Install all packages:**
    ```bash
    npm install 
    ```

4. **Create a `.env` file** in the root directory and add the following environment variables:
    ```plaintext
    PORT
    DB_USER
    DB_PASS
    ACCESS_TOKEN_SECRET
    MAILGUN_API_KEY
    MAILGUN_DOMAIN
    SENDER_EMAIL
    ```

5. **Run the application:**
    ```bash
    npm start
    ```

## NPM Packages Used

- **express** - Web framework for handling API requests
- **cors** - Cross-Origin Resource Sharing to handle secure API requests from the client
- **dotenv** - For environment variable management
- **mongodb** - MongoDB driver for database operations
- **jsonwebtoken** - For secure user authentication and authorization
- **nodemon** - Utility to automatically restart the server on file changes
- **mailgun-js** - For email services, such as sending notifications
- **bcrypt** - For securely hashing passwords

## Project Links

- **Client GitHub Repository:** [MeetUp Client](https://github.com/takbirgazi/meetup-client)
- **Backend API Base URL:** [MeetUp Server API](https://meetup-server-nine.vercel.app/)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
