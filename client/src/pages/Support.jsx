import React from "react";

export default function Support({ nightMode }) {
  const faqs = [
    { q: "How is the Behavioral score calculated?", a: "We analyze your response for action verbs, specific metrics, and quantifiable results based on the STAR (Situation, Task, Action, Result) method. Longer, highly-detailed answers with clear outcomes generally score higher." },
    { q: "Where does my data go? Is it private?", a: "Everything runs 100% locally on your machine. Your answers and resume data are processed by your local Ollama model. NextPrep does not send your data to any cloud provider or third-party API." },
    { q: "Why is the AI taking a few seconds to respond?", a: "Because NextPrep uses an offline local Language Model (LLM), response times depend entirely on your computer's RAM and CPU/GPU. If it's slow, try closing other heavy applications or using a lighter model via the NextPrep CLI." },
    { q: "Can I practice System Design rounds here?", a: "Yes! While the quick practice focuses on behavioral questions, you can navigate to the 'Resources' tab to read in-depth system design concepts. Full interactive system design whiteboard features are coming in V2." },
    { q: "How does the Resume Analyzer work?", a: "It scans your uploaded resume markdown against an ATS (Applicant Tracking System) logic set. It checks for impact-driven bullet points, power verbs, and missing contact information, then generates an optimized version." },
    { q: "How do I reset my consistency streak or progress?", a: "You can clear your history by clicking 'Delete Account' in the Profile Settings tab. Alternatively, clearing your browser's Local Storage will wipe the dashboard data immediately." },
    { q: "I found a bug. Where do I report it?", a: "Please use the 'Contact Us' form on this page. Include your OS, browser version, and the local model you are running (e.g. Qwen 2.5) in the description." },
    { q: "Does NextPrep support multiple users?", a: "Currently, NextPrep is designed as a single-user local application for maximum privacy. If another person wants to use it, we recommend they clone the repository and run their own local instance." }
  ];

  return (
    <section className="pb-12 max-w-5xl animate-in fade-in duration-500">
      <p className="inline-flex items-center gap-2 rounded-full border border-[#DCE3FA] bg-white/80 px-3 py-1.5 text-[10px] font-bold tracking-[0.14em] text-[#3355E8] shadow-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-[#3355E8]" /> HELP CENTER
      </p>
      <h1 className={`mt-4 font-hero text-3xl font-bold tracking-[-0.05em] sm:mt-5 sm:text-5xl ${nightMode ? "text-white" : "text-[#131A2E]"}`}>Support & FAQ.</h1>
      <p className={`mt-3 text-sm leading-6 sm:mt-4 sm:text-base ${nightMode ? "text-slate-400" : "text-slate-600"}`}>Get help with your account, troubleshoot local AI issues, or read our knowledge base.</p>

      {/* System Status Banner */}
      <div className={`mt-8 sm:mt-10 flex items-center justify-between rounded-2xl border p-4 sm:p-5 shadow-sm ${nightMode ? "border-emerald-500/20 bg-emerald-500/10" : "border-emerald-200 bg-emerald-50"}`}>
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <div>
            <p className={`text-sm font-bold ${nightMode ? "text-emerald-400" : "text-emerald-700"}`}>All Systems Operational</p>
            <p className={`text-xs mt-0.5 ${nightMode ? "text-emerald-500/70" : "text-emerald-600/70"}`}>Local Ollama Engine is actively responding.</p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.3fr]">
        <div className="space-y-6">
          <div className={`rounded-[28px] border p-6 sm:p-9 shadow-soft ${nightMode ? "border-white/10 bg-[#10173A]/30" : "border-[#DCE3FA] bg-white"}`}>
            <h2 className={`font-display text-xl font-bold ${nightMode ? "text-white" : "text-[#131A2E]"}`}>Contact Us</h2>
            <p className={`mt-2 text-sm ${nightMode ? "text-slate-400" : "text-slate-500"}`}>Facing issues with the RAG pipeline or have a feature request? Drop us a message.</p>
            
            <div className="mt-6 space-y-4">
              <input type="text" placeholder="Subject" className={`w-full rounded-xl border p-3.5 text-sm outline-none transition-all ${nightMode ? "border-white/10 bg-white/5 text-white focus:border-[#3355E8]" : "border-[#DCE3FA] bg-[#F7F5EF]/50 text-[#131A2E] focus:border-[#3355E8]"}`} />
              <textarea placeholder="Describe your issue in detail..." className={`min-h-[160px] w-full resize-none rounded-xl border p-4 text-sm outline-none transition-all ${
                nightMode ? "border-white/10 bg-white/5 text-white focus:border-[#3355E8]" : "border-[#DCE3FA] bg-[#F7F5EF]/50 text-[#131A2E] focus:border-[#3355E8] focus:bg-white"
              }`} />
            </div>
            <button className="mt-5 w-full rounded-full bg-[#3355E8] px-6 py-3.5 text-sm font-bold text-white shadow-md hover:-translate-y-0.5 transition-all">Submit Ticket</button>
          </div>
          
          {/* Quick Links */}
          <div className={`rounded-[28px] border p-6 sm:p-9 shadow-soft ${nightMode ? "border-white/10 bg-[#10173A]/30" : "border-[#DCE3FA] bg-white"}`}>
            <h2 className={`font-display text-xl font-bold ${nightMode ? "text-white" : "text-[#131A2E]"}`}>Documentation</h2>
            <ul className="mt-4 space-y-3">
              {["Installing Ollama Locally", "Configuring the RAG Knowledge Base", "Interpreting Mock Scores", "Customizing UI Themes"].map(link => (
                <li key={link}>
                  <button className={`text-sm font-medium transition-colors hover:underline ${nightMode ? "text-[#3355E8] hover:text-blue-400" : "text-[#3355E8]"}`}>• {link}</button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h2 className={`font-display text-2xl font-bold mb-6 ${nightMode ? "text-white" : "text-[#131A2E]"}`}>Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className={`rounded-2xl border p-5 sm:p-6 transition-all hover:-translate-y-0.5 ${nightMode ? "border-white/10 bg-[#10173A]/20 hover:bg-[#10173A]/40" : "border-[#DCE3FA] bg-white shadow-sm hover:shadow-md"}`}>
                <h3 className={`font-bold text-base ${nightMode ? "text-slate-200" : "text-[#131A2E]"}`}>{faq.q}</h3>
                <p className={`mt-2.5 text-sm leading-6 ${nightMode ? "text-slate-400" : "text-slate-600"}`}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
