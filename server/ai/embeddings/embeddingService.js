const { getLocalLLMConfig } = require("../llm/modelConfig");

const getEmbeddingConfig = () => ({
  ...getLocalLLMConfig(),
  model: process.env.LOCAL_EMBEDDING_MODEL || "nomic-embed-text",
});

const createEmbeddingError = (message, statusCode = 503) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const embed = async (input) => {
  const inputs = Array.isArray(input) ? input : [input];
  if (!inputs.length || inputs.some((item) => typeof item !== "string" || !item.trim())) {
    throw createEmbeddingError("Text is required to create an embedding.", 400);
  }

  const { baseUrl, model, timeoutMs } = getEmbeddingConfig();
  let response;
  try {
    response = await fetch(`${baseUrl}/api/embed`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model, input: inputs }),
      signal: AbortSignal.timeout(timeoutMs),
    });
  } catch (cause) {
    if (cause?.name === "TimeoutError") throw createEmbeddingError("The local embedding model took too long to respond.", 504);
    throw createEmbeddingError("The local embedding model is unavailable. Start Ollama and download LOCAL_EMBEDDING_MODEL.");
  }

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw createEmbeddingError(payload?.error ? `Local embedding model error: ${payload.error}` : "The local embedding model could not create embeddings.", response.status || 502);
  if (!Array.isArray(payload.embeddings) || payload.embeddings.length !== inputs.length || payload.embeddings.some((vector) => !Array.isArray(vector) || !vector.length)) {
    throw createEmbeddingError("The local embedding model returned an invalid embedding response.", 502);
  }
  return payload.embeddings;
};

module.exports = { embed, getEmbeddingConfig };
