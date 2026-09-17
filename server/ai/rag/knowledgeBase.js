const fs = require("fs");
const path = require("path");

const KNOWLEDGE_DIR = path.join(__dirname, "knowledge");

const categoryFromFilename = (filename) => {
  const name = path.basename(filename, path.extname(filename));
  const map = {
    "hr-interview": "hr-interview",
    "behavioral-interview": "behavioral-interview",
    "technical-interview": "technical-interview",
    "dsa": "technical-interview",
    "webdev": "technical-interview",
    "dbms": "technical-interview",
    "aptitude": "aptitude",
    "resume-tips": "resume",
    "operating-systems": "technical-interview",
    "computer-networks": "technical-interview",
    "javascript-deep": "technical-interview",
    "python-interview": "technical-interview",
    "java-interview": "technical-interview",
    "soft-skills": "behavioral-interview",
    "placement-guide": "placement",
    "c-cpp-interview": "technical-interview",
    "sql-queries": "technical-interview",
    "system-design": "technical-interview",
    "git-devops": "technical-interview",
    "machine-learning": "technical-interview",
    "cloud-devops": "technical-interview",
    "software-engineering": "technical-interview",
    "verbal-aptitude": "aptitude",
  };
  return map[name] || "general";
};

const parseMarkdownFile = (filePath) => {
  const raw = fs.readFileSync(filePath, "utf-8");
  const filename = path.basename(filePath, path.extname(filePath));

  // Split by ## headings to create one article per section
  const sections = raw.split(/^## /m).filter(Boolean);
  const articles = [];

  for (const section of sections) {
    const lines = section.trim().split("\n");
    let title = lines[0].replace(/^#+\s*/, "").trim();
    const content = lines
      .slice(1)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();

    if (!content || content.length < 20) continue;

    // If this is the first section (before any ##), it's the # heading
    if (title.startsWith("# ")) {
      title = title.replace(/^#+\s*/, "").trim();
    }

    articles.push({
      id: `${filename}-${articles.length}`,
      title,
      category: categoryFromFilename(filePath),
      content,
    });
  }

  return articles;
};

const loadKnowledgeBase = () => {
  if (!fs.existsSync(KNOWLEDGE_DIR)) {
    console.warn(`⚠ Knowledge directory not found: ${KNOWLEDGE_DIR}`);
    return [];
  }

  const files = fs
    .readdirSync(KNOWLEDGE_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => path.join(KNOWLEDGE_DIR, f));

  const articles = files.flatMap(parseMarkdownFile);
  console.log(`  📚 Loaded ${articles.length} knowledge articles from ${files.length} files`);
  return articles;
};

const knowledgeBase = loadKnowledgeBase();

module.exports = { knowledgeBase };
