interface MiniBarChartProps {
  data: { label: string; value: number }[];
}

export function MiniBarChart({ data }: MiniBarChartProps) {
  const max = Math.max(...data.map((point) => point.value), 1);

  return (
    <div
      className="flex h-28 gap-3"
      role="img"
      aria-label={data.map((point) => `${point.label}: ${point.value}`).join(", ")}
    >
      {data.map((point) => (
        <div key={point.label} className="flex flex-1 flex-col items-center gap-1.5">
          {/* flex-1 gives this track a definite computed height via flex-grow, which a
              plain auto-height div wouldn't have — the bar's percentage height needs that
              to resolve at all (percentages against an auto-height parent compute to 0). */}
          <div className="flex w-full flex-1 items-end">
            <div
              className="w-full rounded-t-md bg-boysenberry/80"
              style={{ height: `${Math.max((point.value / max) * 100, 4)}%` }}
              aria-hidden="true"
            />
          </div>
          <span className="shrink-0 font-body text-[11px] text-dark-matter/60">{point.label}</span>
        </div>
      ))}
    </div>
  );
}
