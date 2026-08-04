import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const SCRIPT_SRC = "https://accounts.google.com/gsi/client";

function loadGoogleScript() {
  return new Promise((resolve, reject) => {
    if (window.google?.accounts?.id) return resolve();

    const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", resolve, { once: true });
      existing.addEventListener("error", reject, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

export default function GoogleButton({ onError }) {
  const { loginWithGoogle } = useAuth();
  const buttonRef = useRef(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    if (!isPanelOpen || !GOOGLE_CLIENT_ID) return undefined;

    let cancelled = false;

    loadGoogleScript()
      .then(() => {
        if (cancelled || !buttonRef.current || !window.google?.accounts?.id) return;

        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          auto_select: false,
          cancel_on_tap_outside: true,
          callback: async (response) => {
            setIsLoading(true);
            try {
              await loginWithGoogle(response.credential);
              window.location.href = "/dashboard";
            } catch (error) {
              const message = error?.message || "Google sign-in failed. Please try again.";
              setAuthError(message);
              onError?.(message);
              setIsLoading(false);
            }
          },
        });

        window.google.accounts.id.renderButton(buttonRef.current, {
          theme: "outline",
          size: "large",
          width: 320,
          shape: "rectangular",
          text: "continue_with",
        });
        setIsLoading(false);
      })
      .catch(() => {
        if (!cancelled) {
          setIsLoading(false);
          const message = "Couldn't load Google sign-in. Check your connection and try again.";
          setAuthError(message);
          onError?.(message);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [isPanelOpen, loginWithGoogle, onError]);

  if (!GOOGLE_CLIENT_ID) {
    return (
      <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-3.5 py-3 text-center text-xs text-slate-500">
        Set VITE_GOOGLE_CLIENT_ID to enable Google sign-in.
      </p>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setAuthError("");
          setIsLoading(true);
          setIsPanelOpen(true);
        }}
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-[#F8F7F4] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#E6EEFF]"
      >
        <GoogleIcon />
        Continue with Google
      </button>

      {isPanelOpen && (
        <div className="fixed inset-0 z-50 flex items-end bg-slate-950/35 p-3 backdrop-blur-[2px] sm:items-center sm:justify-center sm:p-6">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="google-sign-in-title"
            className="w-full rounded-3xl bg-white p-6 shadow-2xl sm:max-w-sm sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-[#0057FF]">NextPrep</p>
                <h2 id="google-sign-in-title" className="mt-1 font-display text-xl font-bold text-slate-950">
                  Sign in with Google
                </h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsPanelOpen(false);
                  setIsLoading(false);
                }}
                className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close Google sign-in"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="m6 6 12 12M18 6 6 18" />
                </svg>
              </button>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-500">Choose your Google account to continue securely.</p>
            {authError && (
              <p role="alert" className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-600">
                {authError}
              </p>
            )}
            <div className="mt-6 flex min-h-11 justify-center">
              {isLoading && <span className="text-sm text-slate-500">Preparing Google sign-in…</span>}
              <div ref={buttonRef} className={isLoading ? "hidden" : ""} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M21.6 12.23c0-.72-.06-1.24-.2-1.78H12v3.37h5.52c-.11.84-.72 2.1-2.08 2.95l-.02.11 3.02 2.34.21.02c1.92-1.77 2.95-4.37 2.95-7.01Z" />
      <path fill="#34A853" d="M12 22c2.7 0 4.97-.89 6.63-2.42l-3.16-2.45c-.85.59-1.99 1-3.47 1a6 6 0 0 1-5.68-4.14l-.1.01-3.14 2.43-.03.1A10 10 0 0 0 12 22Z" />
      <path fill="#FBBC05" d="M6.32 14A6.22 6.22 0 0 1 6 12c0-.7.12-1.38.31-2L6.3 9.87 3.13 7.4l-.1.05A10 10 0 0 0 2 12c0 1.61.39 3.13 1.03 4.55L6.32 14Z" />
      <path fill="#EA4335" d="M12 5.86c1.86 0 3.12.8 3.84 1.47l2.8-2.73C16.96 3.05 14.7 2 12 2A10 10 0 0 0 3.03 7.45L6.3 10A6 6 0 0 1 12 5.86Z" />
    </svg>
  );
}
