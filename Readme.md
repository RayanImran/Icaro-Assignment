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

## 2. Environment Variables
In the `backend` folder, create a `.env` file with the following content (adjust to your actual credentials and keep them private):

```ini
PORT=8000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net
CORS_ORIGIN=*
JWT_SECRET=my_super_secret_key

## Running the Backend

### Navigate to the backend folder:
```bash
cd backend


### Install dependencies:
```bash
npm install
