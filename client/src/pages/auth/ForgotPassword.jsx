import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layout/authLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { requestPasswordReset } from "../../services/authService";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    if (!EMAIL_REGEX.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      await requestPasswordReset({ email: email.trim() });
      navigate("/reset-password", { state: { email: email.trim() } });
    } catch (requestError) {
      setError(requestError?.message || "Couldn't send a reset code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Password reset"
      title="Forgot your password?"
      subtitle="Enter the email address associated with your account and we’ll send a six-digit reset code."
      footer={<><Link to="/login" className="font-semibold text-[#0057FF] hover:underline">Back to log in</Link></>}
    >
      {error && <div role="alert" className="mb-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{error}</div>}
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <Input id="email" name="email" type="email" label="Email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" />
        <Button type="submit" loading={loading} className="mt-2">Send reset code</Button>
      </form>
    </AuthLayout>
  );
}
