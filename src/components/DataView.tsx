import { useState } from 'react';
import {
  MACRO_INDICATORS,
  REGIONAL_ZONES,
  UI_COPY,
  type HorizonYear,
} from '../data/navyugData';
import { getIndicatorProgress } from '../utils/navyugLogic';
import { useNavyug } from '../context/NavyugContext';

const HORIZONS: { year: HorizonYear; label: string }[] = [
  { year: '2026', label: '2026 Now' },
  { year: '2030', label: '2030' },
  { year: '2035', label: '2035' },
  { year: '2040', label: '2040' },
  { year: '2047', label: '2047 Goal' },
];

type ChartMode = 'vertical' | 'horizontal' | 'trajectory';

export function DataView() {
  const { language } = useNavyug();
  const [horizon, setHorizon] = useState<HorizonYear>('2030');
  const [chartMode, setChartMode] = useState<ChartMode>('vertical');
  const [selectedMetricId, setSelectedMetricId] = useState<string>(MACRO_INDICATORS[0].id);
  const [selectedZoneId, setSelectedZoneId] = useState<string>('all');

  const activeMetric =
    MACRO_INDICATORS.find((m) => m.id === selectedMetricId) ?? MACRO_INDICATORS[0];

  const visibleZones =
    selectedZoneId === 'all'
      ? REGIONAL_ZONES
      : REGIONAL_ZONES.filter((z) => z.id === selectedZoneId);

  return (
    <div className="space-y-10">
      {/* Header & Horizon Controls */}
      <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <p className="text-xs font-medium text-[#2D4A8A] dark:text-[#7CA0F0]">
            {UI_COPY.data.eyebrow[language]}
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#141926] dark:text-[#F1F5F9]">
            {UI_COPY.data.title[language]}
          </h1>
          <p className="text-sm sm:text-[15px] text-[#4B5568] dark:text-[#94A3B8] leading-relaxed">
            {UI_COPY.data.subtitle[language]}
          </p>
        </div>

        {/* Horizon Selector */}
        <div
          className="inline-flex flex-wrap items-center gap-1 p-1 rounded-xl bg-[#EEF1F6] dark:bg-[#161D2B] border border-[#E5E9F0] dark:border-[#242E42] self-start"
          role="group"
          aria-label="Target horizon year"
        >
          {HORIZONS.map((h) => {
            const active = horizon === h.year;
            return (
              <button
                key={h.year}
                type="button"
                aria-pressed={active}
                onClick={() => setHorizon(h.year)}
                className={`px-3 py-2 min-h-[40px] rounded-lg text-xs font-mono font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-[#2D4A8A] text-white'
                    : 'text-[#4B5568] dark:text-[#94A3B8] hover:text-[#141926] dark:hover:text-white'
                }`}
              >
                {h.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Visualization Card */}
      <section className="rounded-2xl border border-[#E5E9F0] dark:border-[#242E42] bg-white dark:bg-[#161D2B] p-5 sm:p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#EEF1F6] dark:border-[#1E293B]">
          {/* Legend */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#4B5568] dark:text-[#94A3B8]">
            <span className="inline-flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-xs bg-[#94A3B8]" aria-hidden="true" />
              <span>2026 Baseline</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-xs bg-[#6366A8]" aria-hidden="true" />
              <span>Selected Horizon ({horizon})</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-xs bg-[#2C7A6B]" aria-hidden="true" />
              <span>2047 Centenary Goal</span>
            </span>
          </div>

          {/* Chart Mode Switch */}
          <div
            className="inline-flex items-center p-1 rounded-xl bg-[#F4F6FA] dark:bg-[#0F141E] border border-[#E5E9F0] dark:border-[#242E42] self-start"
            role="tablist"
            aria-label="Chart visualization modes"
          >
            {(
              [
                { id: 'vertical', label: UI_COPY.data.viewVertical[language] },
                { id: 'horizontal', label: UI_COPY.data.viewHorizontal[language] },
                { id: 'trajectory', label: UI_COPY.data.viewTrajectory[language] },
              ] as const
            ).map((mode) => (
              <button
                key={mode.id}
                type="button"
                role="tab"
                aria-selected={chartMode === mode.id}
                onClick={() => setChartMode(mode.id)}
                className={`px-3 py-1.5 min-h-[38px] rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  chartMode === mode.id
                    ? 'bg-white dark:bg-[#242E42] text-[#141926] dark:text-[#F1F5F9] shadow-xs'
                    : 'text-[#4B5568] dark:text-[#94A3B8] hover:text-[#141926] dark:hover:text-white'
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mode 1: Vertical Grouped Bar Graph */}
        {chartMode === 'vertical' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MACRO_INDICATORS.map((metric) => {
              const p2026 = Math.max(8, getIndicatorProgress(metric.values['2026'], metric.goalTarget));
              const pHorizon = Math.max(10, getIndicatorProgress(metric.values[horizon], metric.goalTarget));
              const isFocused = selectedMetricId === metric.id;

              return (
                <button
                  key={metric.id}
                  type="button"
                  onClick={() => setSelectedMetricId(metric.id)}
                  className={`text-left rounded-xl border p-4 transition-colors cursor-pointer ${
                    isFocused
                      ? 'border-[#2D4A8A]/50 dark:border-[#7CA0F0]/50 bg-[#F8FAFD] dark:bg-[#1B2436]'
                      : 'border-[#EEF1F6] dark:border-[#1E293B] bg-[#FAFBFD] dark:bg-[#111723] hover:border-[#CBD5E1] dark:hover:border-[#334155]'
                  }`}
                >
                  <div className="mb-4">
                    <div className="text-sm font-semibold text-[#141926] dark:text-[#F1F5F9]">
                      {metric.shortLabel[language]}
                    </div>
                    <div className="text-[11px] text-[#6E788A] dark:text-[#94A3B8]">
                      {metric.unit[language]}
                    </div>
                  </div>

                  {/* Bar Canvas */}
                  <div className="h-36 flex items-end justify-around gap-3 pt-4 pb-1 border-b border-[#E5E9F0] dark:border-[#242E42]">
                    {[
                      {
                        slot: 'baseline',
                        yr: '2026',
                        val: metric.formatted['2026'],
                        pct: p2026,
                        barClass: 'bg-[#94A3B8]',
                        textClass: 'text-[#64748B] dark:text-[#94A3B8]',
                      },
                      {
                        slot: 'selected',
                        yr: horizon,
                        val: metric.formatted[horizon],
                        pct: pHorizon,
                        barClass: 'bg-[#6366A8]',
                        textClass: 'text-[#4F5294] dark:text-[#A5A8E8]',
                      },
                      {
                        slot: 'target',
                        yr: '2047',
                        val: metric.formatted['2047'],
                        pct: 100,
                        barClass: 'bg-[#2C7A6B]',
                        textClass: 'text-[#2C7A6B] dark:text-[#55B8A5]',
                      },
                    ].map((bar) => (
                      <div key={bar.slot} className="flex flex-col items-center justify-end h-full flex-1">
                        <span className={`font-mono text-[10px] font-medium tabular-nums mb-1.5 whitespace-nowrap ${bar.textClass}`}>
                          {bar.val}
                        </span>
                        <div className="w-full max-w-[34px] h-24 flex items-end justify-center">
                          <div
                            className={`w-full rounded-t-md transition-all duration-200 ${bar.barClass}`}
                            style={{ height: `${bar.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-around text-[11px] font-mono text-[#6E788A] dark:text-[#94A3B8] pt-2 tabular-nums">
                    <span>2026</span>
                    <span className="text-[#4F5294] dark:text-[#A5A8E8] font-medium">{horizon}</span>
                    <span className="text-[#2C7A6B] dark:text-[#55B8A5] font-medium">2047</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Mode 2: Detailed Horizontal Comparison Cards */}
        {chartMode === 'horizontal' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MACRO_INDICATORS.map((metric) => {
              const pct2026 = getIndicatorProgress(metric.values['2026'], metric.goalTarget);
              const pctHorizon = getIndicatorProgress(metric.values[horizon], metric.goalTarget);

              return (
                <article
                  key={metric.id}
                  className="rounded-xl border border-[#EEF1F6] dark:border-[#1E293B] bg-[#FAFBFD] dark:bg-[#111723] p-5 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2 text-[11px] text-[#6E788A] dark:text-[#94A3B8]">
                      <span>{metric.unit[language]}</span>
                      <span className="text-[#2D4A8A] dark:text-[#7CA0F0] truncate max-w-[160px]" title={metric.source}>
                        {metric.source}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-[#141926] dark:text-[#F1F5F9]">
                      {metric.label[language]}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {/* 2026 Row */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-mono tabular-nums">
                        <span className="text-[#4B5568] dark:text-[#94A3B8]">
                          2026: {metric.formatted['2026']}
                        </span>
                        <span className="text-[#6E788A] dark:text-[#94A3B8]">
                          {pct2026}% of Goal
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-[#E5E9F0] dark:bg-[#1E293B] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#94A3B8] transition-all duration-300"
                          style={{ width: `${pct2026}%` }}
                        />
                      </div>
                    </div>

                    {/* Selected Horizon Row */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-mono tabular-nums">
                        <span className="text-[#4F5294] dark:text-[#A5A8E8] font-medium">
                          {horizon}: {metric.formatted[horizon]}
                        </span>
                        <span className="text-[#2C7A6B] dark:text-[#55B8A5] font-medium">
                          2047: {metric.formatted['2047']}
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-[#E5E9F0] dark:bg-[#1E293B] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#2C7A6B] transition-all duration-300"
                          style={{ width: `${pctHorizon}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#4B5568] dark:text-[#94A3B8] leading-relaxed pt-2 border-t border-[#EEF1F6] dark:border-[#1E293B]">
                    {metric.note[language]}
                  </p>
                </article>
              );
            })}
          </div>
        )}

        {/* Mode 3: Single-Metric 2026–2047 Full Trajectory */}
        {chartMode === 'trajectory' && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Select macro metric">
              {MACRO_INDICATORS.map((metric) => {
                const active = activeMetric.id === metric.id;
                return (
                  <button
                    key={metric.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSelectedMetricId(metric.id)}
                    className={`px-3.5 py-2 min-h-[40px] rounded-xl text-xs font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-[#2D4A8A] border-[#2D4A8A] text-white'
                        : 'bg-[#F8F9FB] dark:bg-[#0F141E] border-[#E5E9F0] dark:border-[#242E42] text-[#4B5568] dark:text-[#94A3B8] hover:text-[#141926] dark:hover:text-white'
                    }`}
                  >
                    {metric.shortLabel[language]}
                  </button>
                );
              })}
            </div>

            <div className="rounded-xl border border-[#EEF1F6] dark:border-[#1E293B] bg-[#FAFBFD] dark:bg-[#111723] p-5 sm:p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-lg font-semibold text-[#141926] dark:text-[#F1F5F9]">
                    {activeMetric.label[language]}
                  </h3>
                  <p className="text-xs text-[#6E788A] dark:text-[#94A3B8]">
                    {activeMetric.unit[language]} · {activeMetric.source}
                  </p>
                </div>
                <span className="font-mono text-sm font-semibold text-[#2C7A6B] dark:text-[#55B8A5] tabular-nums">
                  {activeMetric.formatted['2026']} → {activeMetric.formatted['2047']}
                </span>
              </div>

              <div className="h-52 flex items-end justify-between gap-3 sm:gap-6 pt-6 pb-2 border-b border-[#E5E9F0] dark:border-[#242E42]">
                {HORIZONS.map((h) => {
                  const pct = Math.max(
                    10,
                    getIndicatorProgress(activeMetric.values[h.year], activeMetric.goalTarget)
                  );
                  const isCurrentHorizon = h.year === horizon;
                  const is2047 = h.year === '2047';
                  const barColor = is2047
                    ? 'bg-[#2C7A6B]'
                    : isCurrentHorizon
                    ? 'bg-[#2D4A8A]'
                    : h.year === '2026'
                    ? 'bg-[#94A3B8]'
                    : 'bg-[#6366A8]/75';

                  return (
                    <div key={h.year} className="flex-1 flex flex-col items-center justify-end h-full">
                      <span className="font-mono text-xs font-medium text-[#141926] dark:text-[#E2E8F0] mb-2 tabular-nums">
                        {activeMetric.formatted[h.year]}
                      </span>
                      <div className="w-full max-w-[56px] h-36 flex items-end">
                        <div
                          className={`w-full rounded-t-lg transition-all duration-300 ${barColor}`}
                          style={{ height: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-5 text-center font-mono text-xs text-[#6E788A] dark:text-[#94A3B8] tabular-nums">
                {HORIZONS.map((h) => (
                  <span
                    key={h.year}
                    className={
                      h.year === horizon
                        ? 'text-[#2D4A8A] dark:text-[#7CA0F0] font-semibold'
                        : ''
                    }
                  >
                    {h.year}
                  </span>
                ))}
              </div>

              <p className="text-xs text-[#4B5568] dark:text-[#94A3B8] leading-relaxed">
                {activeMetric.note[language]}
              </p>
            </div>
          </div>
        )}
      </section>

      {/* 6-Zone Regional Economic Heatmap */}
      <section className="space-y-5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#141926] dark:text-[#F1F5F9]">
              {UI_COPY.data.heatmapTitle[language]}
            </h2>
            <p className="text-sm text-[#4B5568] dark:text-[#94A3B8]">
              {UI_COPY.data.heatmapSub[language]}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter regional zones">
            <button
              type="button"
              aria-pressed={selectedZoneId === 'all'}
              onClick={() => setSelectedZoneId('all')}
              className={`px-3 py-1.5 min-h-[38px] rounded-lg text-xs font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedZoneId === 'all'
                  ? 'bg-[#2D4A8A] border-[#2D4A8A] text-white'
                  : 'bg-white dark:bg-[#161D2B] border-[#E5E9F0] dark:border-[#242E42] text-[#4B5568] dark:text-[#94A3B8]'
              }`}
            >
              {language === 'en' ? 'All 6 Zones' : 'सभी 6 ज़ोन'}
            </button>
            {REGIONAL_ZONES.map((zone) => {
              const active = selectedZoneId === zone.id;
              return (
                <button
                  key={zone.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelectedZoneId(zone.id)}
                  className={`px-3 py-1.5 min-h-[38px] rounded-lg text-xs font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#2D4A8A] border-[#2D4A8A] text-white'
                      : 'bg-white dark:bg-[#161D2B] border-[#E5E9F0] dark:border-[#242E42] text-[#4B5568] dark:text-[#94A3B8] hover:text-[#141926] dark:hover:text-white'
                  }`}
                >
                  {zone.name[language].replace(' Corridor', '').replace(' गलियारा', '')}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleZones.map((zone) => (
            <article
              key={zone.id}
              className="rounded-2xl border border-[#E5E9F0] dark:border-[#242E42] bg-white dark:bg-[#161D2B] p-5 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-semibold text-[#141926] dark:text-[#F1F5F9]">
                    {zone.name[language]}
                  </h3>
                  <span className="font-mono text-xs text-[#2C7A6B] dark:text-[#55B8A5] tabular-nums">
                    {zone.baseline2026.split(' ')[0]}
                  </span>
                </div>
                <p className="text-xs font-medium text-[#2D4A8A] dark:text-[#7CA0F0]">
                  {zone.corridor[language]}
                </p>
                <p className="text-xs text-[#6E788A] dark:text-[#94A3B8] leading-relaxed">
                  {zone.states}
                </p>
              </div>

              <div className="pt-3 border-t border-[#EEF1F6] dark:border-[#1E293B] space-y-1.5 text-xs">
                <div className="text-[#4B5568] dark:text-[#94A3B8]">
                  <span className="font-medium text-[#141926] dark:text-[#E2E8F0]">
                    {language === 'en' ? 'Focus: ' : 'प्रमुख क्षेत्र: '}
                  </span>
                  {zone.focusSectors[language]}
                </div>
                <div className="flex items-center justify-between font-mono text-[11px] pt-1 tabular-nums">
                  <span className="text-[#6E788A] dark:text-[#94A3B8]">{zone.baseline2026}</span>
                  <span className="text-[#2C7A6B] dark:text-[#55B8A5] font-medium">
                    → {zone.target2047}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
