const parseJsonResponse = (content) => {
  if (typeof content !== "string" || !content.trim()) throw new Error("The AI model returned an empty response.");
  const cleanContent = content.trim().replace(/^```json\s*/i, "").replace(/\s*```$/i, "");
  try {
    return JSON.parse(cleanContent);
  } catch {
    const error = new Error("The AI model returned an invalid structured response. Please try again.");
    error.statusCode = 502;
    throw error;
  }
};

/**
 * Generates validated JSON through Groq Cloud API (Llama 3) for blazing fast speeds.
 */
const generateJson = async ({ systemPrompt, prompt, schema, temperature = 0.7 }) => {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY is missing in your .env file. Please add it to deploy.");
  }

  const url = `https://api.groq.com/openai/v1/chat/completions`;

  let response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "qwen/qwen3.8-27b", // World's fastest model
        messages: [
          { 
            role: "system", 
            content: `${systemPrompt}\n\nYou MUST return ONLY valid JSON that strictly matches this exact JSON schema:\n${JSON.stringify(schema, null, 2)}` 
          },
          { 
            role: "user", 
            content: prompt 
          }
        ],
        temperature: temperature,
        response_format: { type: "json_object" } // Enforces JSON output natively
      }),
      signal: AbortSignal.timeout(30000), 
    });
  } catch (cause) {
    throw new Error(cause?.name === "TimeoutError" ? "Groq API timed out." : "Groq API is unreachable.");
  }

  const payload = await response.json().catch(() => ({}));
  
  if (!response.ok) {
    const error = new Error(`Groq AI Error: ${payload?.error?.message || "Request failed"}`);
    error.statusCode = response.status >= 400 && response.status < 600 ? response.status : 502;
    throw error;
  }

  const textContent = payload?.choices?.[0]?.message?.content;
  return parseJsonResponse(textContent);
};

module.exports = { generateJson };
