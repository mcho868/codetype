"use client";

import { useMemo, useState } from "react";

type SeriesDef = {
  key: string;
  label: string;
  color: string;
  fn: (n: number) => number;
};

const SERIES: SeriesDef[] = [
  { key: "o1", label: "O(1)", color: "#22c55e", fn: () => 1 },
  { key: "ologn", label: "O(log n)", color: "#38bdf8", fn: (n) => Math.max(1, Math.log2(n)) },
  { key: "on", label: "O(n)", color: "#f59e0b", fn: (n) => n },
  { key: "onlogn", label: "O(n log n)", color: "#a78bfa", fn: (n) => n * Math.max(1, Math.log2(n)) },
  { key: "on2", label: "O(n²)", color: "#fb7185", fn: (n) => n * n },
  { key: "o2n", label: "O(2^n)", color: "#ef4444", fn: (n) => 2 ** n },
];

const INPUT_SIZES = [2, 4, 8, 16, 32, 64];

function formatOps(value: number) {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}k`;
  return value.toFixed(value < 10 ? 1 : 0);
}

export default function ComplexityGraph() {
  const [selectedIndex, setSelectedIndex] = useState(3);
  const selectedN = INPUT_SIZES[selectedIndex];

  const chart = useMemo(() => {
    const pointsBySeries = SERIES.map((series) =>
      INPUT_SIZES.map((n) => ({ n, value: series.fn(n) }))
    );
    const maxValue = Math.max(...pointsBySeries.flatMap((series) => series.map((point) => point.value)));
    const width = 760;
    const height = 320;
    const padding = { top: 16, right: 16, bottom: 34, left: 52 };
    const innerWidth = width - padding.left - padding.right;
    const innerHeight = height - padding.top - padding.bottom;

    const xForIndex = (index: number) => padding.left + (index / (INPUT_SIZES.length - 1)) * innerWidth;
    const yForValue = (value: number) => {
      const scaled = Math.log10(value + 1) / Math.log10(maxValue + 1);
      return padding.top + innerHeight - scaled * innerHeight;
    };

    return {
      width,
      height,
      padding,
      innerHeight,
      xForIndex,
      yForValue,
      pointsBySeries,
    };
  }, []);

  return (
    <div className="my-6 rounded-3xl border border-slate-800/70 bg-slate-950/70 p-5 shadow-sm backdrop-blur">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Complexity Graph</p>
            <h3 className="text-lg font-semibold text-white">How growth rates separate as input size increases</h3>
            <p className="text-sm text-slate-400">
              Y-axis is log-scaled so all curves remain visible. Move the slider to compare approximate operation counts at different input sizes.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800/70 bg-slate-900/70 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Selected n</p>
            <p className="text-2xl font-semibold text-white">{selectedN}</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <svg viewBox={`0 0 ${chart.width} ${chart.height}`} className="min-w-[700px] w-full">
            {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
              const y = chart.padding.top + chart.innerHeight - ratio * chart.innerHeight;
              return (
                <line
                  key={ratio}
                  x1={chart.padding.left}
                  x2={chart.width - chart.padding.right}
                  y1={y}
                  y2={y}
                  stroke="rgba(148, 163, 184, 0.14)"
                  strokeWidth="1"
                />
              );
            })}

            <line
              x1={chart.padding.left}
              x2={chart.padding.left}
              y1={chart.padding.top}
              y2={chart.height - chart.padding.bottom}
              stroke="rgba(148, 163, 184, 0.35)"
              strokeWidth="1.5"
            />
            <line
              x1={chart.padding.left}
              x2={chart.width - chart.padding.right}
              y1={chart.height - chart.padding.bottom}
              y2={chart.height - chart.padding.bottom}
              stroke="rgba(148, 163, 184, 0.35)"
              strokeWidth="1.5"
            />

            {SERIES.map((series, seriesIndex) => {
              const points = chart.pointsBySeries[seriesIndex];
              const path = points
                .map((point, index) => {
                  const x = chart.xForIndex(index);
                  const y = chart.yForValue(point.value);
                  return `${index === 0 ? "M" : "L"} ${x} ${y}`;
                })
                .join(" ");

              return (
                <g key={series.key}>
                  <path d={path} fill="none" stroke={series.color} strokeWidth="3" strokeLinecap="round" />
                  {points.map((point, index) => (
                    <circle
                      key={`${series.key}-${point.n}`}
                      cx={chart.xForIndex(index)}
                      cy={chart.yForValue(point.value)}
                      r={INPUT_SIZES[selectedIndex] === point.n ? 5 : 3}
                      fill={series.color}
                      opacity={INPUT_SIZES[selectedIndex] === point.n ? 1 : 0.75}
                    />
                  ))}
                </g>
              );
            })}

            {INPUT_SIZES.map((n, index) => (
              <g key={n}>
                <text
                  x={chart.xForIndex(index)}
                  y={chart.height - 10}
                  textAnchor="middle"
                  fill={n === selectedN ? "#e2e8f0" : "#64748b"}
                  fontSize="12"
                  fontWeight={n === selectedN ? "700" : "500"}
                >
                  {n}
                </text>
              </g>
            ))}

            <text
              x={14}
              y={chart.padding.top + 12}
              fill="#64748b"
              fontSize="12"
              transform={`rotate(-90 14 ${chart.padding.top + 12})`}
            >
              Approx. operations (log scale)
            </text>
          </svg>
        </div>

        <div className="px-1">
          <input
            type="range"
            min={0}
            max={INPUT_SIZES.length - 1}
            step={1}
            value={selectedIndex}
            onChange={(e) => setSelectedIndex(Number(e.target.value))}
            className="w-full accent-cyan-400"
          />
          <div className="mt-2 flex justify-between text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-600">
            {INPUT_SIZES.map((n) => (
              <span key={n}>{n}</span>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {SERIES.map((series) => (
            <div key={series.key} className="rounded-2xl border border-slate-800/70 bg-slate-900/60 px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: series.color }} />
                  <span className="text-sm font-semibold text-slate-200">{series.label}</span>
                </div>
                <span className="text-sm font-semibold text-white">{formatOps(series.fn(selectedN))}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
