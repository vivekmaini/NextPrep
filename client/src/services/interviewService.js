import api from "./api";

export const evaluateInterviewAnswer = async (payload) => {
  const { data } = await api.post("/interviews/evaluate", payload);
  return data;
};

export const completeInterview = async (payload) => {
  const { data } = await api.post("/interviews/complete", payload);
  return data;
};
export const startInterview = async (payload) => {
  const { data } = await api.post("/interviews/start", payload);
  return data;
};
