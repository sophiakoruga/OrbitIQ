import type { WidgetTrend } from "./widgets";

export function TrendBadge({ trend }: { trend: WidgetTrend }) {
  const isUp = trend.direction === "up";
  return (
    <span
      className="inline-flex items-center gap-1 font-body text-xs font-semibold"
      style={{ color: isUp ? "#1F7A52" : "#B54B3C" }}
    >
      <svg viewBox="0 0 12 12" fill="none" aria-hidden="true" className="size-3">
        <path
          d={isUp ? "M6 10V2M2.5 5.5 6 2l3.5 3.5" : "M6 2v8M2.5 6.5 6 10l3.5-3.5"}
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {isUp ? "+" : "-"}
      {trend.delta} {trend.label}
    </span>
  );
}
