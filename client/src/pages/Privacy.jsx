import { Link, useNavigate } from "react-router-dom";
import BrandLogo from "../components/ui/BrandLogo";

export default function Privacy({ nightMode = false, isEmbedded = false, onNavigateTab = null }) {
  const navigate = useNavigate();

  const sections = [
    {
      id: "collection",
      title: "1. Information We Collect",
      content:
        "NextPrep collects information necessary to deliver personalized, AI-driven placement preparation and mock interview evaluations:",
      bullets: [
        "Account Credentials: Full name, email address, and encrypted passwords (salted and hashed using bcrypt).",
        "Resume & Career Profiles: Resumes uploaded in PDF, DOCX, or TXT formats, including extracted skills, work experience, projects, and target roles.",
        "Interview Data: Responses provided during mock interview sessions, audio/text transcripts, and AI-generated performance evaluations.",
        "Technical & Session Data: IP address, authentication timestamps, and browser type used for security, rate-limiting, and session management."
      ]
    },
    {
      id: "usage",
      title: "2. How We Use Your Information",
      content:
        "Your data is used solely to provide and improve your interview preparation experience:",
      bullets: [
        "Generating progressive technical and behavioral interview questions tailored to your profile.",
        "Evaluating interview answers with real-time scoring, constructive critique, and actionable next steps.",
        "Performing ATS (Applicant Tracking System) compatibility reviews and resume keyword optimization.",
        "Securing user accounts and preventing unauthorized access or automated brute-force attacks."
      ]
    },
    {
      id: "ai-infrastructure",
      title: "3. AI Processing & Third-Party LLM Infrastructure",
      content:
        "NextPrep integrates high-speed AI inference (via Groq Cloud API using models such as Qwen and Llama architectures) and local vector embeddings (@xenova/transformers). When your resume or responses are evaluated:",
      bullets: [
        "Secure Transmission: Data is transmitted over encrypted TLS 1.3 HTTPS connections.",
        "Zero Public Model Training: Your resume details and interview responses are processed for transient inference only and are never used to train public commercial AI models.",
        "Context Minimization: Only the specific text required for question generation and answer scoring is provided to the AI model."
      ]
    },
    {
      id: "cookies",
      title: "4. Cookies & Local Storage Policy",
      content:
        "We employ transparent cookies and browser storage in compliance with global standards (GDPR, CCPA, DPDP):",
      bullets: [
        "Essential Storage: JSON Web Tokens (JWT) stored in LocalStorage to maintain your secure login session across pages.",
        "Consent Preferences: A cookie banner allows you to 'Accept All' or 'Decline' non-essential cookies. Your preference is remembered for 1 year.",
        "Analytics: Non-essential analytics scripts are strictly blocked unless you provide explicit consent by clicking 'Accept All'."
      ]
    },
    {
      id: "security",
      title: "5. Data Security & Storage",
      content:
        "We apply industry-standard security safeguards to protect your personal information:",
      bullets: [
        "Relational Database: User profiles, resumes, and interview logs are stored in PostgreSQL with strict access boundaries.",
        "Password Hashing: Passwords are irreversibly hashed using bcrypt; plain-text passwords are never logged or stored.",
        "API Rate Limiting: Authentication and OTP endpoints are protected against credential stuffing and automated abuse.",
        "Token Expiry: JWT authentication tokens automatically expire, requiring secure re-authentication."
      ]
    },
    {
      id: "user-rights",
      title: "6. Your Rights & Data Control",
      content:
        "You retain complete ownership over your career data and have the right to:",
      bullets: [
        "Access & Export: Review your uploaded resumes, ATS scores, and interview histories anytime from the Dashboard.",
        "Update & Correct: Modify your target role, experience level, and account profile details.",
        "Permanent Deletion: Request the deletion of your account and all associated resumes, transcripts, and scores."
      ]
    },
    {
      id: "retention",
      title: "7. Data Retention Policy",
      content:
        "We retain your account records, uploaded resumes, and interview transcripts for as long as your account remains active. If you delete your account or specific resume uploads, they are permanently removed from our active database."
    },
    {
      id: "contact",
      title: "8. Policy Updates & Contact",
      content:
        "We may update this Privacy Policy as we expand our AI interview features or update regulatory compliance. For privacy inquiries or data requests, contact us at privacy@nextprep.io or via the Support section."
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
                to="/terms"
                className="text-xs font-bold text-slate-600 hover:text-[#3355E8] transition-colors hidden sm:inline-block"
              >
                Terms of Service
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
            {isEmbedded && onNavigateTab ? (
              <button
                type="button"
                onClick={() => onNavigateTab("Terms")}
                className="rounded-lg px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
              >
                Terms of Service
              </button>
            ) : (
              <Link
                to="/terms"
                className="rounded-lg px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
              >
                Terms of Service
              </Link>
            )}
            <span className="rounded-lg bg-[#131A2E] px-4 py-2 text-xs font-bold text-white shadow-sm">
              Privacy Policy
            </span>
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
            <span className="h-1.5 w-1.5 rounded-full bg-[#3355E8]" /> PRIVACY & DATA PROTECTION
          </p>
          <h1 className="mt-4 font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#131A2E]">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-slate-500 leading-relaxed max-w-2xl">
            Last Updated: October 2026. This policy explains how NextPrep collects, uses, encrypts, and protects your personal data, resumes, and interview responses.
          </p>
        </div>

        {/* Commitment Highlight Box */}
        <div className="mb-10 rounded-2xl border border-blue-200 bg-blue-50/70 p-6 sm:p-7 text-[#131A2E] shadow-sm">
          <h3 className="text-base font-bold text-[#131A2E] flex items-center gap-2">
            <span>🛡️</span> Our Core Privacy Commitment
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-700 font-medium">
            NextPrep is built to empower your career, not monetize your personal information. We never sell your resume or personal details to third-party recruiters or advertisers. All AI inference is conducted securely with strict data isolation.
          </p>
        </div>

        {/* Policy Sections */}
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
              Have questions regarding our privacy practices? Contact privacy@nextprep.io
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
              <Link to="/terms" className="hover:text-[#3355E8] transition-colors">
                Terms of Service
              </Link>
              <span>•</span>
              <Link to="/privacy" className="hover:text-[#3355E8] transition-colors font-bold text-[#3355E8]">
                Privacy Policy
              </Link>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
