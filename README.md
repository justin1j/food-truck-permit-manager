# Food Truck Permit Application

## Overview

This application provides a backend service for managing food truck permits, with administrative access control and a GraphQL API to query and update food truck permit data. The app supports CSV import functionality for adding food truck permit data to the database.

## Features

- **Admin Authentication**: Secure login and authentication for admins using JWT.
- **Food Truck Permit Management**: Retrieve and update food truck permit statuses via GraphQL queries and mutations.
- **CSV Data Import**: Ability to import large food truck permit data sets from a CSV file.

## Setup Instructions

### Prerequisites

- **Docker** installed.
- **Docker Compose** installed.

### Docker Setup

1. **Clone the repository**:

```bash
   git clone https://github.com/your-username/food-truck-permit-backend.git
   cd food-truck-permit-backend
```

2. **Build and start the Docker Container**:

```bash
   docker-compose up --build
```
