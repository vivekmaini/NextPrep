const VARIANT_CLASSES = {
  primary:
    "bg-[#3355E8] text-white shadow-[0_4px_8px_rgba(16,23,58,0.12),0_16px_32px_rgba(51,85,232,0.28)] hover:-translate-y-0.5 hover:bg-[#2542C4] hover:shadow-[0_8px_14px_rgba(16,23,58,0.14),0_20px_36px_rgba(51,85,232,0.32)] active:translate-y-0 active:scale-[0.98] focus-visible:ring-[#3355E8] disabled:bg-[#DCE3FA] disabled:shadow-none",
  secondary:
    "bg-white text-[#3355E8] border border-[#DCE3FA] hover:-translate-y-0.5 hover:bg-[#EAEEFC] active:translate-y-0 active:scale-[0.98] focus-visible:ring-[#3355E8] disabled:text-[#6B7280] disabled:border-[#DCE3FA]",
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
      className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold
        transition duration-200 ease-out focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2
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
