const { getLocalLLMConfig } = require("./llm/modelConfig");
const { getEmbeddingConfig } = require("./embeddings/embeddingService");
const { ensureKnowledgeIndex } = require("./rag/retrievalService");

const warmModel = async (baseUrl, model, timeoutMs) => {
  try {
    await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        stream: false,
        keep_alive: "30m",
        options: { num_predict: 1 },
        messages: [{ role: "user", content: "hi" }],
      }),
      signal: AbortSignal.timeout(timeoutMs),
    });
    console.log(`   Model loaded: ${model}`);
  } catch {
    console.warn(`   Could not warm model: ${model}`);
  }
};

const warmEmbeddingModel = async (baseUrl, model, timeoutMs) => {
  try {
    await fetch(`${baseUrl}/api/embed`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model, input: ["warmup"], keep_alive: "30m" }),
      signal: AbortSignal.timeout(timeoutMs),
    });
    console.log(`  ✓ Embedding model loaded: ${model}`);
  } catch {
    console.warn(`  ⚠ Could not warm embedding model: ${model}`);
  }
};

const warmup = async () => {
  console.log("\n Warming up AI models...");
  const llmConfig = getLocalLLMConfig();
  const embConfig = getEmbeddingConfig();

  await warmEmbeddingModel(embConfig.baseUrl, embConfig.model, embConfig.timeoutMs);

  try {
    await ensureKnowledgeIndex();
    console.log("   Knowledge index built");
  } catch {
    console.warn("   Could not build knowledge index");
  }

  await warmModel(llmConfig.baseUrl, llmConfig.model, llmConfig.timeoutMs);

  console.log(" AI warmup complete\n");
};

module.exports = { warmup };
