# Url shortner-Back

## Overview

 The backend is responsible for handling API requests to perform URL shortening operations. The primary files involved in the backend are `server.js`, `urlController.js`, and `db_connect.js`.

### Files and Their Explanations

#### 1. **server.js**

This file sets up the Express server, defines route handlers for creating and retrieving short URLs, and starts the server on a specified port.

**Required Packages and Modules:**
- **express:** A web application framework for Node.js.
- **dotenv:** Loads environment variables from a .env file into `process.env`.
- **cors:** Middleware enabling Cross-Origin Resource Sharing (CORS).
- **createUrl, findShortUrl, verifyInput, and getFullUrl:** Functions imported from `urlController.js`.

**Configuration:**
- Loads the .env file using `dotenv.config()`.
- Sets the port based on the `PORT` environment variable or defaults to port 3000.
- Initializes Express by calling `express()` and assigning it to the `app` constant.
- Applies middleware to parse JSON and URL-encoded bodies, and to enable CORS.

**Middleware Functions:**
- **validateRequestBody:** Validates the request body using the `verifyInput` function. Sends a 400 response if the input is invalid.
- **checkLongUrlInDb:** Checks if the long URL already exists in the database. Sends a 200 response with the original and short URL if found.
- **createShortUrl:** Creates a new short URL using the `createUrl` function. Sends a 200 response with the original and short URL if created successfully.

**Route Handlers:**
- `/api/shorturl` (POST): Validates input, checks if the long URL exists in the database, and creates a short URL if it doesn't.
- `/api/shorturl/:short_url` (GET): Redirects the user to the original URL when a valid short URL is provided.

**Server Start:**
- Starts the server by calling `app.listen()` with the specified port.
- Logs a confirmation message to the console when the server starts successfully.

#### 2. **urlController.js**

This file contains functions responsible for creating, finding, validating input, and retrieving URLs from the database.

**Functions:**
- **createUrl(original_url):** Creates a new URL document in the database, generates a short URL, and returns it.
- **generateShortUrl():** Uses the `nanoid` package to generate a random alphanumeric string for the short URL.
- **findShortUrl(longUrl):** Finds a URL document in the database based on the original URL.
- **verifyInput(input):** Validates the input object before creating a new URL document.
- **isValidURL(string):** Checks if a given string is a valid HTTP or HTTPS URL.
- **getFullUrl(short_url):** Retrieves the original URL from the database based on the provided short URL.

#### 3. **db_connect.js**

This file establishes a connection to the MongoDB database, defines the schema for URL documents, and exports the `Url` model.

**Steps:**
- Imports the `dotenv` package to load environment variables and `mongoose` for MongoDB interaction.
- Assigns the MongoDB connection string to the `db` constant.
- Calls `mongoose.connect()` to establish a connection with MongoDB using provided options.
- Defines the URL schema using `mongoose.Schema()` with fields `original_url` and `short_url`.
- Creates the `Url` model using `mongoose.model()`.
- Exports the `Url` constant for use in other files.

## Getting Started

To set up the URL shortener project after cloning the project and accessing this foder:

1. Install dependencies: `npm install`
2. Configure MongoDB connection in the `.env` file.
3. Start the server: `npm run dev`

The API will be accessible at `http://localhost:{PORT}/api/shorturl`.

### Using Docker

If you prefer to use Docker:

1. Build the Docker image: `docker build -t url-shortener .`
2. Run the Docker container: `docker run -p 4000:{PORT} url-shortener`

Now, the API will be accessible at `http://localhost:4000/api/shorturl`.
