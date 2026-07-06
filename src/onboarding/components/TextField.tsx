import type { InputHTMLAttributes } from "react";
import { useId } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function TextField({ label, error, id, className = "", ...inputProps }: TextFieldProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const errorId = `${fieldId}-error`;

  return (
    <div className="flex w-full flex-col items-center gap-2">
      <label
        htmlFor={fieldId}
        className="w-full text-center font-body text-lg font-bold uppercase text-dark-matter"
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
        <p id={errorId} role="alert" className="w-full text-center text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
