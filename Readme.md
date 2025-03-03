# Threat Intelligence Dashboard

A simple demo project showcasing a Node/Express backend and a React + Tailwind CSS frontend with JWT-based authentication. The app fetches recent threat intelligence data from an external source (URLHaus) and stores it in MongoDB. Users can log in, filter threats by type, and sort them by different columns.

## Features

### JWT Authentication
**Default credentials:**
- **Username:** admin  
- **Password:** password123  

### Threat Listing & Filtering
- Fetch threats from a remote API or local MongoDB cache.
- Filter by threat type (e.g., `malware_download` or show all).

### Sorting
- Click table headers to sort the data ascending/descending.

## Frontend
- Built with **React + Tailwind CSS**.

## Backend
- **Node.js/Express** server connected to **MongoDB** (via Mongoose).

## Prerequisites
- **Node.js** (version 18 or above recommended).
- **MongoDB** instance (Atlas or local).
- **npm** installed globally.


## Setup

## 1. Clone the Repository
```bash
git clone https://github.com/yourusername/icaro-assignment.git
cd icaro-assignment
```

## 2. Environment Variables
In the `backend` folder, create a `.env` file with the following content (adjust to your actual credentials and keep them private):

```ini
PORT=8000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net
CORS_ORIGIN=*
JWT_SECRET=my_super_secret_key
```

## Running the Backend

### Navigate to the backend folder:
```bash
cd backend
```

### Install dependencies:
```bash
npm install
```

```bash
npm run dev
```

## Running the Frontend

### Open a new terminal (or tab) and navigate to the frontend folder:
```bash
cd frontend/assesment
```
```bash
npm install
```

```bash
npm run dev
```

By default, the React app should start on **[http://localhost:5173](http://localhost:5173)** (if using Vite). Check your console output for the exact URL.

## Using the App
1. Open your frontend URL in a web browser (e.g., **[http://localhost:5173](http://localhost:5173)**).
2. Log in with the default credentials:
   - **Username:** `admin`
   - **Password:** `password123`
3. Once logged in, you’ll see the **Threat Intelligence Dashboard** with the table of threats.
4. You can **filter threats** by selecting the type from the dropdown.
5. You can **sort threats** by clicking on the column headers (`host`, `url`, `threat_type`, `date_added`). The sort order toggles between **ascending and descending**.

## Notes
- The first time you run the backend, if no threats are in the local MongoDB database, it will fetch from **URLHaus**.
- The `CORS_ORIGIN` in `.env` should match the origin of your React app if you run into **CORS issues**.
- In a **production environment**, you’d typically run:  npm run build

# Architecture Overview

## Frontend
- Built with **React** and **Tailwind CSS**.
- Calls the backend API to fetch threat intelligence data.
- Uses **JWT authentication** for user login.
- Allows **filtering and sorting** of threats.

## Backend
- Built with **Node.js** and **Express**.
- Connects to a **MongoDB** database using **Mongoose**.
- Fetches recent threats from **URLHaus** and caches them.
- Implements **JWT authentication** for secure access.
- Provides **API endpoints** for filtering and sorting threats.

## Database
- Uses **MongoDB** as the primary database.
- Stores **fetched threats** and **user authentication data**.

## Authentication
- Uses **JWT-based authentication** for secure user login.
- The **JWT secret key** should be stored in the **.env** file.

## Known Limitations & Assumptions

### Limitations
- Currently, there is **no role-based access control (RBAC)**; all authenticated users have the same access.
- The app fetches threat intelligence data from **URLHaus**, meaning availability depends on the external API.
- The frontend does not have **advanced security features** like rate limiting or CAPTCHA.

### Assumptions
- The **MongoDB instance** is running locally or on **MongoDB Atlas** and is properly configured.
- The **.env** file is correctly set up with valid credentials.
- Users will **not commit sensitive credentials** (e.g., `JWT_SECRET`, `MONGODB_URI`) to version control.
- The frontend will run on **port 5173** and the backend on **port 8000**, unless otherwise specified in the `.env` file.


Here are the screenshots for the **Login** and **Dashboard** pages:  

![Login Screenshot](login.png)  
![Dashboard Screenshot](dash.png)  
