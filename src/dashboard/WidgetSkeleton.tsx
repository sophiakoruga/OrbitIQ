export function WidgetSkeleton() {
  return (
    <div className="flex min-h-[128px] flex-col justify-between gap-2 rounded-xl border border-stratosphere bg-white/60 p-4">
      <div className="h-3 w-2/3 animate-pulse rounded-full bg-stratosphere/60" />
      <div className="h-6 w-1/2 animate-pulse rounded-full bg-stratosphere/60" />
      <div className="h-3 w-1/3 animate-pulse rounded-full bg-stratosphere/60" />
    </div>
  );
}

export function GreetingSkeleton() {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-stratosphere bg-white/60 p-5">
      <div className="size-[78px] shrink-0 animate-pulse rounded-full bg-stratosphere/60" />
      <div className="flex flex-1 flex-col gap-2">
        <div className="h-5 w-2/3 animate-pulse rounded-full bg-stratosphere/60" />
        <div className="h-3.5 w-1/2 animate-pulse rounded-full bg-stratosphere/60" />
      </div>
    </div>
  );
}
