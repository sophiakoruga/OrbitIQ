import type { ReactNode } from "react";

interface PageShellProps {
  children: ReactNode;
}

/**
 * Dev-time page chrome only — not part of the onboarding UX itself.
 *
 * This app will eventually run inside an actual Chrome extension side
 * panel, where the browser itself constrains the width. Until then, this
 * centers a fixed-width card (~440px, the middle of Chrome's side panel
 * range) on the page so the flow can be reviewed at its real target size
 * instead of stretching edge-to-edge across a desktop viewport.
 */
export function PageShell({ children }: PageShellProps) {
  return (
    <div className="flex min-h-screen w-full justify-center bg-stratosphere/25 px-4 py-6 sm:px-8 sm:py-12">
      <div className="flex w-full max-w-panel flex-col items-center gap-3">
        <p className="text-center text-xs font-medium uppercase tracking-wide text-boysenberry/40">
          Side panel preview &middot; ~440px
        </p>
        <div className="w-full overflow-hidden rounded-2xl bg-exosphere shadow-xl ring-1 ring-black/5">
          {children}
        </div>
      </div>
    </div>
  );
}
