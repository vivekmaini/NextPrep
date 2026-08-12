const chunkText = (text, maxCharacters = 700) => {
  const sentences = text.replace(/\s+/g, " ").trim().match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [];
  const chunks = [];
  let chunk = "";
  for (const sentence of sentences) {
    const next = `${chunk} ${sentence.trim()}`.trim();
    if (chunk && next.length > maxCharacters) {
      chunks.push(chunk);
      chunk = sentence.trim();
    } else {
      chunk = next;
    }
  }
  if (chunk) chunks.push(chunk);
  return chunks;
};

module.exports = { chunkText };
