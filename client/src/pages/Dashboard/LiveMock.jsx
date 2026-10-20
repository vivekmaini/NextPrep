import { useState, useEffect, useRef } from "react";
import api from "../../services/api";
import { chatInterview, completeInterview } from "../../services/interviewService";
import { getLatestResume } from "../../services/resumeService";

export default function LiveMock({ nightMode, setPage }) {
  const [resume, setResume] = useState("");
  const [fileName, setFileName] = useState("");
  const [hasUploadedResume, setHasUploadedResume] = useState(false);
  const [showResumeDisclaimer, setShowResumeDisclaimer] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);
  const [mockFeedback, setMockFeedback] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [chatHistory, setChatHistory] = useState([]); // Real LLM history
  const [dbInterviewId, setDbInterviewId] = useState(null);
  
  // Configurations
  const [difficulty, setDifficulty] = useState("Medium");
  const [role, setRole] = useState("Software Engineer");
  const [interviewType, setInterviewType] = useState("Technical");

  const chatEndRef = useRef(null);

  useEffect(() => {
    // Purge any stale prototype resume text from local storage
    localStorage.removeItem("nextprep_user_resume");

    // Check if user has uploaded a real resume in NextPrep database
    getLatestResume()
      .then((data) => {
        if (data?.resume) {
          setHasUploadedResume(true);
          setFileName(data.resume.file_name);
        } else {
          setHasUploadedResume(false);
          setFileName("");
          setResume("");
        }
      })
      .catch(() => {
        setHasUploadedResume(false);
        setFileName("");
        setResume("");
      });
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    setHasUploadedResume(true);
    
    if (file.type === "text/plain" || file.name.endsWith(".md")) {
      const reader = new FileReader();
      reader.onload = (ev) => setResume(ev.target.result);
      reader.readAsText(file);
    } else {
      setResume(""); // Keep clean, backend will identify the uploaded resume
    }
  };

  const startInterview = async () => {
    if (!hasUploadedResume && !fileName) {
      setShowResumeDisclaimer(true);
      return;
    }
    
    setIsStarted(true);
    setMessages([{ role: "system", text: `System: Preparing a ${difficulty} ${interviewType} interview for the ${role} role...` }]);
    setIsThinking(true);

    const initialMessages = [
      { role: "user", content: "Hello! I am ready for the interview. Please ask your first question based on my resume." }
    ];

    // API: Save interview start to DB
    try {
      const { data: dbData } = await api.post("/interviews/start", {
        role,
        difficulty,
        type: interviewType,
      });
      if (dbData?.success && dbData?.interview) {
        setDbInterviewId(dbData.interview.id);
      }
    } catch (e) {
      console.error("DB Start Error:", e);
    }

    try {
      const data = await chatInterview({
        messages: initialMessages,
        role,
        difficulty,
        interviewType,
        resume
      });

      const aiReply = data.reply || "Hello! Let's begin the interview. Can you introduce yourself and walk me through your main technical project?";
      setIsThinking(false);
      setMessages([
        { role: "system", text: `Interviewer ready. Session started.` },
        { role: "ai", text: aiReply }
      ]);
      setChatHistory([...initialMessages, { role: "assistant", content: aiReply }]);
    } catch (err) {
      console.error("LiveMock Error:", err);
      if (err?.noResume || err?.message?.toLowerCase().includes("resume")) {
        setHasUploadedResume(false);
        setShowResumeDisclaimer(true);
        setIsStarted(false);
        setIsThinking(false);
        return;
      }
      const userMsg = err?.message && !err.message.includes("status code") && !err.message.includes("Network")
        ? err.message
        : "Something went wrong. Please try again.";
      setMessages([{ role: "system", text: userMsg }]);
      setIsThinking(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    
    // Update UI immediately
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setIsThinking(true);

    const updatedHistory = [...chatHistory, { role: "user", content: userMsg }];
    setChatHistory(updatedHistory);

    try {
      const data = await chatInterview({
        messages: updatedHistory,
        role,
        difficulty,
        interviewType,
        resume
      });

      const aiFullResponse = data.reply || "Thank you for the answer. Could you elaborate on how you handled edge cases?";
      
      setIsThinking(false);
      setMessages(prev => [...prev, { role: "ai", text: aiFullResponse }]);
      setChatHistory(prev => [...prev, { role: "assistant", content: aiFullResponse }]);

      // API: Save Q&A pair to DB
      let lastAiQuestion = "Please ask your first question based on my resume.";
      if (updatedHistory.length >= 3) {
         lastAiQuestion = updatedHistory[updatedHistory.length - 2].content;
      }
      
      if (dbInterviewId) {
        try {
          await api.post("/interviews/qa", {
            interviewId: dbInterviewId,
            question: lastAiQuestion,
            answer: userMsg,
            feedback: aiFullResponse,
            score: null
          });
        } catch(e) { console.error("DB QA Error:", e); }
      }

    } catch (err) {
      console.error("LiveMock Error:", err);
      const cleanMsg = err?.message && !err.message.includes("status code") && !err.message.includes("Network")
        ? err.message
        : "Something went wrong. Please try again.";
      setMessages(prev => [...prev, { role: "system", text: cleanMsg }]);
      setIsThinking(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleEndSession = async () => {
    const userAnswers = [];
    for (let i = 0; i < chatHistory.length; i++) {
      if (chatHistory[i].role === "user") {
        const prevAi = i > 0 && chatHistory[i - 1].role === "assistant" ? chatHistory[i - 1].content : "Initial Question";
        userAnswers.push({ question: prevAi, answer: chatHistory[i].content });
      }
    }

    if (userAnswers.length === 0) {
      setIsStarted(false);
      setMessages([]);
      setChatHistory([]);
      return;
    }

    setIsFinishing(true);
    try {
      const data = await completeInterview({
        interviewId: dbInterviewId,
        mode: interviewType,
        difficulty,
        targetRole: role,
        responses: userAnswers,
      });

      if (data?.feedback) {
        setMockFeedback(data.feedback);
        const newEntry = {
          id: `db-${dbInterviewId || Date.now()}`,
          title: role ? `${interviewType}: ${role}` : `${interviewType} Interview`,
          detail: interviewType,
          date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          score: data.feedback.overallScore || 78
        };
        const curLocal = JSON.parse(localStorage.getItem("nextprep-history") || "[]");
        localStorage.setItem("nextprep-history", JSON.stringify([newEntry, ...curLocal].slice(0, 30)));
      } else {
        setIsStarted(false);
      }
    } catch (e) {
      console.error("Failed to evaluate mock session:", e);
      setIsStarted(false);
    } finally {
      setIsFinishing(false);
    }
  };

  if (mockFeedback) {
    return (
      <section className="pb-12 max-w-4xl mx-auto animate-in fade-in duration-300">
        <div className={`rounded-[32px] border p-8 sm:p-12 shadow-soft ${nightMode ? "border-white/10 bg-[#10173A]" : "border-[#DCE3FA] bg-white"}`}>
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-[11px] font-extrabold tracking-widest text-[#0057FF] uppercase shadow-sm">
              Mock Interview Evaluated
            </span>
            <div className="mt-8 flex items-baseline justify-center gap-1">
              <span className={`font-hero text-7xl sm:text-8xl font-bold tracking-tight ${nightMode ? "text-white" : "text-[#131A2E]"}`}>
                {mockFeedback.overallScore}
              </span>
              <span className="text-2xl font-bold text-slate-400">/100</span>
            </div>
            <p className={`mt-5 max-w-2xl mx-auto text-base leading-relaxed ${nightMode ? "text-slate-300" : "text-slate-600"}`}>
              {mockFeedback.summary}
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className={`rounded-2xl border p-6 ${nightMode ? "border-emerald-500/20 bg-emerald-500/5" : "border-emerald-100 bg-emerald-50/50"}`}>
              <h3 className="font-bold text-emerald-600 flex items-center gap-2 text-sm uppercase tracking-wider">
                <span>✦</span> Strengths Observed
              </h3>
              <ul className="mt-4 space-y-3">
                {mockFeedback.strengths?.length > 0 ? (
                  mockFeedback.strengths.map((item, idx) => (
                    <li key={idx} className={`text-sm leading-relaxed ${nightMode ? "text-slate-300" : "text-slate-700"}`}>
                      • {item}
                    </li>
                  ))
                ) : (
                  <li className="text-sm italic text-slate-400">Answer more questions in depth for detailed strengths.</li>
                )}
              </ul>
            </div>

            <div className={`rounded-2xl border p-6 ${nightMode ? "border-blue-500/20 bg-blue-500/5" : "border-blue-100 bg-blue-50/50"}`}>
              <h3 className="font-bold text-[#0057FF] flex items-center gap-2 text-sm uppercase tracking-wider">
                <span>→</span> Areas to Improve
              </h3>
              <ul className="mt-4 space-y-3">
                {mockFeedback.improvements?.length > 0 ? (
                  mockFeedback.improvements.map((item, idx) => (
                    <li key={idx} className={`text-sm leading-relaxed ${nightMode ? "text-slate-300" : "text-slate-700"}`}>
                      • {item}
                    </li>
                  ))
                ) : (
                  <li className="text-sm italic text-slate-400">Provide longer, structured answers with real examples.</li>
                )}
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            {setPage && (
              <button
                onClick={() => {
                  setMockFeedback(null);
                  setIsStarted(false);
                  setMessages([]);
                  setChatHistory([]);
                  setPage("Progress");
                }}
                className="rounded-2xl bg-[#3355E8] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-all text-center"
              >
                View Full Progress & Analytics →
              </button>
            )}
            <button
              onClick={() => {
                setMockFeedback(null);
                setIsStarted(false);
                setMessages([]);
                setChatHistory([]);
              }}
              className={`rounded-2xl border px-8 py-4 text-sm font-bold transition-all ${nightMode ? "border-white/10 text-slate-300 hover:bg-white/5" : "border-slate-200 text-slate-700 hover:bg-slate-50"}`}
            >
              Start New Mock Interview
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (!isStarted) {
    return (
      <section className="pb-8 max-w-5xl mx-auto mt-4">
        <div className="mb-8">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#DCE3FA] bg-white/80 px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-[#3355E8] shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" /> MOCK INTERVIEW
          </p>
          <h1 className={`mt-4 font-hero text-3xl font-bold tracking-[-0.05em] sm:text-[44px] sm:leading-[1.1] ${nightMode ? "text-white" : "text-[#131A2E]"}`}>
            Custom Mock Sessions.
          </h1>
          <p className={`mt-3 max-w-xl text-sm leading-6 ${nightMode ? "text-slate-400" : "text-slate-600"}`}>
            Upload your resume, set your target role, and let our AI grill you exactly like a real recruiter would.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className={`lg:col-span-2 rounded-[28px] border p-6 sm:p-8 shadow-soft flex flex-col ${nightMode ? "border-white/10 bg-[#10173A]/50" : "border-[#DCE3FA] bg-white"}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`font-bold ${nightMode ? "text-white" : "text-[#131A2E]"}`}>1. Candidate Resume</h2>
              <div className="flex items-center gap-2">
                <label className={`cursor-pointer text-xs font-bold px-4 py-2 rounded-full transition-all shadow-sm ${nightMode ? "bg-[#3355E8] text-white hover:bg-blue-600" : "bg-[#3355E8] text-white hover:bg-blue-700"}`}>
                  Upload File
                  <input type="file" accept=".txt,.md,.pdf,.doc,.docx" className="hidden" onChange={handleFileUpload} />
                </label>
                {setPage && (
                  <button
                    onClick={() => setPage("Resume")}
                    className={`text-xs font-bold px-3 py-2 rounded-full transition-all ${nightMode ? "bg-white/10 text-slate-300 hover:bg-white/20" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                  >
                    Manage Resumes
                  </button>
                )}
              </div>
            </div>

            {hasUploadedResume ? (
              <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 text-emerald-900 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 font-bold text-lg">✓</span>
                  <div>
                    <p className="text-xs font-bold text-emerald-950">Resume Active & Verified</p>
                    <p className="text-xs text-emerald-700 mt-0.5">{fileName || "Your uploaded resume will be used for AI questioning."}</p>
                  </div>
                </div>
                <span className="text-[10px] font-extrabold uppercase px-3 py-1 rounded-full bg-emerald-200/80 text-emerald-800">Ready</span>
              </div>
            ) : null}

            <label className={`block text-xs font-bold mb-2 ${nightMode ? "text-slate-400" : "text-slate-500"}`}>
              EXTRA SKILLS OR TOPICS TO FOCUS ON (OPTIONAL)
            </label>
            <textarea
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              placeholder="e.g. Specific topics or projects you'd like the interviewer to ask about (optional)..."
              className={`w-full flex-1 min-h-[200px] resize-y rounded-2xl p-4 text-sm outline-none transition-all ${
                nightMode 
                  ? "bg-[#0B1026] text-white border border-white/10 focus:border-[#3355E8]" 
                  : "bg-[#F7F5EF]/50 text-[#131A2E] border border-[#DCE3FA] focus:border-[#3355E8] focus:ring-4 focus:ring-[#3355E8]/10"
              }`}
            />
          </div>

          <div className={`rounded-[28px] border p-6 sm:p-8 shadow-soft flex flex-col ${nightMode ? "border-white/10 bg-[#10173A]/50" : "border-[#DCE3FA] bg-white"}`}>
            <h2 className={`font-bold mb-6 ${nightMode ? "text-white" : "text-[#131A2E]"}`}>2. Interview Settings</h2>
            
            <div className="space-y-6 flex-1">
              <div>
                <label className={`block text-xs font-bold mb-2 ${nightMode ? "text-slate-400" : "text-slate-500"}`}>DESIGNATION / ROLE</label>
                <input 
                  type="text" 
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  placeholder="e.g. Software Engineer, Frontend..."
                  className={`w-full rounded-xl px-4 py-3 text-sm outline-none border transition-all shadow-sm ${nightMode ? "bg-[#0B1026] border-white/10 text-white focus:border-[#3355E8]" : "bg-white border-[#DCE3FA] text-[#131A2E] focus:border-[#3355E8]"}`}
                />
              </div>

              <div>
                <label className={`block text-xs font-bold mb-2 ${nightMode ? "text-slate-400" : "text-slate-500"}`}>INTERVIEW TYPE</label>
                <div className="flex flex-wrap gap-2">
                  {["Technical", "HR", "System Design"].map(t => (
                    <button 
                      key={t}
                      onClick={() => setInterviewType(t)}
                      className={`px-3 py-2 rounded-lg text-xs font-bold transition-all border shadow-sm ${
                        interviewType === t 
                          ? "bg-[#3355E8] border-[#3355E8] text-white" 
                          : (nightMode ? "border-white/10 text-slate-400 hover:bg-white/5" : "border-[#DCE3FA] text-slate-600 hover:bg-slate-50 bg-white")
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={`block text-xs font-bold mb-2 ${nightMode ? "text-slate-400" : "text-slate-500"}`}>DIFFICULTY</label>
                <div className={`flex gap-2 p-1.5 rounded-xl border ${nightMode ? "border-white/10 bg-[#0B1026]" : "border-[#DCE3FA] bg-slate-50"}`}>
                  {["Easy", "Medium", "Hard"].map(lvl => (
                    <button
                      key={lvl}
                      onClick={() => setDifficulty(lvl)}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                        difficulty === lvl 
                          ? (nightMode ? "bg-[#3355E8] text-white shadow-sm" : "bg-white text-[#3355E8] shadow-sm border border-[#DCE3FA]/50")
                          : (nightMode ? "text-slate-500 hover:text-slate-300" : "text-slate-500 hover:text-[#131A2E]")
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={`mt-8 pt-6 border-t ${nightMode ? "border-white/10" : "border-[#DCE3FA]/50"}`}>
              <button 
                onClick={startInterview}
                className="w-full rounded-2xl bg-[#3355E8] px-8 py-4 text-sm font-bold text-white shadow-[0_4px_14px_0_rgba(51,85,232,0.39)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(51,85,232,0.23)]"
              >
                Start Interview
              </button>
            </div>
          </div>
        </div>

        {showResumeDisclaimer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className={`relative w-full max-w-md rounded-[28px] border p-6 sm:p-8 shadow-2xl transition-all ${nightMode ? "border-white/10 bg-[#10173A] text-white" : "border-[#DCE3FA] bg-white text-[#131A2E]"}`}>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 text-2xl mb-5">
                📄
              </div>
              
              <h3 className="font-hero text-2xl font-bold tracking-tight">
                Resume Required
              </h3>
              
              <p className={`mt-3 text-sm leading-relaxed ${nightMode ? "text-slate-300" : "text-slate-600"}`}>
                Live Mock Interview me AI aapke uploaded resume aur projects ke base par questions generate karta hai. Please pehle <strong>Resume</strong> section me jakar apna resume upload karein.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                {setPage && (
                  <button
                    onClick={() => {
                      setShowResumeDisclaimer(false);
                      setPage("Resume");
                    }}
                    className="flex-1 rounded-xl bg-[#3355E8] px-5 py-3 text-sm font-bold text-white shadow-md shadow-blue-500/20 hover:bg-blue-600 transition-all text-center"
                  >
                    Go to Resume Section →
                  </button>
                )}
                <button
                  onClick={() => setShowResumeDisclaimer(false)}
                  className={`rounded-xl px-5 py-3 text-sm font-bold transition-all border ${nightMode ? "border-white/10 text-slate-300 hover:bg-white/5" : "border-slate-200 text-slate-600 hover:bg-slate-100"}`}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    );
  }

  return (
    <section className="pb-8 h-[calc(100vh-140px)] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-red-500">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" /> {interviewType.toUpperCase()} INTERVIEW ({difficulty.toUpperCase()})
          </p>
        </div>
        <button 
          onClick={handleEndSession}
          disabled={isFinishing}
          className={`text-xs font-bold px-4 py-2 rounded-full transition-all ${nightMode ? "bg-white/10 hover:bg-white/20 text-white" : "bg-white border border-[#DCE3FA] text-[#131A2E] hover:bg-slate-50 shadow-sm"}`}
        >
          {isFinishing ? "Evaluating..." : "End Session"}
        </button>
      </div>

      {isFinishing && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F4F7FC]/80 backdrop-blur-xl">
          <div className="relative flex h-24 w-24 items-center justify-center mb-8">
            <div className="absolute inset-0 rounded-full border-[3px] border-white/10"></div>
            <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#0057FF] border-r-indigo-400 animate-spin"></div>
            <svg className="w-8 h-8 text-blue-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
          </div>
          <h2 className="relative z-10 font-hero text-3xl font-bold tracking-tight text-[#131A2E]">Analyzing Your Performance</h2>
          <p className="relative z-10 mt-3 text-sm text-slate-500">Evaluating your answers and generating your real interview score...</p>
        </div>
      )}

      <div className={`flex-1 overflow-hidden flex flex-col rounded-[28px] border shadow-soft ${nightMode ? "border-white/10 bg-[#10173A]/50" : "border-[#DCE3FA] bg-white"}`}>
        <div className="flex-1 overflow-y-auto p-6 space-y-6 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-slate-300 dark:[&::-webkit-scrollbar-thumb]:bg-slate-700">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "system" ? (
                <div className="w-full text-center">
                  <span className={`text-xs font-bold ${nightMode ? "text-slate-500" : "text-slate-400"}`}>{msg.text}</span>
                </div>
              ) : (
                <div className={`max-w-[80%] sm:max-w-[70%] rounded-[24px] p-5 ${
                  msg.role === "user" 
                    ? "bg-[#3355E8] text-white rounded-br-sm shadow-md" 
                    : nightMode 
                      ? "bg-[#0B1026] border border-white/10 text-slate-200 rounded-bl-sm" 
                      : "bg-[#F7F5EF]/80 border border-[#DCE3FA]/50 text-[#131A2E] rounded-bl-sm"
                }`}>
                  {msg.role === "ai" && <p className="text-[10px] font-black tracking-widest text-[#3355E8] mb-2 uppercase opacity-80">AI Interviewer</p>}
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
              )}
            </div>
          ))}
          
          {isThinking && (
            <div className="flex justify-start">
              <div className={`rounded-[24px] rounded-bl-sm p-5 px-6 ${nightMode ? "bg-[#0B1026] border border-white/10" : "bg-[#F7F5EF]/80 border border-[#DCE3FA]/50"}`}>
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#3355E8] animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-2 h-2 rounded-full bg-[#3355E8] animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-2 h-2 rounded-full bg-[#3355E8] animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className={`p-4 sm:p-5 border-t ${nightMode ? "border-white/10 bg-[#0B1026]/50" : "border-[#DCE3FA]/50 bg-slate-50/50"}`}>
          <div className={`flex gap-3 p-2 rounded-[24px] border transition-all ${nightMode ? "border-white/10 bg-[#0B1026] focus-within:border-[#3355E8]" : "border-[#DCE3FA] bg-white focus-within:border-[#3355E8] focus-within:ring-4 focus-within:ring-[#3355E8]/10"}`}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your answer... (Press Enter to send)"
              className="flex-1 max-h-[120px] bg-transparent resize-none outline-none text-sm p-3 py-2 scrollbar-hide"
              rows="2"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isThinking}
              className="self-end shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-[#3355E8] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
            >
              <svg className="w-4 h-4 translate-x-[-1px] translate-y-[1px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
