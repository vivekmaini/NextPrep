import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layout/authLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { resetPassword } from "../../services/authService";

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const [form, setForm] = useState({ otp: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: name === "otp" ? value.replace(/\D/g, "").slice(0, 6) : value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    if (form.otp.length !== 6) return setError("Enter the six-digit code from your email.");
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");
    if (form.password !== form.confirmPassword) return setError("Passwords do not match.");

    setLoading(true);
    try {
      await resetPassword({ email, otp: form.otp, password: form.password });
      navigate("/login", { replace: true, state: { passwordReset: true } });
    } catch (requestError) {
      setError(requestError?.message || "Couldn't reset your password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // The reset email only lives in router state. A refresh clears it, so return
  // to the landing page instead of showing a reset form without an account.
  if (!email) return <Navigate to="/" replace />;
  return (
    <AuthLayout
      eyebrow="Password reset"
      title="Set a new password"
      subtitle={<>Enter the code sent to <span className="font-semibold text-slate-700">{email}</span>, then choose a new password.</>}
      footer={<>Didn&apos;t receive a code? <Link to="/forgot-password" className="font-semibold text-[#0057FF] hover:underline">Send another</Link></>}
    >
      {error && <div role="alert" className="mb-3 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs sm:text-sm font-medium text-red-600">{error}</div>}
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-2.5">
        <Input id="otp" name="otp" label="Reset code" placeholder="6-digit code" value={form.otp} onChange={handleChange} inputMode="numeric" autoComplete="one-time-code" compact />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <Input id="password" name="password" type="password" label="New password" placeholder="At least 6 chars" value={form.password} onChange={handleChange} autoComplete="new-password" compact />
          <Input id="confirmPassword" name="confirmPassword" type="password" label="Confirm password" placeholder="Re-enter password" value={form.confirmPassword} onChange={handleChange} autoComplete="new-password" compact />
        </div>
        <Button type="submit" loading={loading} size="compact" className="mt-1">Reset password</Button>
      </form>
    </AuthLayout>
  );
}
