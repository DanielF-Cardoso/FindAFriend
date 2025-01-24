# FindAFriend 
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white&logoWidth=20)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white&logoWidth=20) 
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white&logoWidth=20) 
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white&logoWidth=20) 
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

This repository handles the backend functionalities of FindAFriend, an API designed for pet adoption. The API allows organizations to register and management pets available for adoption. Users can search for pets and find nearby organizations. The backend is built with Domain-Driven Design (DDD) and Clean Architecture principles.
## 📋 Contents

- [🛠️ Features](#️-features)
- [🚀 Technologies Used](#-technologies-used)
- [💾 Setup and Installation](#-setup-and-installation)
- [⚙️ How to Run](#️-how-to-run)
- [📚 API Documentation](#-api-documentation)
- [🛣️ Application Routes](#️-application-routes)
- [🧪 Running Tests](#-running-tests)

## 🛠️ Features

- **Pet Registration and Management:** Organizations can register, edit and delete pets available for adoption, including details like breed, age and energy level.
- **Pet Search:** Users can search for pets available for adoption based on different criteria (e.g., city, age, breed).
- **Nearby Organizations:** Users can search for organizations near them to find pets available for adoption.

- ## 🚀 Technologies Used

- [Nest.js](https://nestjs.com) - A progressive Node.js framework.
- [Prisma](https://www.prisma.io) - ORM for database access.
- [Vitest](https://vitest.dev) - Unit and e2e testing.
- [Docker](https://www.docker.com) - Containerization for execution.
- [JWT](https://jwt.io) - Used for secure user authentication and authorization.

## 💾 Setup and Installation

1. **Clone the repository:**
   ```bash
   https://github.com/DanielF-Cardoso/FindAFriend.git
   ```
2. **Run Docker:** To use Postgress service with Docker
   ```bash
   docker-compose up -d
   ```        
3. **Set up environment variables:** Create a .env file based on the provided example
   ```bash
   cp .env-example .env
   ```   
4. **Install dependencies:**
   ```bash
   npm install
   ``` 
5. **Set up the database:** Ensure Prisma is properly configured and apply migrations
   ```bash
   npx prisma migrate dev
   ```      

## ⚙️ How to Run

- **Run the application locally:**
   ```bash
   npm run start:dev
   ```
- **Run the application in production: Build the project and run it using the compiled files:**
   ```bash
   npm run build
   npm run start
   ```   

## 📚 API Documentation

The API includes a complete Swagger documentation that can be accessed at the following route after starting the server:

   ```bash
   http://localhost:3333/api/docs
   ```   

## 🛣️ Application Routes

### **Organizations**
- **POST /orgs**  
  Register a new organization.
  
- **POST /orgs/auth**  
  Authenticate an organization and return a JWT token.
  
- **GET /orgs/nearby**  
  Find nearby organizations based on geographic coordinates (latitude and longitude).

- **DELETE /orgs/pets/{id}**  
  Delete a specific pet belonging to an organization. *(Requires authentication)*

- **PUT /orgs/pets/{id}**  
  Update details of a specific pet belonging to an organization. *(Requires authentication)*

- **POST /orgs/pets**  
  Register a new pet for adoption. *(Requires authentication)*
---

### **Pets**

- **GET /pet/{id}**  
  Retrieve details of a specific pet.

- **GET /pets/search**  
  Search for pets based on criteria such as city, age, or breed.


## 🧪 Running Tests

 - **Run the Unit test:**
   ```bash
   npm run test
   ```
 - **Run the Unit tests in watch mode:**
   ```bash
   npm run test:watch
   ```
 - **Run the Unit tests with coverage:**
   ```bash
   npm run test:cov
   ```
 - **Run end-to-end tests:**
   ```bash
   npm run test:e2e
   ```
 - **Run end-to-end tests in watch mode:**
   ```bash
   npm run test:e2e:watch
   ```   


