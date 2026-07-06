import type { ReactNode } from "react";

interface CheckboxGroupProps {
  legend: string;
  children: ReactNode;
}

export function CheckboxGroup({ legend, children }: CheckboxGroupProps) {
  return (
    <fieldset className="flex w-full max-w-sm flex-col items-center gap-6">
      <legend className="w-full text-center font-body text-lg font-bold uppercase text-dark-matter">
        {legend}
      </legend>
      <div className="flex w-full flex-col items-start gap-1">{children}</div>
    </fieldset>
  );
}
