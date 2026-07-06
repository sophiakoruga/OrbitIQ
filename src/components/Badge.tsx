import type { ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full bg-stratosphere/50 px-3 py-1 font-body text-sm font-medium text-boysenberry">
      {children}
    </span>
  );
}
