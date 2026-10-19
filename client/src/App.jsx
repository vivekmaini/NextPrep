import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useState, useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import VerifyEmail from "./pages/auth/verifyEmail";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Dashboard from "./pages/Dashboard/Dashboard";
import Landing from "./pages/Landing";
import InterviewSession from "./pages/interview/InterviewSession";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";

function CookieBanner() {
  const { user } = useAuth();
  const [show, setShow] = useState(false);

  const saveToDatabase = async (consentValue) => {
    try {
      if (user?.email) {
        await fetch(`${import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api"}/auth/consent`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email, consent: consentValue })
        });
      }
    } catch (err) {
      console.error("Failed to save consent to DB", err);
    }
  };

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent-given");
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!show) return null;

  const acceptCookies = () => {
    // 1. Set REAL Browser Cookie for 1 year (Standard practice)
    document.cookie = "nextprep_cookie_consent=accepted; max-age=31536000; path=/; SameSite=Lax";
    
    // 2. Local fallback & DB save
    localStorage.setItem("cookie-consent-given", "accepted");
    saveToDatabase("accepted");
    
    // 3. Inject Google Analytics / Tracking Scripts dynamically (Like big tech websites)
    const gaScript = document.createElement("script");
    gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-NEXTPREP"; // Replace with your actual G-TAG later
    gaScript.async = true;
    document.head.appendChild(gaScript);

    const inlineScript = document.createElement("script");
    inlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-NEXTPREP', { 'anonymize_ip': true });
      console.log('✅ Google Analytics & Tracking Activated');
    `;
    document.head.appendChild(inlineScript);

    setShow(false);
  };

  const declineCookies = () => {
    // 1. Set real browser cookie for strict tracking blocking
    document.cookie = "nextprep_cookie_consent=declined; max-age=31536000; path=/; SameSite=Lax";
    
    localStorage.setItem("cookie-consent-given", "declined");
    saveToDatabase("declined");
    
    console.log('🚫 Tracking blocked by user');
    setShow(false);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full z-[9999] p-4 flex justify-center pointer-events-none">
      <div className="bg-white p-5 md:p-6 rounded-2xl shadow-2xl border border-[#DCE3FA] flex flex-col md:flex-row items-center justify-between gap-5 max-w-4xl w-full pointer-events-auto">
        <div className="flex-1">
          <h4 className="m-0 text-base md:text-lg font-bold text-[#131A2E] mb-1">
            Cookie & Privacy Preferences
          </h4>
          <p className="m-0 text-sm text-slate-500 font-medium leading-relaxed">
            We use cookies to enhance your browsing experience, maintain secure sessions, and analyze platform performance. Review our{" "}
            <Link to="/privacy" className="font-bold text-[#3355E8] underline hover:text-blue-800">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link to="/terms" className="font-bold text-[#3355E8] underline hover:text-blue-800">
              Terms of Service
            </Link>.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button 
            onClick={declineCookies} 
            className="flex-1 md:flex-none px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors"
          >
            Decline
          </button>
          <button 
            onClick={acceptCookies} 
            className="flex-1 md:flex-none px-5 py-2.5 rounded-xl bg-[#131A2E] text-white font-bold text-sm hover:bg-[#1a233e] transition-colors shadow-sm"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CookieBanner />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/interview" element={<InterviewSession />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
