require('dotenv').config();
const { buildRagContext } = require('./ai/rag/retrievalService');
const { generateJson } = require('./ai/llm/localLLMService');

(async () => {
  console.log("Starting Groq & Local RAG Speed Test...");
  console.time('Total Time');

  console.time('1. RAG Indexing (Local Transformers.js)');
  try {
    await buildRagContext("React architecture", 1);
  } catch(e) { console.log("RAG Error:", e.message); }
  console.timeEnd('1. RAG Indexing (Local Transformers.js)');

  console.time('2. Groq LLM Generation (Llama 3)');
  try {
    const res = await generateJson({
      systemPrompt: "You are a test bot.",
      prompt: "Say hello and give a random number.",
      schema: { type: "object", properties: { msg: { type: "string" }, number: { type: "number" } }, required: ["msg", "number"] }
    });
    console.log("✅ Groq Output:", res);
  } catch(e) { console.log("❌ LLM Error:", e.message); }
  console.timeEnd('2. Groq LLM Generation (Llama 3)');

  console.timeEnd('Total Time');
})();
