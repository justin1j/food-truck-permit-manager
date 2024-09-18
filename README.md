# Food Truck Permit Application

## Overview

This application provides a backend service for managing food truck permits, with administrative access control and a GraphQL API to query and update food truck permit data. The app supports CSV import functionality for adding food truck permit data to the database.

## Features

- **Admin Authentication**: Secure login and authentication for admins using JWT.
- **Food Truck Permit Management**: Retrieve and update food truck permit statuses via GraphQL queries and mutations.
- **CSV Data Import**: Ability to import large food truck permit datasets from a CSV file.

## Tech Stack

- **Backend**: Node.js, Express, GraphQL, Prisma, PostgreSQL
- **Frontend**: React
- **Database**: PostgreSQL
- **Containerization**: Docker, Docker Compose

## Setup Instructions

### Prerequisites

- **Docker** installed.
- **Docker Compose** installed.

### Backend Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/food-truck-permit-manager.git
   cd food-truck-permit-manager
   ```

2. **Build and start the Docker containers**:

   ```bash
   docker-compose up --build
   ```

   This command will build the Docker images and start the services defined in the `docker-compose.yml` file. The backend server will be available at `http://localhost:4000`.

### Frontend Setup

1. **Navigate to the frontend directory** (after completing the backend setup):

   ```bash
   cd permit-admin
   ```

2. **Install dependencies and start the frontend app**:

   ```bash
   npm install
   npm start
   ```

### Creating an Admin User

You need to create an admin user through the backend API:

1. Open a GraphQL client or use a tool like GraphiQL or Postman.

2. Go to the server URL: [http://localhost:4000/](http://localhost:4000/).

3. Run the following mutation:

   ```graphql
   mutation createAdmin {
     createAdmin(username: "adminusername", password: "yourpassword") {
       id
       username
     }
   }
   ```

4. Once the admin user is created, you can log in to the frontend app using the credentials you provided and start using the app!
