import type { ReactNode } from "react";

interface SectionCardProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function SectionCard({ title, description, children }: SectionCardProps) {
  return (
    <section
      className="flex flex-col gap-4 rounded-2xl border border-stratosphere bg-white/70 p-5 shadow-sm
        transition-shadow duration-200 hover:shadow-md"
    >
      <div>
        <h2 className="font-body text-lg font-bold uppercase text-dark-matter">{title}</h2>
        {description && <p className="mt-0.5 font-body text-sm text-dark-matter/60">{description}</p>}
      </div>
      {children}
    </section>
  );
}
