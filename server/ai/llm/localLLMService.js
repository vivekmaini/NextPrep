const { getLocalLLMConfig } = require("./modelConfig");

const localModelUnavailable = () => {
  const error = new Error("The local AI model is unavailable. Start Ollama and make sure LOCAL_LLM_MODEL has been downloaded.");
  error.statusCode = 503;
  return error;
};

const parseJsonResponse = (content) => {
  if (typeof content !== "string" || !content.trim()) throw new Error("The local AI model returned an empty response.");
  const cleanContent = content.trim().replace(/^```json\s*/i, "").replace(/\s*```$/, "");
  try {
    return JSON.parse(cleanContent);
  } catch {
    const error = new Error("The local AI model returned an invalid structured response. Please try again.");
    error.statusCode = 502;
    throw error;
  }
};

/**
 * Generates validated JSON through an Ollama-compatible local inference server.
 * Domain services should use this interface instead of calling a model provider directly.
 */
const generateJson = async ({ systemPrompt, prompt, schema, temperature = 0.2 }) => {
  const { baseUrl, model, timeoutMs } = getLocalLLMConfig();
  let response;

  try {
    response = await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        stream: false,
        format: schema,
        options: { temperature },
        messages: [
          { role: "system", content: `${systemPrompt}\nReturn only valid JSON that conforms to the requested schema.` },
          { role: "user", content: prompt },
        ],
      }),
      signal: AbortSignal.timeout(timeoutMs),
    });
  } catch (cause) {
    if (cause?.name === "TimeoutError") {
      const error = new Error("The local AI model took too long to respond. Please try again.");
      error.statusCode = 504;
      throw error;
    }
    throw localModelUnavailable();
  }

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(payload?.error ? `Local AI model error: ${payload.error}` : "The local AI model could not complete this request.");
    error.statusCode = response.status >= 400 && response.status < 600 ? response.status : 502;
    throw error;
  }

  return parseJsonResponse(payload?.message?.content);
};

module.exports = { generateJson };
