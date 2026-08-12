const { embed, getEmbeddingConfig } = require("../embeddings/embeddingService");
const { knowledgeBase } = require("./knowledgeBase");
const { chunkText } = require("./textChunker");

let indexedChunks = [];
let indexedModel = "";
let indexingPromise;

const cosineSimilarity = (a, b) => {
  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;
  for (let index = 0; index < a.length; index += 1) {
    dotProduct += a[index] * b[index];
    magnitudeA += a[index] ** 2;
    magnitudeB += b[index] ** 2;
  }
  return magnitudeA && magnitudeB ? dotProduct / (Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB)) : 0;
};

const sourceChunks = () => knowledgeBase.flatMap((document) => chunkText(document.content).map((content, index) => ({
  id: `${document.id}-${index}`,
  title: document.title,
  category: document.category,
  content,
})));

const ensureKnowledgeIndex = async () => {
  const { model } = getEmbeddingConfig();
  if (indexedChunks.length && indexedModel === model) return indexedChunks;
  if (!indexingPromise) {
    indexingPromise = (async () => {
      const chunks = sourceChunks();
      const embeddings = await embed(chunks.map((chunk) => chunk.content));
      indexedChunks = chunks.map((chunk, index) => ({ ...chunk, embedding: embeddings[index] }));
      indexedModel = model;
      indexingPromise = undefined;
      return indexedChunks;
    })().catch((error) => {
      indexingPromise = undefined;
      throw error;
    });
  }
  return indexingPromise;
};

const retrieveRelevantKnowledge = async (query, limit = 3) => {
  const [queryEmbedding] = await embed(query);
  const chunks = await ensureKnowledgeIndex();
  return chunks
    .map(({ embedding, ...chunk }) => ({ ...chunk, score: cosineSimilarity(queryEmbedding, embedding) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};

const buildRagContext = async (query, limit = 3) => {
  const results = await retrieveRelevantKnowledge(query, limit);
  return results.map((result) => `[${result.title}]\n${result.content}`).join("\n\n");
};

module.exports = { buildRagContext, retrieveRelevantKnowledge };
