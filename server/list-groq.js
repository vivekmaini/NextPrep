require('dotenv').config();
(async () => {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    const res = await fetch("https://api.groq.com/openai/v1/models", {
      headers: { "Authorization": `Bearer ${apiKey}` }
    });
    const data = await res.json();
    
    // Find a good llama model
    const models = data.data.map(m => m.id);
    console.log("Available Groq Models:", models);
    
    const targetModel = models.find(m => m.includes("llama-3.1-8b") || m.includes("llama-3.1-70b") || m.includes("llama3")) || models[0];
    console.log("Selecting Model:", targetModel);

    // Update the file
    const fs = require('fs');
    const path = '/Users/vivekmaini/Nextprep/server/ai/llm/localLLMService.js';
    let content = fs.readFileSync(path, 'utf8');
    content = content.replace('"llama-3.3-70b-versatile"', `"${targetModel}"`);
    fs.writeFileSync(path, content);
    console.log("Model updated in localLLMService.js!");
  } catch(e) {
    console.error(e);
  }
})();
