# Threat Intelligence Dashboard

A simple demo project showcasing a Node/Express backend and a React + Tailwind CSS frontend with JWT-based authentication. The app fetches recent threat intelligence data from an external source (URLHaus) and stores it in MongoDB. Users can log in, filter threats by type, and sort them by different columns.

## Features

- **JWT Authentication**
  - Default credentials:
    - Username: `admin`
    - Password: `password123`
  
- **Threat Listing & Filtering**
  - Fetch threats from remote API or local MongoDB cache
  - Filter by threat type (e.g., `malware_download` or show all)

- **Sorting**
  - Click table headers to sort data ascending/descending

- **Frontend**
  - Built with React + Tailwind CSS

- **Backend**
  - Node.js/Express server connected to MongoDB (via Mongoose)

## Prerequisites

- Node.js (version 18 or above recommended)
- MongoDB instance (Atlas or local)
- npm installed globally

## Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/icaro-assignment.git
   cd icaro-assignment
```

Environment Variables

In the backend folder, create a .env file with:

ini
Copy
PORT=8000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net
CORS_ORIGIN=*
JWT_SECRET=my_super_secret_key
Important: Never commit real credentials in public repos

Running the Backend
Navigate to backend folder:

bash
Copy
cd backend
Install dependencies:

bash
Copy
npm install
Start development server:

bash
Copy
npm run dev
Server runs on port 8000 (or value from .env)

Running the Frontend
Open new terminal and navigate to frontend:

bash
Copy
cd frontend/assesment
Install dependencies:

bash
Copy
npm install
Start development server:

bash
Copy
npm run dev
Typically runs on http://localhost:5173

Using the App
Open frontend URL in browser (e.g., http://localhost:5173)

Login with credentials:

Username: admin

Password: password123

Dashboard features:

Filter threats using type dropdown

Sort threats by clicking column headers

Toggle sort order between ascending/descending

