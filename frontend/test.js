// Load environment variables from .env file
require('dotenv').config();
const axios = require('axios');

// Ensure your environment variable is set as API_KEY
const apiKey = process.env.API_KEY; // Make sure this matches your .env file
const azureEndpoint = "https://aasare-new.openai.azure.com/";
const apiVersion = "2024-02-15-preview";

async function getResponse(question) {
    const headers = {
        'Content-Type': 'application/json',
        'api-key': apiKey,
    };

    const data = {
        model: "aasare-new",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: question },
        ]
    };

    try {
        const response = await axios.post(`${azureEndpoint}openai/deployments/aasare-35/chat/completions?api-version=${apiVersion}`, data, { headers });
        return response.data.choices[0].message.content;
    } catch (error) {
        if (error.response) {
            console.error(`Error: ${error.response.status} - ${error.response.data.error.message}`);
        } else {
            console.error(`An error occurred: ${error.message}`);
        }
        return null;
    }
}

// Example usage
(async () => {
    const question = "What pesticide should I use for aphids?";
    const response = await getResponse(question);
    console.log(response);
})();
