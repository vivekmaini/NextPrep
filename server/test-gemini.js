require('dotenv').config();
const { generateJson } = require('./ai/llm/localLLMService');
const { embed } = require('./ai/embeddings/embeddingService');

(async () => {
  try {
    console.log("1. Testing LLM (Gemini 1.5 Flash)...");
    const res = await generateJson({
      systemPrompt: "You are a test bot.",
      prompt: "Say hello and give a random number.",
      schema: { type: "object", properties: { message: { type: "string" }, number: { type: "number" } }, required: ["message", "number"] }
    });
    console.log("✅ LLM SUCCESS! Response:", res);

    console.log("\n2. Testing RAG Embeddings (text-embedding-004)...");
    const emb = await embed(["This is a test document."]);
    console.log(`✅ EMBEDDING SUCCESS! Got array of length: ${emb[0].length} (Should be 768)`);
    
    console.log("\n🔥 ALL SYSTEMS CLOUD-READY! 🔥");
  } catch (e) {
    console.error("❌ FAILED:", e.message);
  }
})();
