import type { InputHTMLAttributes } from "react";
import { useId } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  /** Onboarding screens are centered (default); Profile's settings-style
   *  form reads cleaner left-aligned. */
  align?: "center" | "left";
}

export function TextField({
  label,
  error,
  id,
  className = "",
  align = "center",
  ...inputProps
}: TextFieldProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const errorId = `${fieldId}-error`;
  const isLeft = align === "left";

  return (
    <div className={`flex w-full flex-col ${isLeft ? "gap-2.5 items-start" : "gap-2 items-center"}`}>
      <label
        htmlFor={fieldId}
        className={`w-full font-body font-bold uppercase text-dark-matter ${
          isLeft ? "text-left text-[15px]" : "text-center text-lg"
        }`}
      >
        {label}
      </label>
      <input
        id={fieldId}
        className={`h-11 w-full rounded-full border border-dark-matter bg-transparent px-4
          font-body text-base text-dark-matter transition-colors duration-150
          focus:border-boysenberry
          focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-boysenberry
          aria-[invalid=true]:border-red-600
          ${className}`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        {...inputProps}
      />
      {error && (
        <p
          id={errorId}
          role="alert"
          className={`w-full text-sm text-red-700 ${isLeft ? "text-left" : "text-center"}`}
        >
          {error}
        </p>
      )}
    </div>
  );
}
