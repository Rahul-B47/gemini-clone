# Gemini Clone 🔮

A Gemini-style chatbot web application built with **React**, **Vite**, and integrates **Google Gemini API (Generative AI)** for intelligent conversation.

---

### 🌐 Live Demo

🚀 Check out the live version of Gemini Clone here:  
🔗 [https://gemini-clone13.netlify.app/](https://gemini-clone13.netlify.app/)

## 🚀 Features

- 🧠 Gemini 1.5 Pro / Flash API integration
- ⚛️ React + Vite fast refresh development setup
- 💬 Chat interface with prompt input and dynamic response
- 🌐 API calling with error handling (quota exceeded, bad request, etc.)
- 📦 Clean structure to extend with authentication, memory, or styling

---

## 📁 Project Structure


gemini-clone/
├── public/ # Static files
├── src/
│ ├── components/ # Reusable components (e.g., ChatBox, InputField)
│ ├── App.jsx # Main React component
│ ├── gemini.js # Google Gemini API request logic
│ └── main.jsx # Entry point
├── .gitignore
├── index.html
├── package.json # Project metadata and scripts
├── README.md
└── vite.config.js # Vite configuration

yaml

---

## 🛠️ Setup Instructions

### ✅ 1. Clone the Repository


✅ 2. Install Dependencies
Make sure you have Node.js installed.

bash
Copy
Edit
npm install
✅ 3. Add Google Gemini API Key
Open src/gemini.js and replace with your API key:

js
Copy
Edit
const MODEL_NAME = "gemini-1.5-flash";  // or gemini-1.5-pro
const API_KEY = "YOUR_ACTUAL_API_KEY_HERE";
🔑 You can get your API key from: https://makersuite.google.com/app/apikey

✅ 4. Run the Application Locally
bash
Copy
Edit
npm run dev
Then open http://localhost:5173 in your browser.

✅ 5. Build for Production
bash
Copy
Edit
npm run build
To preview the production build:

bash
Copy
Edit
npm run preview
🧪 Example Prompts
What is DBMS?

Explain computer networks.

Give a Java program for Fibonacci series.

🧾 License
This project is licensed under the MIT License.

👨‍💻 Author
Developed by Rahul  Poojary

