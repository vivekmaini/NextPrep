const SKILL_TAXONOMY = [
  "JavaScript", "TypeScript", "Python", "Java", "C++", "C#", "PHP", "Go", "Rust", "SQL",
  "React", "Angular", "Vue", "Next.js", "Node.js", "Express", "Django", "Flask", "Spring Boot", ".NET",
  "HTML", "CSS", "Tailwind CSS", "Bootstrap", "REST API", "GraphQL", "Microservices",
  "PostgreSQL", "MySQL", "MongoDB", "Redis", "Firebase", "SQLite",
  "Git", "GitHub", "Docker", "Kubernetes", "Linux", "AWS", "Azure", "Google Cloud", "CI/CD", "Jenkins",
  "Figma", "Jest", "Cypress", "Selenium", "Postman", "Agile", "Scrum",
  "Data Structures", "Algorithms", "Machine Learning", "Deep Learning", "NLP", "Pandas", "NumPy", "TensorFlow", "PyTorch",
];

const escaped = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const matchesSkill = (text, skill) => new RegExp(`(^|[^a-z0-9+#.])${escaped(skill)}(?=$|[^a-z0-9+#.])`, "i").test(text);

const extractSkills = (text) => SKILL_TAXONOMY.filter((skill) => matchesSkill(text, skill));

module.exports = { extractSkills, SKILL_TAXONOMY };
