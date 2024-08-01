# MedApp API 0

MedApp API is a backend server built with Node.js, Express, and MongoDB for managing user authentication, password resets, file uploads, and more. This project was created for a hackathon and includes various features like JWT authentication, OTP generation, and payment processing.

## Features

- User Registration and Login
- JWT Authentication with Cookie Support
- Password Reset with OTP Verification
- File Upload and Download
- Payment Processing
- Doctor Management

## Technologies Used

- Node.js
- Express
- MongoDB
- JWT (JSON Web Tokens)
- Nodemailer
- Body-parser
- Cookie-parser
- Axios
- Cors

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB instance
- Yarn or npm

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/medapp-api.git
    cd medapp-api
    ```

2. Install dependencies:
    ```sh
    yarn install
    # or
    npm install
    ```

3. Set up environment variables:

   Create a `.env` file in the root directory with the following contents:
    ```env
    PORT=8000
    MONGODB_URI=your_mongodb_connection_string
    MONGODB_PASSWORD=your_mongodb_password
    JWT_SECRET=your_jwt_secret
    EMAIL=your_email@gmail.com
    EMAIL_PASSWORD=your_email_password
    ```

4. Start the server:
    ```sh
    yarn start
    # or
    npm start
    ```

## API Endpoints

### User Routes

- `POST /api/users/register`: Register a new user
- `POST /api/users/login`: Log in a user
- `POST /api/users/logout`: Log out a user

### Authentication Routes

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Log in a user
- `POST /api/auth/logout`: Log out a user

### Password Reset Routes

- `POST /api/password-reset/request-reset`: Request a password reset
- `POST /api/password-reset/reset-password`: Reset the password

### Protected Routes

- `GET /api/protected`: Access a protected route (requires JWT token)

### OTP Generation Routes

- `POST /api/generateOTP`: Generate an OTP for user verification

### File Upload and Download Routes

- `POST /api/upload`: Upload a file
- `GET /api/download/:filename`: Download a file

### Payment Routes

- `POST /api/payment`: Process a payment

### Doctor Management Routes

- `GET /api/doctor`: Get doctor information
- `POST /api/doctor`: Add a new doctor

## Middleware

- `authMiddleware`: Middleware to protect routes and verify JWT tokens

## Error Handling

The application includes basic error handling for MongoDB connection errors and missing environment variables.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## Acknowledgements

Thanks to all the contributors and participants of the hackathon.


