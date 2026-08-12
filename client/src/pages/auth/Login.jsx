import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AuthLayout from "../../components/layout/authLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import OrDivider from "../../components/ui/OrDivider";
import GoogleButton from "../../components/ui/Googlebutton";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const initialNavigation = performance.getEntriesByType("navigation")[0];
const openedByRefresh = window.location.pathname === "/login" && initialNavigation?.type === "reload";
let refreshRedirectHandled = false;

function validate({ email, password }) {
  const errors = {};

  if (!email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!password) {
    errors.password = "Password is required.";
  }

  return errors;
}

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (openedByRefresh && !refreshRedirectHandled) {
      refreshRedirectHandled = true;
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");

    const errors = validate(form);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setLoading(true);
    try {
      await login(form);
      const redirectTo = location.state?.from || "/dashboard";
      navigate(redirectTo, { replace: true });
    } catch (error) {
      setFormError(error?.message || "Unable to log in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Welcome back"
      title="Log in to NextPrep"
      subtitle="Pick up your placement prep right where you left off."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link to="/register" className="font-semibold text-[#0057FF] hover:underline">
            Create one
          </Link>
        </>
      }
    >
      {formError && (
        <div
          role="alert"
          className="mb-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
        >
          {formError}
        </div>
      )}
      {location.state?.passwordReset && (
        <div className="mb-5 rounded-md border border-[#A8E6CF] bg-[#F2FBF7] px-4 py-3 text-sm font-medium text-[#1F7A5C]">
          Your password was reset. Log in with your new password.
        </div>
      )}

      <GoogleButton onError={setFormError} />
      <OrDivider />

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <Input
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          error={fieldErrors.email}
          autoComplete="email"
        />
        <Input
          id="password"
          name="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
          error={fieldErrors.password}
          autoComplete="current-password"
        />

        <div className="-mt-1 text-right">
          <Link to="/forgot-password" className="text-sm font-semibold text-[#0057FF] hover:underline">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" loading={loading} className="mt-2">
          Log in
        </Button>
      </form>
    </AuthLayout>
  );
}
