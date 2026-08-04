import { useState } from "react";

export default function Input({
  label,
  id,
  type = "text",
  error,
  className = "",
  ...rest
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-slate-700">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          type={isPassword && isPasswordVisible ? "text" : type}
          className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400
            transition focus:border-[#0057FF] focus:outline-none focus:ring-4 focus:ring-[#E6EEFF]
            ${isPassword ? "pr-12" : ""} ${error ? "border-red-400 focus:border-red-500 focus:ring-red-100" : "border-slate-200"} ${className}`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          {...rest}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setIsPasswordVisible((visible) => !visible)}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-xs font-semibold text-slate-500 transition hover:text-[#0057FF] focus:outline-none focus-visible:text-[#0057FF]"
            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
          >
            {isPasswordVisible ? "Hide" : "Show"}
          </button>
        )}
      </div>
      {error && (
        <p id={`${id}-error`} className="text-xs font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
