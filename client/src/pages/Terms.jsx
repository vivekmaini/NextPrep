import React from "react";

export default function Terms({ nightMode }) {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing, downloading, or using the NextPrep application ('Service'), you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, you must not use our software. NextPrep reserves the right to update these terms at any time, with updates taking effect upon the next launch of your local environment."
    },
    {
      title: "2. Local Processing & Absolute Privacy",
      content: "NextPrep is uniquely designed as an offline-first, local application utilizing Ollama models. We explicitly guarantee that we do not collect, harvest, upload, or transmit your interview responses, uploaded resumes, personal identifiable information (PII), or usage metrics to any remote server. Your data remains completely private on your local machine."
    },
    {
      title: "3. User Conduct and Restrictions",
      content: "You agree to use NextPrep solely for personal interview preparation and educational purposes. You shall not:\n- Attempt to reverse engineer, decompile, or bypass the local RAG pipeline logic.\n- Use the AI output to commit academic fraud or misrepresent your qualifications.\n- Resell or package NextPrep's interview analysis engine as a commercial consulting service without obtaining an enterprise license."
    },
    {
      title: "4. AI Feedback Disclaimer",
      content: "NextPrep provides AI-generated feedback for mock interviews, resume reviews, and aptitude tests based on statistical language models (LLMs). We do not guarantee job placements, interview success, or the absolute factual accuracy of the AI. The feedback provided is for self-improvement and guidance purposes only. You should always use human judgment alongside AI suggestions."
    },
    {
      title: "5. Intellectual Property Rights",
      content: "The codebase, UI/UX design, custom visual assets (including the Mountain Illustration and Brand Logos), and the proprietary RAG (Retrieval-Augmented Generation) knowledge base markdown structures belong exclusively to the creators of NextPrep. You are granted a limited, non-exclusive license to run the software locally."
    },
    {
      title: "6. Data Retention and Deletion",
      content: "Because all data is stored on your device via the browser's Local Storage and local file system, data retention is entirely under your control. You may permanently delete your data at any time via the 'Danger Zone' in the Profile Settings. NextPrep is not responsible for accidental data loss if you clear your browser cache."
    },
    {
      title: "7. Third-Party Dependencies",
      content: "NextPrep relies on open-source technologies, notably Node.js, React, Tailwind CSS, and Ollama. Your use of these underlying technologies is subject to their respective open-source licenses (MIT, Apache 2.0). NextPrep assumes no liability for vulnerabilities originating from third-party packages."
    },
    {
      title: "8. Limitation of Liability",
      content: "To the maximum extent permitted by applicable law, NextPrep and its developers shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of potential income from failed job interviews, resulting from your use of or inability to use the software."
    },
    {
      title: "9. Governing Law",
      content: "These Terms shall be governed and construed in accordance with standard software consumer protection guidelines, without regard to its conflict of law provisions. Any disputes regarding the open-source license or enterprise usage shall be handled in the appropriate legal jurisdiction of the repository owner."
    }
  ];

  return (
    <section className="pb-16 max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="text-center sm:text-left mb-12">
        <p className="inline-flex items-center gap-2 rounded-full border border-[#DCE3FA] bg-white/80 px-3 py-1.5 text-[10px] font-bold tracking-[0.14em] text-[#3355E8] shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[#3355E8]" /> LEGAL & PRIVACY
        </p>
        <h1 className={`mt-4 font-hero text-4xl font-bold tracking-[-0.05em] sm:mt-5 sm:text-6xl ${nightMode ? "text-white" : "text-[#131A2E]"}`}>Terms & Conditions.</h1>
        <p className={`mt-4 text-sm leading-6 sm:mt-5 sm:text-base ${nightMode ? "text-slate-400" : "text-slate-600"}`}>Effective Date: August 24, 2026. Please read these terms carefully before using NextPrep.</p>
      </div>

      <div className={`mt-10 text-left space-y-10 rounded-[28px] sm:rounded-[40px] border p-8 sm:p-12 shadow-soft ${nightMode ? "border-white/10 bg-[#10173A]/30 text-slate-300" : "border-[#DCE3FA] bg-white text-slate-700"}`}>
        
        {/* Intro text */}
        <div className={`p-5 rounded-2xl border ${nightMode ? "bg-[#3355E8]/10 border-[#3355E8]/20" : "bg-[#EAEEFC] border-[#DCE3FA]"}`}>
          <p className={`text-sm font-semibold leading-relaxed ${nightMode ? "text-blue-200" : "text-[#3355E8]"}`}>
            Welcome to NextPrep! These terms outline the rules and regulations for the use of our local interview preparation software. By proceeding, you acknowledge that you have read and understood these terms.
          </p>
        </div>

        {sections.map((section, idx) => (
          <div key={idx}>
            <h2 className={`font-display text-xl sm:text-2xl font-bold tracking-tight ${nightMode ? "text-white" : "text-[#131A2E]"}`}>
              {section.title}
            </h2>
            {section.content.split('\n').map((paragraph, pIdx) => (
              <p key={pIdx} className="mt-4 text-sm sm:text-base leading-7 sm:leading-8 opacity-90">
                {paragraph}
              </p>
            ))}
          </div>
        ))}
        
        <div className={`mt-12 pt-8 border-t ${nightMode ? "border-white/10" : "border-[#DCE3FA]/50"}`}>
          <p className="text-sm italic">If you have any questions about these Terms, please contact us via the Help & Support page in your dashboard.</p>
        </div>
      </div>
    </section>
  );
}
