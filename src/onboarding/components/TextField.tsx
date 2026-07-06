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
    <div className={`flex w-full flex-col gap-2 ${isLeft ? "items-start" : "items-center"}`}>
      <label
        htmlFor={fieldId}
        className={`w-full font-body text-lg font-bold uppercase text-dark-matter ${
          isLeft ? "text-left" : "text-center"
        }`}
      >
        {label}
      </label>
      <input
        id={fieldId}
        className={`h-11 w-full rounded-full border border-dark-matter bg-transparent px-4
          font-body text-base text-dark-matter
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
