require('dotenv').config();
const { buildRagContext } = require('./ai/rag/retrievalService');
const { generateJson } = require('./ai/llm/localLLMService');

(async () => {
  console.log("Starting Speed Test...");
  console.time('Total Time');

  console.time('1. RAG Indexing & Retrieval (Transformers.js)');
  try {
    await buildRagContext("React and Node.js backend interview", 1);
  } catch(e) { console.log("RAG Error:", e.message); }
  console.timeEnd('1. RAG Indexing & Retrieval (Transformers.js)');

  console.time('2. Gemini LLM Generation');
  try {
    await generateJson({
      systemPrompt: "You are a test bot.",
      prompt: "Say hello.",
      schema: { type: "object", properties: { msg: { type: "string" } }, required: ["msg"] }
    });
  } catch(e) { console.log("LLM Error:", e.message); }
  console.timeEnd('2. Gemini LLM Generation');

  console.timeEnd('Total Time');
})();
