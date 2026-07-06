import { motion, useReducedMotion } from "framer-motion";

interface LineChartProps {
  data: { label: string; value: number }[];
  color?: string;
  valueSuffix?: string;
}

const WIDTH = 280;
const HEIGHT = 96;
const PAD_X = 6;
const PAD_Y = 10;

export function LineChart({ data, color = "#003A6C", valueSuffix = "" }: LineChartProps) {
  const shouldReduceMotion = useReducedMotion();
  const max = Math.max(...data.map((d) => d.value));
  const min = Math.min(0, ...data.map((d) => d.value));
  const range = max - min || 1;

  const points = data.map((point, index) => ({
    x: PAD_X + (index / Math.max(data.length - 1, 1)) * (WIDTH - PAD_X * 2),
    y: PAD_Y + (1 - (point.value - min) / range) * (HEIGHT - PAD_Y * 2),
  }));

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const floorY = HEIGHT - PAD_Y;
  const areaPath = `${linePath} L${points[points.length - 1].x},${floorY} L${points[0].x},${floorY} Z`;

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT + 16}`}
      className="w-full"
      role="img"
      aria-label={data.map((d) => `${d.label}: ${d.value}${valueSuffix}`).join(", ")}
    >
      <path d={areaPath} fill={color} opacity={0.08} />
      <motion.path
        d={linePath}
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={shouldReduceMotion ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={2.75} fill={color} />
      ))}
      {data.map((d, i) => {
        const isFirst = i === 0;
        const isLast = i === data.length - 1;
        return (
          <text
            key={d.label}
            x={points[i].x}
            y={HEIGHT + 12}
            textAnchor={isFirst ? "start" : isLast ? "end" : "middle"}
            fontSize="9"
            fill="#121D26"
            opacity={0.5}
          >
            {d.label}
          </text>
        );
      })}
    </svg>
  );
}
