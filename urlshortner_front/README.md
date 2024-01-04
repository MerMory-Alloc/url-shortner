# Url shortner-Front
This documentation provides an overview of the frontend structure and functionality of the URL shortener project. The frontend is developed using Next.js, and the key files involved are addUrl.js, Form.jsx, and UrlList.jsx.

## 1. `addUrl.js` - Server Action Code
  
### Function Definition
- The `addUrl` function is defined as an asynchronous function, taking `formData` as a parameter (expected to be an instance of `FormData`).

### Environment Variable
- The `COMPLET_BACK_URL` constant is assigned the value of the `NODE_ENV_COMPLET_BACK_URL` environment variable, representing the complete API URL.

### Input Validation
- Extracts `inputValue` from `formData` using the `get` method with the key 'url'.
- Defines a regular expression pattern (`urlPattern`) to match a valid URL format.
- Checks if `inputValue` is valid by testing if it matches the `urlPattern`.

### API Request
- If `inputValue` is valid, makes a POST request to the API server using the `fetch` function.
- Sets `apiUrl` to the `COMPLET_BACK_URL` obtained from the environment variable.
- Performs the request with the appropriate headers and `inputValue` as `original_url` in the request body.

### Handling Response
- If the server response is ok (status code 200-299), extracts response data using `response.json()`.
- Calls `revalidatePath('/')` to trigger a revalidation of the home page.
- Returns an object with the `data` property set to the response data.

### Handling Error
- If the server response is not ok, extracts error response data using `response.json()`.
- Logs the error message to the console.
- Returns an object with the `message` property set to the error message.

### Handling Request Error
- Catches errors that occur while making the API request.
- Logs the error to the console.
- Returns an object with the `message` property set to an error message.

### Invalid Input
- If `inputValue` is not valid, returns an object with the `message` property set to a validation error message.

### Summary
This server action function is responsible for making a POST request to the API server  with the user-provided URL. It handles the response and error cases, returning relevant data or error messages.

## 2. `Form.jsx`

### State Variables
- `fresponse`: Represents the response received after performing the form action.
- `inputValue`: Represents the value entered in the input field.
- `existingUrls`: Obtained from `SharedStateContext` represent the urls generated in thhe browser.

### Event Handler
- `handleInputChange`: Handles changes in the input field, updating state variables.

### Data Uniqueness Check
- `isDataUnique`: Checks if new data received after the form action is already present in `existingUrls`.

### Form Action Function
- `formAction`: Asynchronous function taking `formData` as a parameter used to triger the server action on the frontend server.
- Calls `addUrl` with `formData` and stores the response in the `res` variable.
- Updates `fresponse` with the error response if present.
- Checks data uniqueness on the locacl storage of the browser using `isDataUnique` .
- If data is unique, adds it to `existingUrls` and local storage of the browser.
- If data is not unique and the error message is "found in the DB," reorders existing data so the last searched url appears first.
- If data is not unique and the error message is different, logs it as a warning.
- Resets `inputValue` and `fresponse` state variables.

### Summary
This component renders a form, handles input changes, performs form action by trigiring the `addUrl` function, and updates state based on the response. It displays any error messages received.

## 3. `UrlList.jsx`

### Function Component Definition
- Defines the `UrlList` function component.

### State Variable
- `existingUrls`: Obtained from `SharedStateContext`.

### Environment Variables
- `NAMESPACE`: Assigned the value of `NEXT_PUBLIC_NAMESPACE` environment variable.
- `COMPLET_BACK_URL`: Assigned the value of `NEXT_PUBLIC_COMPLET_BACK_URL` environment variable.

### Copy Click Handler
- `handleCopyClick`: Handles click event when copying the URL to the clipboard using `navigator.clipboard.writeText()`.

### Component Markup
- Renders a list of URLs.
- Each URL has an option to copy and open in a new tab.
- Displays toast notifications for successful URL copy.

### Summary
This component renders a list of URLs that are stored on the local storage of the browser, handles copy click events, and displays toast notifications for successful copy.

## Getting Started

To launch the Next.js app for the URL shortener project, you can follow the steps below. Ensure that you have Node.js and npm installed on your machine.

### Direct Launch
 after cloning the project and accessing this folder run 
1. **Install Dependencies:**
   ```bash
   npm install
   ```
2. **Configure Environment Variables:**
    Create a .env.local file in the project root and set the following environment variables:
    ```bash
   NEXT_PUBLIC_NAMESPACE=your_namespace
   NEXT_PUBLIC_COMPLET_BACK_URL=http://your-backend-url
   ```
3. **Run the App:**
   ```bash
   npm run dev
   ```
The app will be accessible at http://localhost:3000.

### Launch Using Docker

If you prefer using Docker, follow these steps:
1. **Build the Docker Image::**
   ```bash
   docker build -t url-shortener-front .
   ```
2. **Run the Docker Container:**
    ```bash
   docker run -p 3000:3000 url-shortener-front
   ```

The app will be accessible at http://localhost:3000.