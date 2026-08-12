import api from "./api";

export const uploadResume = async ({ file, targetRole, jobDescription }) => {
  const formData = new FormData();
  formData.append("resume", file);
  if (targetRole.trim()) formData.append("targetRole", targetRole.trim());
  if (jobDescription.trim()) formData.append("jobDescription", jobDescription.trim());
  const { data } = await api.post("/resumes/upload", formData, { headers: { "Content-Type": "multipart/form-data" } });
  return data;
};

export const getLatestResume = async () => {
  const { data } = await api.get("/resumes/latest");
  return data;
};
