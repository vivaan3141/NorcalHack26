import { GoogleGenAI } from "@google/genai";

// 1. Setup - Replace with your real key
const API_KEY = "AIzaSyCoDjQmr5GkdYD-UHv04EOoN0eSgPZtgyw";
const genAI = new GoogleGenAI({ apiKey: API_KEY });

const btn = document.getElementById('auditBtn');
const output = document.getElementById('output');

btn.addEventListener('click', async () => {
    const promptText = document.getElementById('promptInput').value;
    const workText = document.getElementById('workInput').value;

    if (!promptText || !workText) {
        alert("Please fill in both boxes!");
        return;
    }

    output.innerHTML = "<span class='loading'>Analyzing your work... please wait...</span>";

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const instruction = `
            Compare the STUDENT WORK against the ASSIGNMENT PROMPT.
            Provide feedback in 3 parts: 
            1. 'Met Requirements' 
            2. 'Missing Elements' 
            3. 'Suggestions for an A+'
            
            PROMPT: ${promptText}
            WORK: ${workText}
        `;

        const result = await model.generateContent(instruction);
        const response = await result.response;
        
        // Render the text result
        output.innerText = response.text();

    } catch (error) {
        output.innerHTML = "<span style='color:red'>Error: " + error.message + "</span>";
    }
});
