import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const MODEL_NAME = "gemini-1.5-pro";  // Use a valid model name
const API_KEY = "AIzaSyD82WkKdWvWJzAVd8_CP3uWuiMwPnFtXsM";  // Replace with your actual API key

const runChat = async (prompt) => {
    try {
        const API_KEY = "AIzaSyD82WkKdWvWJzAVd8_CP3uWuiMwPnFtXsM";  // Ensure your API key is valid
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${API_KEY}`;

        const requestBody = {
            contents: [{ parts: [{ text: prompt }] }] // Corrected format
        };

        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP Error: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const data = await response.json();
        console.log("Full API Response:", data);

        return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from API";
    } catch (error) {
        console.error("Error in runChat:", error);
        return "API request failed";
    }
};


export default runChat;
