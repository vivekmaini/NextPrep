import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { startInterview } from "../../services/interviewService";

const modes = ["Behavioral", "Technical", "HR round"];

export default function InterviewPractice() {
  const [mode, setMode] = useState("Behavioral");
  const [difficulty, setDifficulty] = useState("Balanced");
  const [targetRole, setTargetRole] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("Student / Fresher");
  const [skills, setSkills] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const begin = async () => {
    if (mode !== "Technical") return navigate("/interview", { state: { mode, difficulty } });
    if (targetRole.trim().length < 2) return setError("Add the technical role you are preparing for.");
    setLoading(true); setError("");
    try { const data = await startInterview({ mode, difficulty, targetRole: targetRole.trim(), experienceLevel, skills: skills.trim() }); navigate("/interview", { state: { mode, difficulty, targetRole: targetRole.trim(), experienceLevel, skills: skills.trim(), questions: data.questions } }); }
    catch (requestError) { setError(requestError.message || "Couldn’t create your tailored interview."); }
    finally { setLoading(false); }
  };
  return <section><p className="text-xs font-bold tracking-[0.14em] text-[#0057FF]">AI MOCK INTERVIEW</p><h1 className="mt-3 font-display text-4xl font-bold tracking-[-0.06em] sm:text-5xl">Practice like it&apos;s real.</h1><p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">Choose an interview style. Technical sessions adapt questions to your role, experience, and skills.</p><div className="mt-10 grid gap-4 md:grid-cols-3">{modes.map((item) => <button key={item} onClick={() => { setMode(item); setError(""); }} className={`rounded-2xl border p-5 text-left text-sm font-bold ${mode === item ? "border-[#0057FF] bg-[#EAF1FF] text-[#0057FF]" : "border-slate-200 bg-white text-slate-600"}`}>{item}</button>)}</div><article className="mt-6 rounded-[24px] border border-[#D8E5FF] bg-white p-6 sm:p-7">{mode === "Technical" ? <><p className="text-xs font-bold tracking-[0.13em] text-[#0057FF]">TECHNICAL PROFILE</p><h2 className="mt-2 font-display text-2xl font-bold">Tailor the technical round</h2><div className="mt-5 grid gap-5 sm:grid-cols-2"><label className="text-sm font-bold">Target role<input value={targetRole} onChange={(event) => setTargetRole(event.target.value)} maxLength={120} placeholder="e.g. React Developer Intern" className="mt-2 w-full rounded-xl border border-slate-200 bg-[#FBFAF8] p-3 text-sm font-normal outline-none focus:border-[#0057FF]" /></label><label className="text-sm font-bold">Experience level<select value={experienceLevel} onChange={(event) => setExperienceLevel(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-[#FBFAF8] p-3 text-sm font-normal outline-none focus:border-[#0057FF]">{["Student / Fresher", "Junior", "Mid-level", "Senior"].map((item) => <option key={item}>{item}</option>)}</select></label></div><label className="mt-5 block text-sm font-bold">Skills or topics <span className="font-medium text-slate-400">(optional)</span><input value={skills} onChange={(event) => setSkills(event.target.value)} maxLength={500} placeholder="e.g. React, JavaScript, REST APIs" className="mt-2 w-full rounded-xl border border-slate-200 bg-[#FBFAF8] p-3 text-sm font-normal outline-none focus:border-[#0057FF]" /></label></> : <><p className="text-xs font-bold tracking-[0.13em] text-[#0057FF]">{mode.toUpperCase()} SESSION</p><h2 className="mt-2 font-display text-2xl font-bold">Five focused questions</h2><p className="mt-3 text-sm leading-6 text-slate-500">A structured {mode.toLowerCase()} session with complete feedback after your final answer.</p></>}<div className="mt-6 flex flex-wrap gap-2">{["Gentle", "Balanced", "Stretch"].map((item) => <button key={item} onClick={() => setDifficulty(item)} className={`rounded-full px-4 py-2 text-xs font-bold ${difficulty === item ? "bg-[#16213d] text-white" : "bg-slate-100 text-slate-500"}`}>{item}</button>)}</div>{error && <p className="mt-4 text-sm font-semibold text-[#C63D32]">{error}</p>}<button disabled={loading} onClick={begin} className="mt-7 rounded-xl bg-[#0057FF] px-5 py-3 text-sm font-bold text-white disabled:opacity-60">{loading ? "Creating your interview…" : mode === "Technical" ? "Create technical interview →" : "Start full interview →"}</button></article></section>;
}
