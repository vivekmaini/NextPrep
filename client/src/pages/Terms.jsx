import React from "react";

export default function Terms({ nightMode }) {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing, downloading, or using the NextPrep application ('Service'), you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, you must not use our software. NextPrep reserves the right to update these terms at any time."
    },
    {
      title: "2. Local Processing & Absolute Privacy",
      content: "NextPrep is uniquely designed as an offline-first, local application utilizing Ollama models. We explicitly guarantee that we do not collect, harvest, upload, or transmit your interview responses, uploaded resumes, personal identifiable information (PII), or usage metrics to any remote server. Your data remains completely private on your local machine."
    },
    {
      title: "3. User Conduct and Restrictions",
      content: "You agree to use NextPrep solely for personal interview preparation and educational purposes. You shall not attempt to reverse engineer, decompile, or bypass the local RAG pipeline logic. You shall not use the AI output to commit academic fraud or misrepresent your qualifications."
    },
    {
      title: "4. AI Feedback Disclaimer",
      content: "NextPrep provides AI-generated feedback for mock interviews, resume reviews, and aptitude tests based on statistical language models (LLMs). We do not guarantee job placements, interview success, or the absolute factual accuracy of the AI. The feedback provided is for self-improvement and guidance purposes only."
    },
    {
      title: "5. Intellectual Property Rights",
      content: "The codebase, UI/UX design, custom visual assets, and the proprietary RAG (Retrieval-Augmented Generation) knowledge base markdown structures belong exclusively to the creators of NextPrep. You are granted a limited, non-exclusive license to run the software locally."
    },
    {
      title: "6. Data Retention and Deletion",
      content: "Because all data is stored on your device via the browser's Local Storage and local file system, data retention is entirely under your control. You may permanently delete your data at any time via the 'Danger Zone' in the Profile Settings. NextPrep is not responsible for accidental data loss."
    },
    {
      title: "7. Third-Party Dependencies",
      content: "NextPrep relies on open-source technologies, notably Node.js, React, Tailwind CSS, and Ollama. Your use of these underlying technologies is subject to their respective open-source licenses (MIT, Apache 2.0). NextPrep assumes no liability for vulnerabilities originating from third-party packages."
    },
    {
      title: "8. Limitation of Liability",
      content: "To the maximum extent permitted by applicable law, NextPrep and its developers shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of potential income from failed job interviews, resulting from your use of or inability to use the software."
    }
  ];

  return (
    <section className="pb-20 max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="mb-12">
        <p className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-[10px] font-bold tracking-[0.14em] text-[#0057FF] shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[#0057FF]" /> LEGAL & PRIVACY
        </p>
        <h1 className={`mt-5 font-display text-4xl font-bold tracking-tight sm:text-6xl ${nightMode ? "text-white" : "text-slate-800"}`}>Terms & Conditions.</h1>
        <p className={`mt-4 text-[15px] leading-relaxed ${nightMode ? "text-slate-400" : "text-slate-500"}`}>Effective Date: August 24, 2026. Please read these terms carefully before using NextPrep.</p>
      </div>

      <div className={`mt-10 rounded-[32px] border p-8 sm:p-12 shadow-sm ${nightMode ? "border-white/10 bg-[#10173A]/30" : "border-slate-100 bg-white"}`}>
        
        {/* Intro text */}
        <div className={`p-6 rounded-2xl border mb-10 ${nightMode ? "bg-[#0057FF]/10 border-[#0057FF]/20 text-blue-200" : "bg-[#F4F7FC] border-[#E2E8F0] text-slate-700"}`}>
          <p className="text-[15px] font-semibold leading-relaxed">
            Welcome to NextPrep! These terms outline the rules and regulations for the use of our local interview preparation software. By proceeding, you acknowledge that you have read and understood these terms.
          </p>
        </div>

        <div className="space-y-12">
          {sections.map((section, idx) => (
            <div key={idx}>
              <h2 className={`font-display text-xl sm:text-2xl font-bold tracking-tight ${nightMode ? "text-white" : "text-slate-800"}`}>
                {section.title}
              </h2>
              <p className={`mt-4 text-[15px] leading-relaxed ${nightMode ? "text-slate-300" : "text-slate-600"}`}>
                {section.content}
              </p>
            </div>
          ))}
        </div>
        
        <div className={`mt-12 pt-8 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${nightMode ? "border-white/10" : "border-slate-100"}`}>
          <p className={`text-[13px] font-semibold italic ${nightMode ? "text-slate-400" : "text-slate-500"}`}>If you have any questions, please contact us via Help & Support.</p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="rounded-xl bg-slate-100 px-6 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-200 transition-colors">
            Back to top
          </button>
        </div>
      </div>
    </section>
  );
}
