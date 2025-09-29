# Shortener_URL

A simple URL shortener web application built with Node.js, Express, MongoDB, and EJS. Users can sign up, log in, and create short URLs that redirect to original links. The app features authentication, user dashboard, and a clean UI with light/dark mode support.

## Features
- User registration and login
- URL shortening and redirection
- User dashboard to manage URLs
- Authentication with cookies
- Light and dark mode UI

## Tech Stack
- Node.js
- Express.js
- MongoDB (Mongoose)
- EJS (Embedded JavaScript templates)
- JavaScript (Frontend)

## Folder Structure
```
Controller/      # Route handlers (user, url)
Models/          # Mongoose models (user, url)
Routes/          # Express route definitions
Service/         # Auth service (JWT/cookie logic)
View/            # EJS templates (home, login, signup, dashboard)
public/          # Static assets (JS, images)
middleware/      # Auth middleware
connection.js    # MongoDB connection setup
Index.js         # Main server file
```

## Getting Started

### Prerequisites
- Node.js (v14+ recommended)
- MongoDB (local or Atlas)

### Installation
1. Clone the repository:
	```
	git clone https://github.com/Krish-bhavsar19/Shortener-URL.git
	cd Shortener-URL
	```
2. Install dependencies:
	```
	npm install
	```
3. Set up environment variables (if needed):
	- Create a `.env` file for MongoDB URI and secret keys (if not hardcoded).

4. Start the server:
	```
	node Index.js
	```
	The app will run on `http://localhost:8001` by default.

## Usage
- Visit `/signup` to create an account.
- Log in at `/login`.
- Use the dashboard to shorten URLs and manage your links.

## License
This project is licensed under the MIT License.
