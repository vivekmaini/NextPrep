import React from "react";
import { Link, useNavigate } from "react-router-dom";
import BrandLogo from "../components/ui/BrandLogo";

export default function Terms({ nightMode = false, isEmbedded = false, onNavigateTab = null }) {
  const navigate = useNavigate();

  const sections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      content:
        "By accessing, registering for, or using the NextPrep platform ('Service', 'we', 'our'), you agree to be bound by these Terms and Conditions ('Terms'). If you do not agree to all terms and conditions, you must not access or use NextPrep. We reserve the right to revise these terms at any time, with updates posted on this page."
    },
    {
      id: "services",
      title: "2. Description of Service",
      content:
        "NextPrep provides an AI-powered mock interview and placement readiness platform. Features include role-specific question generation, automated answer scoring, structured feedback, and Applicant Tracking System (ATS) resume reviews. The platform is designed for educational and self-preparation purposes."
    },
    {
      id: "accounts",
      title: "3. User Accounts & Security",
      content:
        "To access certain features of NextPrep, you must register for an account. You agree to provide accurate, current, and complete registration information. You are solely responsible for maintaining the confidentiality of your credentials and for all activities that occur under your account. Notify us immediately of any suspected unauthorized account access."
    },
    {
      id: "ai-disclaimer",
      title: "4. AI Output & Placement Disclaimer",
      content:
        "NextPrep provides AI-generated evaluations and scores powered by advanced language models and retrieval-augmented algorithms. You acknowledge and agree that:",
      bullets: [
        "Advisory Nature: AI scores and feedback are automated estimations designed for practice only and do not guarantee actual job offers, interview performance, or employment success.",
        "Accuracy: While we continually calibrate our evaluation rubrics, NextPrep does not warrant that AI feedback will be error-free or perfectly aligned with any specific company's hiring rubric.",
        "Human Judgment: NextPrep is an educational aid. You should exercise your own professional judgment when preparing job applications and interviewing."
      ]
    },
    {
      id: "acceptable-use",
      title: "5. Acceptable Use Policy",
      content:
        "You agree to use NextPrep in compliance with all applicable laws and ethical standards. You shall not:",
      bullets: [
        "Upload resumes, job descriptions, or answer content containing harmful, defamatory, or unlawful materials.",
        "Attempt to reverse-engineer, decompile, scrape, or extract the underlying RAG knowledge base or proprietary prompts.",
        "Interfere with or circumvent platform security measures, authentication tokens, or rate-limiting middleware.",
        "Use automated scripts, bots, or scrapers to generate unnatural volume or degrade platform responsiveness."
      ]
    },
    {
      id: "intellectual-property",
      title: "6. Intellectual Property Rights",
      content:
        "The NextPrep software, logo, design system, custom visual components, and platform materials are the intellectual property of NextPrep and its licensors. You retain ownership of any resume files or interview answers you upload, granting NextPrep a limited license to process such data strictly for providing your requested analysis."
    },
    {
      id: "third-party",
      title: "7. Third-Party Services & Infrastructure",
      content:
        "NextPrep utilizes reliable third-party infrastructure providers, including cloud AI inference providers (such as Groq API) and cloud database systems. Your use of NextPrep is also subject to the operational availability of these services."
    },
    {
      id: "liability",
      title: "8. Limitation of Liability",
      content:
        "To the fullest extent permitted by law, NextPrep and its creators shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of potential employment, salary, or data, arising from your use of or inability to use the platform."
    },
    {
      id: "termination",
      title: "9. Termination",
      content:
        "We reserve the right to suspend or terminate your account or access to the Service at our sole discretion, without prior notice, if you breach these Terms or engage in conduct detrimental to the platform or other users."
    },
    {
      id: "contact",
      title: "10. Contact Information",
      content:
        "If you have questions regarding these Terms & Conditions, please contact us at support@nextprep.io or via our Help & Support page."
    }
  ];

  return (
    <div className={`min-h-screen ${nightMode ? "bg-[#0B1026] text-white" : "bg-[#F4F7FC] text-[#131A2E]"}`}>
      {/* Top Header for standalone public view */}
      {!isEmbedded && (
        <header className="sticky top-0 z-40 border-b border-[#DCE3FA] bg-white/90 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
            <Link to="/" className="flex items-center gap-2">
              <BrandLogo />
            </Link>
            <div className="flex items-center gap-3">
              <Link
                to="/privacy"
                className="text-xs font-bold text-slate-600 hover:text-[#3355E8] transition-colors hidden sm:inline-block"
              >
                Privacy Policy
              </Link>
              <Link
                to="/login"
                className="rounded-xl border border-[#DCE3FA] bg-white px-4 py-2 text-xs font-bold text-[#131A2E] hover:bg-[#EAEEFC] transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="rounded-xl bg-[#3355E8] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#2546D9] transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-5 py-12 sm:px-8 lg:py-16">
        {/* Switcher Pill */}
        <div className="flex items-center justify-between mb-8">
          <div className="inline-flex rounded-xl border border-[#DCE3FA] bg-white p-1 shadow-sm">
            <span className="rounded-lg bg-[#131A2E] px-4 py-2 text-xs font-bold text-white shadow-sm">
              Terms of Service
            </span>
            {isEmbedded && onNavigateTab ? (
              <button
                type="button"
                onClick={() => onNavigateTab("Privacy")}
                className="rounded-lg px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
              >
                Privacy Policy
              </button>
            ) : (
              <Link
                to="/privacy"
                className="rounded-lg px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
              >
                Privacy Policy
              </Link>
            )}
          </div>
          <button
            onClick={() => (isEmbedded && onNavigateTab ? onNavigateTab("Overview") : navigate(-1))}
            className="text-xs font-bold text-slate-500 hover:text-[#3355E8] transition-colors flex items-center gap-1.5"
          >
            ← Back
          </button>
        </div>

        {/* Hero header */}
        <div className="mb-10">
          <p className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-[#3355E8] shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3355E8]" /> LEGAL AGREEMENT
          </p>
          <h1 className="mt-4 font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#131A2E]">
            Terms & Conditions
          </h1>
          <p className="mt-3 text-sm text-slate-500 leading-relaxed max-w-2xl">
            Effective Date: October 2026. Please review these terms carefully prior to using the NextPrep platform.
          </p>
        </div>

        {/* Introduction Box */}
        <div className="mb-10 rounded-2xl border border-blue-200 bg-blue-50/70 p-6 sm:p-7 text-[#131A2E] shadow-sm">
          <p className="text-sm font-semibold leading-relaxed text-slate-800">
            Welcome to NextPrep. These Terms govern your access to and use of our placement preparation services, resume evaluation systems, and AI mock interview tools. By accessing NextPrep, you agree to these Terms.
          </p>
        </div>

        {/* Terms Sections */}
        <div className="rounded-[28px] border border-[#DCE3FA] bg-white p-7 sm:p-12 shadow-sm space-y-10">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-[#131A2E] tracking-tight">
                {section.title}
              </h2>
              <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-slate-600 font-normal">
                {section.content}
              </p>
              {section.bullets && (
                <ul className="mt-3 space-y-2.5 pl-5 list-disc text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                  {section.bullets.map((bullet, idx) => (
                    <li key={idx}>
                      <span className="font-semibold text-slate-800">{bullet.split(":")[0]}:</span>
                      {bullet.includes(":") ? bullet.slice(bullet.indexOf(":") + 1) : ""}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <div className="pt-8 border-t border-[#DCE3FA] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 italic">
              Have questions regarding our terms? Reach out to support@nextprep.io
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </main>

      {/* Footer for standalone public view */}
      {!isEmbedded && (
        <footer className="border-t border-[#DCE3FA] bg-white py-8 text-center text-xs text-slate-500">
          <div className="mx-auto max-w-6xl px-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span>© {new Date().getFullYear()} NextPrep. All rights reserved.</span>
            <div className="flex gap-4">
              <Link to="/terms" className="hover:text-[#3355E8] transition-colors font-bold text-[#3355E8]">
                Terms of Service
              </Link>
              <span>•</span>
              <Link to="/privacy" className="hover:text-[#3355E8] transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
