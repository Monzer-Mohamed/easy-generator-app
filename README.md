# Easy-Generator-App

## Description
This project is built using NestJS for the backend and React with TypeScript for the frontend. The backend follows Microservices and Domain-Driven Design (DDD) principles and utilizes MongoDB as the database. Authentication is implemented using JWT, and protected routes are enforced, including a `getUserById` endpoint.

## Features
- **Backend:** NestJS with DDD
- **Frontend:** React with TypeScript and CSS
- **Database:** MongoDB
- **Authentication:** JWT-based authentication
- **Protected Routes:** Includes `getUserById`
- **API Gateway:** Centralized entry point for microservices

## Tech Stack
- **Frontend:** React, TypeScript, CSS
- **Backend:** NestJS, MongoDB, DDD Architecture
- **Authentication:** JWT (JSON Web Token)
- **Package Manager:** Yarn
- **State Management:** Redux
- **API Gateway:** NestJS-based API Gateway

## Installation

### Clone the Repository
```sh
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### Install Dependencies
```sh
yarn install
```

## Running the Application

### Start Frontend
```sh
cd frontend
yarn start 
```

### Start Backend Auth Service
```sh
cd backend
yarn start auth
```

### Start API Gateway
```sh
cd api-gateway
yarn start
```



## API Authentication & Security
- The application uses **JWT-based authentication**.
- **Protected Routes** require a valid token for access.
- The `getUserById` endpoint is protected and only accessible with a valid JWT.
- **API Gateway** ensures centralized authentication and request handling.

## Project Structure
```
/easy-generator-app
│── backend/       # NestJS backend with DDD
│── api-gateway/   # API Gateway handling authentication and routing
│── frontend/      # React frontend with CSS
│── README.md      # Project documentation
```

## Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Create a Pull Request

## License
This project is licensed under the MIT License.

---
Made with ❤️ by [Monzer Mohamed](https://github.com/Monzer-Mohamed)

