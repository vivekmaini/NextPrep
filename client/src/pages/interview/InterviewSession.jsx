import { useState, useEffect, useRef } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { completeInterview } from "../../services/interviewService";

const questionSets = {
  Behavioral: ["Tell me about a difficult problem you solved.", "Describe a time you received difficult feedback.", "Tell me about a time you worked with conflicting priorities.", "Describe a project you are proud of and your contribution.", "What would you do differently in a past team project?"],
  Technical: ["Walk me through debugging a feature that fails only in production.", "How would you design a scalable notification system?", "Explain a technical decision you made and its trade-offs.", "How do you ensure the quality of your code?", "Describe a challenging technical concept to a non-technical stakeholder."],
  "HR round": ["Tell me about yourself.", "Why are you interested in this role?", "What are your strongest skills and one area you are improving?", "Describe the work environment where you do your best work.", "What questions would you ask the interviewer?"],
};

export default function InterviewSession() {
  const { isAuthenticated, initializing } = useAuth();
  const location = useLocation(); 
  const navigate = useNavigate();
  const { mode = "Behavioral", difficulty = "Balanced", targetRole = "", experienceLevel = "", skills = "", questions: tailoredQuestions } = location.state || {};
  
  const [questions, setQuestions] = useState(tailoredQuestions?.length > 0 ? tailoredQuestions : questionSets[mode] || questionSets.Behavioral);
  const isFetching = useRef(false);
  const textareaRef = useRef(null);

  // Exam UI states
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(15).fill(""));
  const [loading, setLoading] = useState(false);
  const [retryTrigger, setRetryTrigger] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [error, setError] = useState("");
  


  // Background question loader (Batched 5-5-5)
  useEffect(() => {
    if (questions.length > 0 && questions.length < 15 && !isFetching.current) {
      isFetching.current = true;
      const fetchMore = async () => {
        try {
          const remaining = 15 - questions.length;
          const batchSize = Math.min(5, remaining); // Request exactly 5 at a time

          const token = localStorage.getItem("token");
          const res = await fetch("http://localhost:3001/api/interviews/more", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            body: JSON.stringify({ mode, difficulty, targetRole, experienceLevel, skills, existingQuestions: questions, count: batchSize })
          });
          const data = await res.json();
          if (data.success && data.questions && data.questions.length > 0) {
            setQuestions(prev => [...prev, ...data.questions]);
          } else {
            throw new Error(data.message || "Empty questions from server");
          }
        } catch (err) { 
          console.error("Failed to load background questions, retrying in 3s...", err); 
          setTimeout(() => setRetryTrigger(prev => prev + 1), 3000); // Auto-retry after 3s
        }
        finally {
          isFetching.current = false; // Allow the next batch of 5 to trigger automatically
        }
      };
      fetchMore();
    }
  }, [questions.length, mode, difficulty, targetRole, experienceLevel, skills, retryTrigger]);

  // Auto-focus textarea on question change
  useEffect(() => {
    if (textareaRef.current && !loading && !feedback) {
      textareaRef.current.focus();
    }
  }, [index, loading, feedback]);

  if (initializing) return null; 
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (loading) return (
    <main className="fixed inset-0 z-[100] flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#F4F7FC]/80 backdrop-blur-xl">
      <div className="absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-[#0057FF]/20 blur-[80px]"></div>
      <div className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-emerald-500/20 blur-[60px]" style={{ animationDelay: '1s' }}></div>
      <div className="relative flex h-24 w-24 items-center justify-center mb-8">
        <div className="absolute inset-0 rounded-full border-[3px] border-white/10"></div>
        <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#0057FF] border-r-emerald-400 animate-[spin_1.5s_linear_infinite]"></div>
        <svg className="w-8 h-8 text-emerald-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
      </div>
      <h2 className="relative z-10 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#131A2E] drop-shadow-sm">Analyzing Performance</h2>
      <p className="relative z-10 mt-4 max-w-md text-center text-[15px] leading-loose text-[#4B5563]">
        Evaluating your answers and generating a highly personalized feedback report.
      </p>
    </main>
  );

  if (feedback) return (
    <main className="min-h-screen bg-[#F4F7FC] px-5 py-12 text-[#131A2E]">
      <section className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-[32px] bg-white p-10 sm:p-14 text-[#131A2E] shadow-sm border border-[#DCE3FA]">
           
           
           <div className="relative z-10 flex flex-col items-center justify-center text-center">
              <span className="rounded-full bg-blue-50 px-5 py-2 text-[11px] font-extrabold tracking-widest text-[#0057FF] border border-[#DCE3FA] backdrop-blur-md uppercase shadow-sm">Interview Analysis Complete</span>
              <div className="mt-10 flex items-baseline justify-center gap-1">
                 <span className="font-['Outfit'] text-[100px] sm:text-[120px] font-extrabold leading-none tracking-tighter text-[#131A2E]">{feedback.overallScore}</span>
                 <span className="font-['Outfit'] text-2xl font-bold text-[#6B7280]">/100</span>
              </div>
              <p className="mt-8 max-w-2xl text-[16px] leading-loose text-[#4B5563]">{feedback.summary}</p>
           </div>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <article className="group relative overflow-hidden rounded-[28px] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#DCE3FA] transition-all hover:shadow-emerald-500/10 hover:border-emerald-200">
            <div className="absolute top-0 right-0 h-40 w-40 bg-emerald-50/50 rounded-bl-full -z-10 transition-all duration-500 group-hover:scale-110"></div>
            <h2 className="font-['Manrope'] text-xl font-bold text-[#131A2E] flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 shadow-inner">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              </div>
              What worked well
            </h2>
            <ul className="mt-8 space-y-5">
              {feedback.strengths?.length > 0 
                ? feedback.strengths.map((item, idx) => <li key={idx} className="flex gap-4 text-[15px] leading-relaxed text-slate-600"><span className="text-emerald-500 mt-1">✦</span><span>{item}</span></li>)
                : <li className="text-[15px] italic text-slate-400">No specific strengths detected. Try giving longer, more detailed answers next time!</li>}
            </ul>
          </article>
          
          <article className="group relative overflow-hidden rounded-[28px] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#DCE3FA] transition-all hover:shadow-blue-500/10 hover:border-blue-200">
            <div className="absolute top-0 right-0 h-40 w-40 bg-blue-50/50 rounded-bl-full -z-10 transition-all duration-500 group-hover:scale-110"></div>
            <h2 className="font-['Manrope'] text-xl font-bold text-[#131A2E] flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-[#0057FF] shadow-inner">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              </div>
              Areas to improve
            </h2>
            <ul className="mt-8 space-y-5">
              {feedback.improvements?.length > 0
                ? feedback.improvements.map((item, idx) => <li key={idx} className="flex gap-4 text-[15px] leading-relaxed text-slate-600"><span className="text-[#0057FF] mt-1">→</span><span>{item}</span></li>)
                : <li className="text-[15px] italic text-slate-400">Provide more detailed answers to get personalized improvements.</li>}
            </ul>
          </article>
        </div>

        <div className="mt-10 flex justify-center">
          <button onClick={() => navigate("/dashboard")} className="group flex items-center gap-3 rounded-xl bg-white border border-[#DCE3FA] px-8 py-4 text-sm font-bold text-[#6B7280] shadow-sm transition-all hover:bg-[#EAEEFC] hover:text-[#3355E8] active:scale-95">
            <svg className="w-5 h-5 text-slate-400 group-hover:translate-x-[-4px] transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Dashboard
          </button>
        </div>
      </section>
    </main>
  );

  const handleFinish = async () => {
    const finalResponses = [];
    for (let i = 0; i < 15; i++) {
      finalResponses.push({ question: questions[i] || `Question ${i+1}`, answer: (answers[i] || "").trim() || "Skipped" });
    }
    
    setLoading(true); 
    try { 
      const data = await completeInterview({ mode, difficulty, targetRole, experienceLevel, skills, responses: finalResponses }); 
      setFeedback(data.feedback); 
    } catch (requestError) { 
      setError(requestError.message || "Couldn’t finish the interview review."); 
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <main className="min-h-screen bg-[#F4F7FC] px-4 py-8 font-sans text-[#131A2E] selection:bg-blue-200">
      <div className="mx-auto max-w-[1200px] flex flex-col lg:flex-row gap-6 lg:gap-8">
        
        {/* Main Question Area */}
        <section className="flex-1 flex flex-col">
          
          {/* Header Bar */}
          <header className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm border border-[#DCE3FA] mb-6">
            <button onClick={() => navigate("/dashboard")} className="flex items-center gap-2 text-[13px] font-bold text-slate-500 hover:text-[#0057FF] transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              Exit Interview
            </button>
            <div className="flex items-center gap-2 bg-blue-50/70 px-4 py-2 rounded-xl border border-[#DCE3FA]/50">
              <span className="text-[11px] font-extrabold tracking-[0.16em] text-[#0057FF] uppercase">
                {mode} · {difficulty}
              </span>
            </div>
          </header>
          
          <article className="flex-1 flex flex-col rounded-[32px] bg-white p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#DCE3FA]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-[#DCE3FA] pb-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0057FF] to-blue-600 text-white shadow-lg shadow-blue-500/30">
                  <span className="font-['Manrope'] text-xl font-black">{index + 1}</span>
                </div>
                <div>
                  <h2 className="text-[11px] font-extrabold tracking-[0.2em] text-slate-400 uppercase">Question {index + 1} of 15</h2>
                  <p className="text-[15px] font-bold text-[#0057FF] mt-0.5">{mode} Evaluation</p>
                </div>
              </div>
              
              {questions.length < 15 && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-[#DCE3FA] shadow-sm">
                  <svg className="w-4 h-4 text-[#0057FF] animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                  <span className="text-[10px] font-bold text-[#0057FF] tracking-wider uppercase">Syncing Questions...</span>
                </div>
              )}
            </div>
            
            <h1 className="font-['Manrope'] text-2xl sm:text-[28px] font-bold leading-snug text-[#131A2E]">
              {questions[index] || <span className="text-slate-500 animate-pulse">Loading question...</span>}
            </h1>
            
            <div className="mt-8 flex-1 flex flex-col relative">
              <textarea 
                ref={textareaRef}
                disabled={!questions[index]}
                value={answers[index] || ""} 
                onChange={(event) => {
                  const newAnswers = [...answers];
                  newAnswers[index] = event.target.value;
                  setAnswers(newAnswers);
                }} 
                maxLength={4000} 
                placeholder="Type your answer here..." 
                className="flex-1 w-full min-h-[260px] resize-none rounded-2xl border-2 border-[#DCE3FA] bg-slate-50/50 p-5 text-[15px] leading-relaxed text-slate-700 transition-all placeholder:text-slate-400 focus:border-[#0057FF] focus:bg-white focus:ring-4 focus:ring-[#0057FF]/10 outline-none" 
              />
              <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-md text-[11px] font-bold text-slate-400 shadow-sm border border-[#DCE3FA]">
                {(answers[index] || "").trim() ? `${(answers[index] || "").trim().split(/\s+/).length} words` : "Aim for 60–120 words"}
              </div>
            </div>

            {error && <p className="mt-5 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-600 border border-red-100">{error}</p>}

            <div className="mt-8 flex items-center justify-between border-t border-[#DCE3FA] pt-6">
              <button 
                onClick={() => setIndex(Math.max(0, index - 1))}
                disabled={index === 0}
                className="group flex items-center gap-2 rounded-xl bg-white border-2 border-[#DCE3FA] px-6 py-3.5 text-sm font-bold text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50 active:scale-95 disabled:pointer-events-none disabled:opacity-40"
              >
                <svg className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                Back
              </button>
              
              {index === 14 ? (
                <button 
                  onClick={handleFinish}
                  disabled={loading || questions.length < 15}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 transition-all hover:from-emerald-600 hover:to-emerald-700 active:scale-95 disabled:pointer-events-none disabled:opacity-60"
                >
                  Finish Exam
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </button>
              ) : (
                <button 
                  onClick={() => setIndex(Math.min(14, index + 1))}
                  disabled={!questions[index + 1] && questions.length < 15}
                  className="group flex items-center gap-2 rounded-xl bg-[#0057FF] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-blue-700 active:scale-95 disabled:pointer-events-none disabled:opacity-60"
                >
                  {(!questions[index + 1] && questions.length < 15) ? "Syncing..." : "Next"}
                  <svg className="w-4 h-4 text-blue-200 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </button>
              )}
            </div>
          </article>
        </section>

        {/* Sidebar Question Palette */}
        <aside className="w-full lg:w-[300px] shrink-0">
          <div className="sticky top-8 rounded-[32px] bg-white p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#DCE3FA]">
            <h3 className="font-['Manrope'] text-[17px] font-bold text-[#131A2E] mb-1">Question Palette</h3>
            <p className="text-[11px] font-semibold tracking-wide uppercase text-slate-400 mb-6">Track your progress</p>
            
            <div className="grid grid-cols-5 gap-2.5">
              {Array(15).fill(0).map((_, i) => {
                const isCurrent = i === index;
                const isAnswered = (answers[i] || "").trim().length > 0;
                const isLoaded = !!questions[i];
                
                let bgClass = "bg-white text-slate-500 border-2 border-[#DCE3FA] border-dashed cursor-not-allowed"; 
                if (isLoaded) {
                  if (isCurrent) bgClass = "bg-[#0057FF] text-white shadow-md shadow-blue-500/30 scale-105 z-10 font-extrabold";
                  else if (isAnswered) bgClass = "bg-emerald-50 text-emerald-600 border-2 border-emerald-200 hover:bg-emerald-100";
                  else bgClass = "bg-white text-slate-600 border-2 border-slate-200 hover:border-blue-400 hover:text-blue-600";
                }

                return (
                  <button 
                    key={i} 
                    onClick={() => isLoaded && setIndex(i)}
                    disabled={!isLoaded}
                    className={`flex h-11 w-full items-center justify-center rounded-xl text-[13px] font-bold transition-all ${bgClass}`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
            
            <div className="mt-8 flex flex-col gap-3.5 rounded-2xl bg-slate-50 p-5 border border-[#DCE3FA]">
              <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                <div className="flex items-center gap-2.5">
                  <span className="block h-3 w-3 rounded-md bg-[#0057FF] shadow-sm shadow-blue-500/30"></span> Current
                </div>
                <span>1</span>
              </div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                <div className="flex items-center gap-2.5">
                  <span className="block h-3 w-3 rounded-md bg-emerald-100 border border-emerald-200"></span> Answered
                </div>
                <span>{answers.filter(a => a.trim().length > 0).length}</span>
              </div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                <div className="flex items-center gap-2.5">
                  <span className="block h-3 w-3 rounded-md bg-white border-2 border-slate-200"></span> Unanswered
                </div>
                <span>{15 - answers.filter(a => a.trim().length > 0).length}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
