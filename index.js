// main entry point for the application
// Filename: index.js

// Import the express library, which is a framework for building web applications in Node.js
const express = require('express');
// Import the body-parser library, which helps in parsing incoming request bodies
const bodyParser = require('body-parser');

// Create an instance of an Express application
const app = express();

// Define the port number the server will listen on.
// It uses the PORT environment variable if available (for hosting platforms), otherwise defaults to 3000
const PORT = process.env.PORT || 3000;

// Use bodyParser middleware to parse JSON formatted request bodies
app.use(bodyParser.json());

/**
 * Route handler for GET requests to the /bfhl endpoint.
 * This provides a helpful message when accessing the URL in a browser.
 */
app.get('/bfhl', (req, res) => {
    // Send a simple JSON response with a 200 OK status
    res.status(200).json({
        "operation_code": 1,
        "message": "This is a GET request. The main API logic is on the POST request at this same endpoint. Please use a tool like Thunder Client or Postman to make a POST request."
    });
});

/**
 * Route handler for POST requests to the /bfhl endpoint.
 * This is the core logic of the API.
 */
app.post('/bfhl', (req, res) => {
    try {
        // Extract the 'data' array from the request body
        const data = req.body.data;

        // --- User Information (as per requirements) ---
        // These are your personal details.
        const user_id = "n_saran_09072004";
        const email = "n.sarancs@gmail.com";
        const roll_number = "22BCE1592";

        // --- Data Processing ---
        // Initialize arrays to hold the categorized data
        const odd_numbers = [];
        const even_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let sum = 0;

        // Loop through each item in the input 'data' array
        data.forEach(item => {
            // Check if the item is a number (or a string that can be converted to a number)
            if (!isNaN(item)) {
                const num = parseInt(item, 10);
                sum += num; // Add to the sum
                if (num % 2 === 0) {
                    even_numbers.push(String(num)); // Add to even numbers array
                } else {
                    odd_numbers.push(String(num)); // Add to odd numbers array
                }
            }
            // Check if the item is an alphabet (case-insensitive)
            else if (typeof item === 'string' && /^[a-zA-Z]+$/.test(item)) {
                alphabets.push(item.toUpperCase()); // Convert to uppercase and add to alphabets array
            }
            // If it's not a number or an alphabet, consider it a special character
            else {
                special_characters.push(item);
            }
        });
        
        // --- Concatenated String Logic ---
        // 1. Filter out only the alphabetical characters from the original data array
        const allChars = data.filter(item => typeof item === 'string' && /^[a-zA-Z]+$/.test(item));
        // 2. Join them into a single string, reverse it, and then process for alternating caps
        const reversedString = allChars.join('').split('').reverse().join('');
        
        let concat_string = '';
        for (let i = 0; i < reversedString.length; i++) {
            if (i % 2 === 0) {
                concat_string += reversedString[i].toUpperCase(); // Uppercase for even indices
            } else {
                concat_string += reversedString[i].toLowerCase(); // Lowercase for odd indices
            }
        }


        // --- Construct the Response ---
        // Create the JSON response object with all the processed data
        const response = {
            is_success: true,
            user_id: user_id,
            email: email,
            roll_number: roll_number,
            odd_numbers: odd_numbers,
            even_numbers: even_numbers,
            alphabets: alphabets,
            special_characters: special_characters,
            sum: String(sum),
            concat_string: concat_string
        };

        // Send the successful response with a 200 status code
        res.status(200).json(response);

    } catch (error) {
        // --- Error Handling ---
        // If any error occurs during the process, log it to the console
        console.error("Error processing request:", error);
        // Send a response with a 500 Internal Server Error status code
        res.status(500).json({
            is_success: false,
            error: "An internal server error occurred."
        });
    }
});

/**
 * Starts the server and makes it listen for incoming requests on the specified port.
 */
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
