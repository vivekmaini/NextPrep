require('dotenv').config();
(async () => {
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
    const data = await res.json();
    console.log("Available Embedding Models:");
    data.models.filter(m => m.supportedGenerationMethods.includes("embedContent")).forEach(m => console.log(m.name));
  } catch(e) {
    console.error(e);
  }
})();
