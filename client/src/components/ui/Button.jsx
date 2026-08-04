const VARIANT_CLASSES = {
  primary:
    "bg-[#0057FF] text-white shadow-[0_8px_16px_rgba(0,87,255,0.2)] hover:bg-[#0047D1] hover:shadow-[0_10px_20px_rgba(0,87,255,0.25)] focus-visible:ring-[#0057FF] disabled:bg-blue-300 disabled:shadow-none",
  secondary:
    "bg-white text-[#0057FF] border border-[#0057FF] hover:bg-[#E6EEFF] focus-visible:ring-[#0057FF] disabled:text-blue-300 disabled:border-blue-200",
};

/**
 * Shared button used across auth, dashboard, and every other module.
 * variant: "primary" | "secondary"
 * loading: shows a spinner and disables the button
 */
export default function Button({
  children,
  type = "button",
  variant = "primary",
  loading = false,
  disabled = false,
  className = "",
  ...rest
}) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold
        transition duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
        disabled:cursor-not-allowed ${VARIANT_CLASSES[variant]} ${className}`}
      {...rest}
    >
      {loading && (
        <svg
          className="h-4 w-4 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
