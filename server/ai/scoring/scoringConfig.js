const asWeight = (value, fallback) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : fallback;
};

const getResumeScoringWeights = () => ({
  sections: asWeight(process.env.RESUME_SCORE_SECTIONS, 30),
  skills: asWeight(process.env.RESUME_SCORE_SKILLS, 20),
  impact: asWeight(process.env.RESUME_SCORE_IMPACT, 20),
  length: asWeight(process.env.RESUME_SCORE_LENGTH, 15),
  contact: asWeight(process.env.RESUME_SCORE_CONTACT, 15),
});

module.exports = { getResumeScoringWeights };
