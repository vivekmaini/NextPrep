const { parseResume } = require("../nlp/resumeParser");
const { extractSkills } = require("../nlp/skillExtractor");
const { getResumeScoringWeights } = require("./scoringConfig");

const clamp = (value, min = 0, max = 100) => Math.max(min, Math.min(max, value));
const wordsIn = (text) => text.trim().split(/\s+/).filter(Boolean).length;

const calculateResumeScore = (text, parsedResume, skills) => {
  const weights = getResumeScoringWeights();
  const hasContact = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}|\+?\d[\d\s()-]{7,}\d/i.test(text);
  const coreSections = ["education", "experience", "projects", "skills"];
  const sectionScore = Math.round((coreSections.filter((name) => parsedResume.sectionNames.includes(name)).length / coreSections.length) * weights.sections);
  const skillScore = Math.min(weights.skills, skills.length * (weights.skills / 10));
  const impactScore = Math.min(weights.impact, (text.match(/\b\d+(?:\.\d+)?(?:%|\+|x)\b|\b(increased|reduced|improved|built|launched|delivered|led)\b/gi) || []).length * (weights.impact / 10));
  const lengthScore = wordsIn(text) >= 250 && wordsIn(text) <= 900 ? weights.length : wordsIn(text) >= 150 ? Math.round(weights.length * 0.6) : Math.round(weights.length * 0.2);
  return clamp(Math.round(sectionScore + skillScore + impactScore + lengthScore + (hasContact ? weights.contact : 0)));
};

const calculateJobMatch = (resumeSkills, jobDescription) => {
  if (!jobDescription.trim()) return { jobDescriptionProvided: false, jobMatchScore: 0, missingKeywords: [] };
  const jobSkills = extractSkills(jobDescription);
  if (!jobSkills.length) return { jobDescriptionProvided: true, jobMatchScore: 0, missingKeywords: [] };
  const resumeSet = new Set(resumeSkills.map((skill) => skill.toLowerCase()));
  const matched = jobSkills.filter((skill) => resumeSet.has(skill.toLowerCase()));
  return {
    jobDescriptionProvided: true,
    jobMatchScore: Math.round((matched.length / jobSkills.length) * 100),
    missingKeywords: jobSkills.filter((skill) => !resumeSet.has(skill.toLowerCase())).slice(0, 8),
  };
};

const analyseResumeDeterministically = (text, jobDescription = "") => {
  const parsedResume = parseResume(text);
  const skills = extractSkills(text);
  return {
    atsScore: calculateResumeScore(text, parsedResume, skills),
    skills,
    sectionNames: parsedResume.sectionNames,
    ...calculateJobMatch(skills, jobDescription),
  };
};

module.exports = { analyseResumeDeterministically };
