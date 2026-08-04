import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AuthLayout from "../../components/layout/authLayout";
import Button from "../../components/ui/Button";

const OTP_LENGTH = 6;
const RESEND_COOLDOWN_SECONDS = 60;

export default function VerifyEmail() {
  const { verifyOtp, resendOtp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(""));
  const [formError, setFormError] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN_SECONDS);
  const inputRefs = useRef([]);

  // If someone lands here directly (no email in state), send them back to register.
  useEffect(() => {
    if (!email) {
      navigate("/register", { replace: true });
    }
  }, [email, navigate]);

  useEffect(() => {
    if (cooldown <= 0) return undefined;
    const timer = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const focusInput = (index) => {
    inputRefs.current[index]?.focus();
  };

  const handleChange = (index, rawValue) => {
    const value = rawValue.replace(/\D/g, "");
    if (!value) {
      setDigits((prev) => {
        const next = [...prev];
        next[index] = "";
        return next;
      });
      return;
    }

    // Handle paste of the full code into a single box.
    if (value.length > 1) {
      const chars = value.slice(0, OTP_LENGTH).split("");
      setDigits((prev) => {
        const next = [...prev];
        chars.forEach((char, i) => {
          if (index + i < OTP_LENGTH) next[index + i] = char;
        });
        return next;
      });
      focusInput(Math.min(index + chars.length, OTP_LENGTH - 1));
      return;
    }

    setDigits((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
    if (index < OTP_LENGTH - 1) focusInput(index + 1);
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      focusInput(index - 1);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");
    setInfoMessage("");

    const otp = digits.join("");
    if (otp.length !== OTP_LENGTH) {
      setFormError(`Enter the full ${OTP_LENGTH}-digit code.`);
      return;
    }

    setLoading(true);
    try {
      await verifyOtp({ email, otp });
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setFormError(error?.message || "That code didn't work. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (cooldown > 0 || resending) return;
    setFormError("");
    setInfoMessage("");
    setResending(true);
    try {
      await resendOtp({ email });
      setInfoMessage("A new code is on its way to your inbox.");
      setCooldown(RESEND_COOLDOWN_SECONDS);
      setDigits(Array(OTP_LENGTH).fill(""));
      focusInput(0);
    } catch (error) {
      setFormError(error?.message || "Couldn't resend the code. Please try again.");
    } finally {
      setResending(false);
    }
  };

  if (!email) return null;

  return (
    <AuthLayout
      eyebrow="One last step"
      title="Verify your email"
      subtitle={
        <>
          We sent a {OTP_LENGTH}-digit code to{" "}
          <span className="font-semibold text-slate-700">{email}</span>
        </>
      }
      footer={
        <>
          Wrong email?{" "}
          <Link to="/register" className="font-semibold text-[#0057FF] hover:underline">
            Go back
          </Link>
        </>
      }
    >
      {formError && (
        <div
          role="alert"
          className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
        >
          {formError}
        </div>
      )}
      {infoMessage && (
        <div className="mb-5 rounded-2xl border border-[#A8E6CF] bg-[#F2FBF7] px-4 py-3 text-sm font-medium text-[#1F7A5C]">
          {infoMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex justify-between gap-2">
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              autoComplete={index === 0 ? "one-time-code" : "off"}
              maxLength={OTP_LENGTH}
              value={digit}
              onChange={(event) => handleChange(index, event.target.value)}
              onKeyDown={(event) => handleKeyDown(index, event)}
              className="h-14 w-12 rounded-2xl border border-[#EFE9DD] text-center text-lg font-semibold text-slate-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#0057FF]"
            />
          ))}
        </div>

        <Button type="submit" loading={loading}>
          Verify email
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Didn&apos;t get the code?{" "}
        {cooldown > 0 ? (
          <span className="text-slate-400">Resend in {cooldown}s</span>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            disabled={resending}
            className="font-semibold text-[#0057FF] hover:underline disabled:opacity-60"
          >
            {resending ? "Sending…" : "Resend code"}
          </button>
        )}
      </p>
    </AuthLayout>
  );
}
