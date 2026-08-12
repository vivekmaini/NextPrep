# NextPrep

AI Interview & Placement Preparation Platform

## Tech Stack

- React.js
- Node.js
- Express.js
- PostgreSQL
- Local LLM via Ollama

## Local AI setup

Résumé review and mock-interview features use a local, Ollama-compatible model through the server. The browser never connects to the model directly.

1. Install [Ollama](https://ollama.com/) and download the default model: `ollama pull qwen2.5:7b-instruct`.
2. Copy `server/.env.example` to `server/.env`. Change `LOCAL_LLM_MODEL` if you downloaded a different compatible model.
3. Start Ollama, then start the backend from the `server` directory (`npm run dev`).

The default model is `qwen2.5:7b-instruct`. You can change the base URL and model name with server-only environment variables; no API key belongs in frontend code.

## AI pipeline

Résumé scoring is deterministic: the server parses recognised résumé sections, extracts skills from a maintained taxonomy, checks quantified impact and document length, and calculates the ATS score using configurable `RESUME_SCORE_*` weights. When a job description is supplied, skill matching and missing-keyword detection are also calculated locally. Ollama generates only the recruiter-style summary, strengths, and suggested edits.

Interview generation and feedback also use a local RAG pipeline: NextPrep chunks its placement-preparation knowledge base, embeds those chunks with `nomic-embed-text`, retrieves the closest context for the request, and provides only that trusted context to the local LLM. The index is held in memory and is rebuilt automatically when the server starts or the embedding model changes.
