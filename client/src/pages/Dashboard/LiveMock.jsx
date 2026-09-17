import { useState, useEffect, useRef } from "react";

export default function LiveMock({ nightMode }) {
  const [resume, setResume] = useState("");
  const [fileName, setFileName] = useState("");
  const [isStarted, setIsStarted] = useState(false);
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
  const OLLAMA_URL = "/api/ollama/chat";
  const MODEL_NAME = "qwen2.5:7b-instruct"; // Updated to exact local model name

  useEffect(() => {
    const saved = localStorage.getItem("nextprep_user_resume");
    if (saved) setResume(saved);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    
    if (file.type === "text/plain" || file.name.endsWith(".md")) {
      const reader = new FileReader();
      reader.onload = (e) => setResume(e.target.result);
      reader.readAsText(file);
    } else {
      setResume(`[Extracted from ${file.name}]\n\n(Note: True PDF parsing will happen on the backend. This is a placeholder. Please paste your text if you want to test the prompt right now.)`);
    }
  };

  const startInterview = async () => {
    if (!resume.trim()) return alert("Please upload or paste your resume first!");
    
    localStorage.setItem("nextprep_user_resume", resume);
    setIsStarted(true);
    setMessages([{ role: "system", text: `System: Preparing a ${difficulty} ${interviewType} interview for the ${role} role...` }]);
    setIsThinking(true);

    const systemPrompt = `You are a strict Technical Interviewer conducting a ${difficulty} level ${interviewType} interview for a ${role} position. 
The candidate's resume is provided below. 
Rules:
1. Ask exactly ONE clear question at a time.
2. Base questions STRICTLY on the resume.
3. Keep your responses extremely concise (under 2-3 sentences).
4. Evaluate their previous answer briefly, then ask the next question.

Candidate Resume:
${resume}`;

    const initialContext = [
      { role: "system", content: systemPrompt },
      { role: "user", content: "Hello! I am ready for the interview. Please ask your first question based on my resume." }
    ];

    // API: Save interview start to DB
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const dbRes = await fetch("http://localhost:3001/api/interviews/start", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ role, difficulty, type: interviewType })
        });
        const dbData = await dbRes.json();
        if (dbData.success && dbData.interview) {
          setDbInterviewId(dbData.interview.id);
        }
      } catch(e) { console.error("DB Start Error:", e); }
    }


    try {
      const res = await fetch(OLLAMA_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: MODEL_NAME, messages: initialContext, stream: true })
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Ollama Error (${res.status}): ${errorText}`);
      }
      
      setIsThinking(false);
      setMessages([{ role: "ai", text: "" }]);
      
      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let aiFullResponse = "";
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const parsed = JSON.parse(line);
            if (parsed.message?.content) {
              aiFullResponse += parsed.message.content;
              setMessages(prev => {
                const newMsgs = [...prev];
                newMsgs[newMsgs.length - 1].text = aiFullResponse;
                return newMsgs;
              });
            }
          } catch(e) {}
        }
      }
      
      setChatHistory([...initialContext, { role: "assistant", content: aiFullResponse }]);
    } catch (err) {
      console.error("LiveMock Error:", err);
      setMessages([{ role: "system", text: `Connection Error: ${err.message}. Make sure Ollama is running.` }]);
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
      const res = await fetch(OLLAMA_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: MODEL_NAME, messages: updatedHistory, stream: true })
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Ollama Error (${res.status}): ${errorText}`);
      }
      
      setIsThinking(false);
      setMessages(prev => [...prev, { role: "ai", text: "" }]);
      
      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let aiFullResponse = "";
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const parsed = JSON.parse(line);
            if (parsed.message?.content) {
              aiFullResponse += parsed.message.content;
              setMessages(prev => {
                const newMsgs = [...prev];
                newMsgs[newMsgs.length - 1].text = aiFullResponse;
                return newMsgs;
              });
            }
          } catch(e) {}
        }
      }

      
      setChatHistory(prev => [...prev, { role: "assistant", content: aiFullResponse }]);

      // API: Save Q&A pair to DB
      const currentToken = localStorage.getItem("token");
      // Find the last actual question the AI asked (before user's new message)
      let lastAiQuestion = "Please ask your first question based on my resume.";
      if (updatedHistory.length >= 3) {
         // The last item in updatedHistory is user's message, before that is AI's previous message
         lastAiQuestion = updatedHistory[updatedHistory.length - 2].content;
      }
      
      if (dbInterviewId && currentToken) {
        try {
          await fetch("http://localhost:3001/api/interviews/qa", {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${currentToken}` },
            body: JSON.stringify({
              interviewId: dbInterviewId,
              question: lastAiQuestion,
              answer: userMsg,
              feedback: aiFullResponse,
              score: null
            })
          });
        } catch(e) { console.error("DB QA Error:", e); }
      }

    } catch (err) {
      console.error("LiveMock Error:", err);
      setMessages(prev => [...prev, { role: "system", text: `Connection Error: ${err.message}` }]);
      setIsThinking(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

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
              <h2 className={`font-bold ${nightMode ? "text-white" : "text-[#131A2E]"}`}>1. Provide Your Resume</h2>
              <div className="flex items-center gap-2">
                <label className={`cursor-pointer text-xs font-bold px-4 py-2 rounded-full transition-all shadow-sm ${nightMode ? "bg-[#3355E8] text-white hover:bg-blue-600" : "bg-[#3355E8] text-white hover:bg-blue-700"}`}>
                  Upload File
                  <input type="file" accept=".txt,.md,.pdf,.doc,.docx" className="hidden" onChange={handleFileUpload} />
                </label>
                <button onClick={() => { setResume(""); setFileName(""); }} className={`text-xs font-bold px-3 py-2 rounded-full ${nightMode ? "bg-white/10 text-slate-300 hover:bg-white/20" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                  Clear
                </button>
              </div>
            </div>
            {fileName && <p className={`mb-3 text-xs font-medium ${nightMode ? "text-green-400" : "text-green-600"}`}>Attached: {fileName}</p>}
            
            <textarea
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              placeholder="Paste your resume text here... or upload a file above."
              className={`w-full flex-1 min-h-[350px] resize-y rounded-2xl p-5 text-sm outline-none transition-all ${
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
          onClick={() => setIsStarted(false)}
          className={`text-xs font-bold px-4 py-2 rounded-full transition-all ${nightMode ? "bg-white/10 hover:bg-white/20 text-white" : "bg-white border border-[#DCE3FA] text-[#131A2E] hover:bg-slate-50 shadow-sm"}`}
        >
          End Session
        </button>
      </div>

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
