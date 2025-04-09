import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = ({ children }) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [chatHistory, setChatHistory] = useState({});
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const newChat = () =>{
        setLoading(false)
        setShowResult(false)
    }

    let typingTimeout = null; // Prevents re-triggering on scroll

    // 📝 Function to simulate typing effect
    const typeResponse = (formattedText) => {
        setResultData(""); // Reset before typing
        let index = 0;

        if (!formattedText || formattedText.length === 0) return;

        clearTimeout(typingTimeout); // Ensure no overlapping typing effect
        setResultData(formattedText[0]); // Start with the first character
        index = 1;

        const typeNextChar = () => {
            if (index < formattedText.length) {
                setResultData((prev) => prev + formattedText[index]);
                index++;
                typingTimeout = setTimeout(typeNextChar, 25); // Adjust speed if needed
            } else {
                // Ensure the final result is set correctly
                setResultData(formattedText);
            }
        };

        typingTimeout = setTimeout(typeNextChar, 25); // Start loop
    };

    // ✨ Function to handle sending input to API
    const onSent = async (prompt) => {
        const finalPrompt = prompt || input.trim();
        if (!finalPrompt) return;

        if (chatHistory[finalPrompt]) {
            console.log("🔄 Showing stored response for:", finalPrompt);
            setShowResult(true);
            setRecentPrompt(finalPrompt);
            typeResponse(chatHistory[finalPrompt]); // ✅ Apply typing effect
            return;
        }

        try {
            setLoading(true);
            setShowResult(true);
            setRecentPrompt(finalPrompt);
            setPrevPrompts((prev) => [...prev, finalPrompt]);

            let response = await runChat(finalPrompt);
            if (!response) throw new Error("API request failed.");

            // ✅ Format the response (Bold & Line breaks)
            let formattedResponse = response
                .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // Bold text
                .replace(/\*/g, "<br/>") // Line breaks
                .trim(); // Remove any trailing spaces or undefined characters

            setChatHistory((prev) => ({ ...prev, [finalPrompt]: formattedResponse }));

            typeResponse(formattedResponse); // ✅ Apply typing effect

        } catch (error) {
            console.error("❌ API Request Error:", error.message);
            setResultData(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    // 📌 Function to handle previous searches
    const handlePreviousPromptClick = (prompt) => {
        if (chatHistory[prompt]) {
            console.log("🔄 Reloading previous response for:", prompt);
            setShowResult(true);
            setRecentPrompt(prompt);
            typeResponse(chatHistory[prompt]); // ✅ Show stored response with typing effect
        }
    };

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        handlePreviousPromptClick,
        newChat
    };

    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default ContextProvider;