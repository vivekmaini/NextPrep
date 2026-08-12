const DEFAULT_BASE_URL = "http://127.0.0.1:11434";
const DEFAULT_MODEL = "qwen2.5:7b-instruct";

const asPositiveInteger = (value, fallback) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
};

const getLocalLLMConfig = () => ({
  baseUrl: (process.env.LOCAL_LLM_BASE_URL || DEFAULT_BASE_URL).replace(/\/$/, ""),
  model: process.env.LOCAL_LLM_MODEL || DEFAULT_MODEL,
  timeoutMs: asPositiveInteger(process.env.LOCAL_LLM_TIMEOUT_MS, 60000),
});

module.exports = { getLocalLLMConfig };
