import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent-given");
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!show) return null;

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent-given", "accepted");
    setShow(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookie-consent-given", "declined");
    setShow(false);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full z-[9999] p-4 flex justify-center pointer-events-none">
      <div className="bg-white p-5 md:p-6 rounded-2xl shadow-2xl border border-[#DCE3FA] flex flex-col md:flex-row items-center justify-between gap-5 max-w-4xl w-full pointer-events-auto transform transition-all translate-y-0 opacity-100">
        
        <div className="flex-1">
          <h4 className="m-0 text-base md:text-lg font-bold text-[#131A2E] mb-1">
            🍪 We value your privacy
          </h4>
          <p className="m-0 text-sm text-slate-500 font-medium leading-relaxed">
            We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
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
