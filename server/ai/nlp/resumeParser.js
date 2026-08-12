const SECTION_PATTERNS = {
  summary: /^(summary|profile|objective|professional summary)$/i,
  education: /^(education|academic background|qualifications)$/i,
  experience: /^(experience|work experience|employment|professional experience)$/i,
  projects: /^(projects|personal projects|academic projects)$/i,
  skills: /^(skills|technical skills|core competencies|technologies)$/i,
  certifications: /^(certifications|certificates|licenses)$/i,
  achievements: /^(achievements|awards|accomplishments)$/i,
};

const normaliseLine = (line) => line.replace(/\s+/g, " ").trim();

const parseResume = (text) => {
  const sections = Object.fromEntries(Object.keys(SECTION_PATTERNS).map((key) => [key, []]));
  let activeSection = "other";

  for (const rawLine of text.split(/\r?\n/)) {
    const line = normaliseLine(rawLine);
    if (!line) continue;
    const section = Object.entries(SECTION_PATTERNS).find(([, pattern]) => pattern.test(line.replace(/:$/, "")))?.[0];
    if (section) {
      activeSection = section;
    } else if (sections[activeSection]) {
      sections[activeSection].push(line);
    }
  }

  return {
    sections: Object.fromEntries(Object.entries(sections).map(([name, lines]) => [name, lines.join(" ")])),
    sectionNames: Object.entries(sections).filter(([, lines]) => lines.length > 0).map(([name]) => name),
  };
};

module.exports = { parseResume };
