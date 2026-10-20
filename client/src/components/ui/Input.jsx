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
        <label htmlFor={id} className="text-sm font-semibold text-[#131A2E]">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          type={isPassword && isPasswordVisible ? "text" : type}
          className={`w-full rounded-2xl border bg-[#F7F5EF] px-3.5 py-3 text-sm text-[#131A2E] placeholder:text-[#6B7280]
            transition duration-200 focus:border-[#3355E8] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#EAEEFC]
            ${isPassword ? "pr-12" : ""} ${error ? "border-red-400 focus:border-red-500 focus:ring-red-100" : "border-[#DCE3FA]"} ${className}`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          {...rest}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setIsPasswordVisible((visible) => !visible)}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-xs font-semibold text-[#6B7280] transition hover:text-[#3355E8] focus:outline-none focus-visible:text-[#3355E8]"
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
