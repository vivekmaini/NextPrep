import { useEffect, useRef, useState } from "react";
import { getLatestResume, uploadResume } from "../services/resumeService";

const ACCEPTED_TYPES = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function Resume() {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [targetRole, setTargetRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [resume, setResume] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [copied, setCopied] = useState(false);
  const [improvementsCopied, setImprovementsCopied] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    getLatestResume().then((data) => setResume(data.resume)).catch(() => setError("Couldn’t load your previous résumé analysis.")).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!uploading) {
      setLoadingStep(0);
      return undefined;
    }
    const timer = window.setInterval(() => setLoadingStep((step) => Math.min(step + 1, 3)), 1400);
    return () => window.clearInterval(timer);
  }, [uploading]);

  useEffect(() => {
    if (!resume || loading || uploading) return undefined;
    const finalScore = resume.ats_score;
    const startTime = performance.now();
    const duration = 900;
    let frame;
    const animate = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setAnimatedScore(Math.round(finalScore * eased));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    setAnimatedScore(0);
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [resume?.id, resume?.ats_score, loading, uploading]);

  const chooseFile = (nextFile) => {
    setError("");
    if (!nextFile) return;
    if (!ACCEPTED_TYPES.includes(nextFile.type) || nextFile.size > MAX_FILE_SIZE) {
      setFile(null);
      setError("Upload a PDF, DOCX, or TXT file up to 5 MB.");
      return;
    }
    setFile(nextFile);
  };

  const dropFile = (event) => {
    event.preventDefault();
    setDragging(false);
    chooseFile(event.dataTransfer.files[0]);
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!file) return setError("Choose your resume before analysing it.");
    setError("");
    setAnimatedScore(0);
    setUploading(true);
    try {
      const data = await uploadResume({ file, targetRole, jobDescription });
      setResume(data.resume);
      setFile(null);
      if (inputRef.current) inputRef.current.value = "";
    } catch (requestError) {
      setError(requestError.message || "Couldn’t analyse this resume. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const scoreTone = !resume ? "" : resume.ats_score >= 80 ? "text-[#257A5A]" : resume.ats_score >= 60 ? "text-[#B66A00]" : "text-[#C63D32]";
  const feedback = resume?.feedback || {};
  const strengths = Array.isArray(feedback.strengths) ? feedback.strengths : [];
  const missingKeywords = Array.isArray(feedback.missingKeywords) ? feedback.missingKeywords : [];
  const copyReview = async () => {
    if (!resume) return;
    const review = [
      `Résumé review: ${resume.file_name}`,
      `ATS score: ${resume.ats_score}/100`,
      feedback.jobDescriptionProvided ? `Job match: ${feedback.jobMatchScore}%` : null,
      feedback.summary ? `Summary: ${feedback.summary}` : null,
      strengths.length ? `Strengths:\n${strengths.map((item) => `• ${item}`).join("\n")}` : null,
      resume.suggestions?.length ? `Next edits:\n${resume.suggestions.map((item) => `• ${item}`).join("\n")}` : null,
      missingKeywords.length ? `Keywords to consider: ${missingKeywords.join(", ")}` : null,
    ].filter(Boolean).join("\n\n");
    try {
      await navigator.clipboard.writeText(review);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Couldn’t copy the review. Please select the text manually.");
    }
  };
  const copyImprovements = async () => {
    if (!resume?.suggestions?.length) return;
    try {
      await navigator.clipboard.writeText(`Helpful next edits\n\n${resume.suggestions.map((item, index) => `${index + 1}. ${item}`).join("\n")}`);
      setImprovementsCopied(true);
      window.setTimeout(() => setImprovementsCopied(false), 2000);
    } catch {
      setError("Couldn’t copy the improvements. Please select the text manually.");
    }
  };
  return <section>
    <div className="flex flex-wrap items-center gap-3"><p className="text-xs font-bold tracking-[0.14em] text-[#0057FF]">RÉSUMÉ REVIEW</p><span className="inline-flex items-center gap-1 rounded-full bg-[#E6EEFF] px-2.5 py-1 text-[10px] font-bold tracking-[0.08em] text-[#0057FF]">♧ PAPER-LIGHT REVIEW</span></div>
    <h1 className="mt-3 font-display text-4xl font-bold tracking-[-0.06em] sm:text-5xl">Make every application clearer.</h1>
    <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">A calmer, paper-light way to refine your next application. Upload a text-based résumé for ATS feedback, then add a job description for a more targeted review.</p>

    <form onSubmit={submit} className="mt-10 rounded-[24px] border border-[#D8E5FF] bg-white p-6 sm:p-7">
      <label htmlFor="resume" onDragOver={(event) => { event.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={dropFile} className={`block rounded-2xl border-2 border-dashed bg-[#F6F9FF] p-7 text-center transition sm:p-10 ${dragging ? "border-[#0057FF] bg-[#E6EEFF]" : "border-[#B9CEFF] hover:border-[#0057FF]"}`}>
        <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-[#E6EEFF] text-xl text-[#0057FF]" aria-hidden="true">↑</span>
        <span className="mt-4 block text-sm font-bold text-[#16213d]">{file ? file.name : "Choose a résumé to upload"}</span>
        <span className="mt-1 block text-xs leading-5 text-slate-500">Drop a file here or browse · PDF, DOCX, or TXT · Maximum 5 MB</span>
        <input ref={inputRef} id="resume" name="resume" type="file" accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain" onChange={(event) => chooseFile(event.target.files[0])} className="sr-only" />
      </label>
      <label htmlFor="targetRole" className="mt-6 block text-sm font-bold">Target role <span className="font-medium text-slate-400">(optional, but recommended)</span></label>
      <input id="targetRole" value={targetRole} onChange={(event) => setTargetRole(event.target.value)} maxLength={120} placeholder="e.g. Frontend Developer Intern" className="mt-2 w-full rounded-xl border border-slate-200 bg-[#FBFAF8] p-3.5 text-sm outline-none placeholder:text-slate-400 focus:border-[#0057FF] focus:ring-4 focus:ring-[#E6EEFF]" />
      <label htmlFor="jobDescription" className="mt-6 block text-sm font-bold">Job description <span className="font-medium text-slate-400">(optional)</span></label>
      <textarea id="jobDescription" value={jobDescription} onChange={(event) => setJobDescription(event.target.value)} maxLength={10000} placeholder="Paste the role description to check keyword alignment…" className="mt-2 min-h-28 w-full resize-y rounded-xl border border-slate-200 bg-[#FBFAF8] p-3.5 text-sm leading-6 outline-none placeholder:text-slate-400 focus:border-[#0057FF] focus:ring-4 focus:ring-[#E6EEFF]" /><p className="mt-1 text-right text-xs text-slate-400">{jobDescription.length.toLocaleString()}/10,000</p>
      {error && <p role="alert" className="mt-4 text-sm font-semibold text-[#C63D32]">{error}</p>}
      <button type="submit" disabled={uploading} className="mt-5 inline-flex rounded-xl bg-[#0057FF] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0047D1] disabled:cursor-not-allowed disabled:opacity-60">{uploading ? "Analysing résumé…" : "Analyse résumé"}</button>
    </form>

    {uploading && <section className="resume-analysis-loader mt-8 rounded-[24px] border border-[#D8E5FF] bg-white p-6 sm:p-7" aria-live="polite"><div className="flex items-start gap-4"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E6EEFF] text-xl text-[#0057FF]" aria-hidden="true"><span className="resume-loader-dot">✦</span></div><div><p className="text-xs font-bold tracking-[0.13em] text-[#0057FF]">AI REVIEW IN PROGRESS</p><h2 className="mt-2 font-display text-xl font-bold tracking-tight">{["Reading your résumé", "Checking impact and ATS structure", "Comparing role alignment", "Preparing your tailored feedback"][loadingStep]}</h2><p className="mt-2 text-sm leading-6 text-slate-500">This usually takes a few seconds. Keep this page open while we prepare your results.</p></div></div><div className="mt-6 flex gap-2">{[0, 1, 2, 3].map((step) => <span key={step} className={`h-1.5 flex-1 rounded-full transition-colors ${step <= loadingStep ? "bg-[#0057FF]" : "bg-slate-100"}`} />)}</div></section>}

    {loading ? <p className="mt-8 text-sm text-slate-500">Loading your latest analysis…</p> : resume && !uploading && <section key={resume.id} className="resume-results-enter mt-8 space-y-5"><div className="grid gap-5 lg:grid-cols-[0.75fr_1.25fr]"><article className="rounded-[24px] bg-[#16213d] p-7 text-white"><p className="text-xs font-bold tracking-[0.13em] text-blue-200">LATEST ATS SCORE</p><p className={`resume-score-pop mt-6 font-display text-7xl font-bold tracking-[-0.08em] ${scoreTone} bg-white rounded-2xl px-4 py-2 w-fit`}>{animatedScore}</p>{feedback.jobDescriptionProvided && <><p className="mt-5 text-xs font-bold tracking-[0.13em] text-blue-200">JOB MATCH</p><p className="mt-1 text-2xl font-bold">{feedback.jobMatchScore}%</p></>}<p className="mt-5 text-sm font-semibold">{resume.file_name}</p><p className="mt-2 text-sm leading-6 text-slate-300">Your score reflects structure, readability, evidence of impact, and role alignment.</p></article><article className="rounded-[24px] border border-[#E9E5DC] bg-white p-6 sm:p-7"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold tracking-[0.13em] text-[#0057FF]">RECRUITER SNAPSHOT</p><h2 className="mt-2 font-display text-2xl font-bold tracking-tight">What stands out</h2></div><button type="button" onClick={copyReview} className="shrink-0 rounded-lg border border-[#B9CEFF] px-3 py-2 text-xs font-bold text-[#0057FF] transition hover:bg-[#E6EEFF]">{copied ? "Copied!" : "Copy review"}</button></div><p className="mt-5 text-sm leading-6 text-slate-600">{feedback.summary || "Upload your résumé again to receive a detailed AI review."}</p>{strengths.length > 0 && <ul className="mt-5 space-y-3">{strengths.map((strength) => <li key={strength} className="flex gap-3 text-sm leading-6 text-slate-600"><span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E8F6EF] text-xs font-bold text-[#257A5A]">✓</span>{strength}</li>)}</ul>}</article></div><div className={`grid gap-5 ${missingKeywords.length > 0 ? "lg:grid-cols-2" : ""}`}><article className="min-h-[320px] rounded-[24px] border border-[#E9E5DC] bg-white p-6 sm:p-7"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold tracking-[0.13em] text-[#0057FF]">WHAT TO IMPROVE</p><h2 className="mt-2 font-display text-2xl font-bold tracking-tight">Helpful next edits</h2></div><button type="button" onClick={copyImprovements} className="shrink-0 rounded-lg border border-[#B9CEFF] px-3 py-2 text-xs font-bold text-[#0057FF] transition hover:bg-[#E6EEFF]">{improvementsCopied ? "Copied!" : "Copy edits"}</button></div><ul className="mt-6 grid gap-x-8 gap-y-4 xl:grid-cols-2">{resume.suggestions.map((suggestion) => <li key={suggestion} className="flex gap-3 text-sm leading-6 text-slate-600"><span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E6EEFF] text-xs font-bold text-[#0057FF]">→</span>{suggestion}</li>)}</ul></article>{missingKeywords.length > 0 && <article className="rounded-[24px] border border-[#E9E5DC] bg-white p-6 sm:p-7"><p className="text-xs font-bold tracking-[0.13em] text-[#0057FF]">ROLE KEYWORDS TO CONSIDER</p><h2 className="mt-2 font-display text-2xl font-bold tracking-tight">Address genuine gaps</h2><p className="mt-3 text-sm leading-6 text-slate-500">Only add terms you can honestly support with your experience.</p><div className="mt-5 flex flex-wrap gap-2">{missingKeywords.map((keyword) => <span key={keyword} className="rounded-full bg-[#FFF3DF] px-3 py-1.5 text-xs font-bold text-[#935A00]">{keyword}</span>)}</div></article>}</div></section>}
  </section>;
}
