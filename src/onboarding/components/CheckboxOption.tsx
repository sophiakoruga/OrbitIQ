import { useId } from "react";

interface CheckboxOptionProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function CheckboxOption({ label, checked, onChange }: CheckboxOptionProps) {
  const id = useId();

  return (
    <label
      htmlFor={id}
      className="flex min-h-11 w-full cursor-pointer items-center gap-2.5 py-1"
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="size-5 shrink-0 accent-boysenberry
          focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-boysenberry"
      />
      <span className="font-body text-base text-boysenberry">{label}</span>
    </label>
  );
}
