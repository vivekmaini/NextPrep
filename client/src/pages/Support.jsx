import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Support({ nightMode }) {
  const [ticketSent, setTicketSent] = useState(false);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const faqs = [
    { 
      q: "How is the interview score calculated?", 
      a: "Our AI evaluates your responses against industry rubrics based on the STAR (Situation, Task, Action, Result) method. We assess technical accuracy, clarity, depth of explanation, and the presence of quantifiable metrics. Skipping or shallow one-word answers reduces the score." 
    },
    { 
      q: "Where does my data go? Is it private?", 
      a: "Your data is stored securely in our PostgreSQL cloud database and protected by JWT authentication and bcrypt password salting. Your resumes and interview responses are processed via transient cloud AI inference (Groq API) and are NEVER used to train public commercial AI models." 
    },
    { 
      q: "How fast does the AI respond?", 
      a: "NextPrep utilizes high-speed Groq Cloud LPUs, typically delivering tailored questions and answer evaluations in under 1.5 seconds. If you ever experience a slight delay, it may be due to temporary network latency." 
    },
    { 
      q: "Can I practice System Design and Coding rounds?", 
      a: "Yes! Check out our curated 'Resources' section for interactive roadmaps, LeetCode Blind 75 sheets, and system design cheatsheets, or use the Mock Interview console for technical architecture discussions." 
    },
    { 
      q: "How does the Resume Analyzer work?", 
      a: "It scans your uploaded resume against an Applicant Tracking System (ATS) rubric. It checks for measurable impact bullets, technical skills, section completeness, and missing keywords, giving you actionable recommendations for improvement." 
    },
    { 
      q: "Why do I need to upload a resume before starting an interview?", 
      a: "NextPrep enforces resume verification so that every technical question, difficulty curve, and scenario asked by the AI is tailored specifically to your real skills and experience, mimicking a genuine hiring manager interview." 
    },
    { 
      q: "I found an issue. Where do I report it?", 
      a: "Please use the 'Contact Us' form on this page or email us at support@nextprep.io. Our team typically reviews reports within 24 hours." 
    },
    { 
      q: "Does NextPrep support multiple accounts?", 
      a: "Yes! NextPrep is a multi-user cloud platform. Any candidate can create their own account, upload resumes, and track their personalized interview progress from any device." 
    }
  ];

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) return;
    setTicketSent(true);
    setSubject("");
    setDescription("");
    setTimeout(() => setTicketSent(false), 5000);
  };

  return (
    <section className="pb-12 max-w-5xl animate-in fade-in duration-500">
      <p className="inline-flex items-center gap-2 rounded-full border border-[#DCE3FA] bg-white/80 px-3 py-1.5 text-[10px] font-bold tracking-[0.14em] text-[#3355E8] shadow-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-[#3355E8]" /> HELP CENTER
      </p>
      <h1 className={`mt-4 font-hero text-3xl font-bold tracking-[-0.05em] sm:mt-5 sm:text-5xl ${nightMode ? "text-white" : "text-[#131A2E]"}`}>
        Support & FAQ.
      </h1>
      <p className={`mt-3 text-sm leading-6 sm:mt-4 sm:text-base ${nightMode ? "text-slate-400" : "text-slate-600"}`}>
        Get help with your account, understand interview evaluation rubrics, or contact our support team.
      </p>

      {/* System Status Banner */}
      <div className={`mt-8 sm:mt-10 flex items-center justify-between rounded-2xl border p-4 sm:p-5 shadow-sm ${nightMode ? "border-emerald-500/20 bg-emerald-500/10" : "border-emerald-200 bg-emerald-50"}`}>
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <div>
            <p className={`text-sm font-bold ${nightMode ? "text-emerald-400" : "text-emerald-700"}`}>All Systems Operational</p>
            <p className={`text-xs mt-0.5 ${nightMode ? "text-emerald-500/70" : "text-emerald-600/70"}`}>
              NextPrep Cloud AI Engine & PostgreSQL Database are online and responding.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.3fr]">
        <div className="space-y-6">
          <div className={`rounded-[28px] border p-6 sm:p-9 shadow-soft ${nightMode ? "border-white/10 bg-[#10173A]/30" : "border-[#DCE3FA] bg-white"}`}>
            <h2 className={`font-display text-xl font-bold ${nightMode ? "text-white" : "text-[#131A2E]"}`}>Contact Us</h2>
            <p className={`mt-2 text-sm ${nightMode ? "text-slate-400" : "text-slate-500"}`}>
              Facing an issue or have a feature suggestion? Drop us a message.
            </p>
            
            {ticketSent ? (
              <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800 text-sm font-semibold text-center">
                ✓ Thank you! Your ticket has been submitted. We will get back to you shortly.
              </div>
            ) : (
              <form onSubmit={handleTicketSubmit} className="mt-6 space-y-4">
                <input 
                  type="text" 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Subject" 
                  required
                  className={`w-full rounded-xl border p-3.5 text-sm outline-none transition-all ${
                    nightMode ? "border-white/10 bg-white/5 text-white focus:border-[#3355E8]" : "border-[#DCE3FA] bg-[#F7F5EF]/50 text-[#131A2E] focus:border-[#3355E8]"
                  }`} 
                />
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your issue or suggestion in detail..." 
                  required
                  className={`min-h-[160px] w-full resize-none rounded-xl border p-4 text-sm outline-none transition-all ${
                    nightMode ? "border-white/10 bg-white/5 text-white focus:border-[#3355E8]" : "border-[#DCE3FA] bg-[#F7F5EF]/50 text-[#131A2E] focus:border-[#3355E8] focus:bg-white"
                  }`} 
                />
                <button 
                  type="submit" 
                  className="mt-2 w-full rounded-full bg-[#3355E8] px-6 py-3.5 text-sm font-bold text-white shadow-md hover:-translate-y-0.5 transition-all"
                >
                  Submit Ticket
                </button>
              </form>
            )}
          </div>
          
          {/* Quick Links */}
          <div className={`rounded-[28px] border p-6 sm:p-9 shadow-soft ${nightMode ? "border-white/10 bg-[#10173A]/30" : "border-[#DCE3FA] bg-white"}`}>
            <h2 className={`font-display text-xl font-bold ${nightMode ? "text-white" : "text-[#131A2E]"}`}>Documentation & Legal</h2>
            <ul className="mt-4 space-y-3">
              {[
                { title: "STAR Interview Framework Guide", link: "/terms" },
                { title: "ATS Resume Scoring Rubric", link: "/terms" },
                { title: "Terms of Service", link: "/terms" },
                { title: "Privacy & Data Protection Policy", link: "/privacy" },
              ].map((doc) => (
                <li key={doc.title}>
                  <Link 
                    to={doc.link} 
                    className={`text-sm font-medium transition-colors hover:underline inline-flex items-center gap-1.5 ${
                      nightMode ? "text-blue-400 hover:text-blue-300" : "text-[#3355E8] hover:text-blue-700"
                    }`}
                  >
                    • {doc.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h2 className={`font-display text-2xl font-bold mb-6 ${nightMode ? "text-white" : "text-[#131A2E]"}`}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className={`rounded-2xl border p-5 sm:p-6 transition-all hover:-translate-y-0.5 ${
                  nightMode ? "border-white/10 bg-[#10173A]/20 hover:bg-[#10173A]/40" : "border-[#DCE3FA] bg-white shadow-sm hover:shadow-md"
                }`}
              >
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
