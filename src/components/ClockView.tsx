import { useState } from 'react';
import { ArrowUpRight, ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react';
import { NATIONAL_PILLARS, UI_COPY } from '../data/navyugData';
import { useNavyug } from '../context/NavyugContext';

interface ClockViewProps {
  onSubmitIdeaForPillar: (pillarLabel: string) => void;
}

export function ClockView({ onSubmitIdeaForPillar }: ClockViewProps) {
  const { language } = useNavyug();
  const [selectedHour, setSelectedHour] = useState<number>(1);
  const [subIndex, setSubIndex] = useState<number>(0);
  const [showAllSub, setShowAllSub] = useState<boolean>(false);

  const pillar = NATIONAL_PILLARS.find((p) => p.hour === selectedHour) ?? NATIONAL_PILLARS[0];
  const activeSub = pillar.subPillars[subIndex] ?? pillar.subPillars[0];

  const handleSelectHour = (hour: number) => {
    setSelectedHour(hour);
    setSubIndex(0);
  };

  const handlePrevSub = () => {
    setSubIndex((prev) => (prev === 0 ? pillar.subPillars.length - 1 : prev - 1));
  };

  const handleNextSub = () => {
    setSubIndex((prev) => (prev + 1) % pillar.subPillars.length);
  };

  // Geometry for SVG Wall Clock (viewBox 0 0 420 420, center 210, 210)
  const cx = 210;
  const cy = 210;
  const hourRadius = 112;
  const minuteRadius = 172;

  const hourAngleDeg = (selectedHour % 12) * 30 - 90;
  const hourAngleRad = (hourAngleDeg * Math.PI) / 180;
  const hourHandX = cx + Math.cos(hourAngleRad) * (hourRadius - 22);
  const hourHandY = cy + Math.sin(hourAngleRad) * (hourRadius - 22);

  // Minute nodes at :10 (60°), :20 (120°), :30 (180°), :40 (240°), :50 (300°), :60 (0°)
  const minuteAngleDeg = ((subIndex + 1) % 6) * 60 - 90;
  const minuteAngleRad = (minuteAngleDeg * Math.PI) / 180;
  const minuteHandX = cx + Math.cos(minuteAngleRad) * (minuteRadius - 22);
  const minuteHandY = cy + Math.sin(minuteAngleRad) * (minuteRadius - 22);

  const formattedClockTime = `${String(selectedHour).padStart(2, '0')}:${String((subIndex + 1) * 10).padStart(2, '0')}`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="space-y-2 max-w-2xl">
        <p className="text-xs font-medium text-[#2D4A8A] dark:text-[#7CA0F0]">
          {UI_COPY.clock.eyebrow[language]}
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#141926] dark:text-[#F1F5F9]">
          {UI_COPY.clock.title[language]}
        </h1>
        <p className="text-sm sm:text-[15px] text-[#4B5568] dark:text-[#94A3B8] leading-relaxed">
          {UI_COPY.clock.subtitle[language]}
        </p>
      </section>

      {/* Main Split: Interactive Clock + Inspector */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Minimalist Interactive Wall Clock */}
        <div className="lg:col-span-6 rounded-2xl border border-[#E5E9F0] dark:border-[#242E42] bg-white dark:bg-[#161D2B] p-5 sm:p-6 space-y-5">
          {/* Active Hand Readout */}
          <div className="rounded-xl bg-[#F4F6FA] dark:bg-[#0F141E] px-4 py-3 space-y-1 text-xs">
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[#2D4A8A] dark:text-[#7CA0F0] font-medium">
                {language === 'en' ? `HOUR · Pillar #${pillar.hour}` : `घंटा · स्तंभ #${pillar.hour}`}
              </span>
              <span className="font-medium text-[#141926] dark:text-[#F1F5F9] truncate">
                {pillar.hourLabel} — {pillar.title[language]}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[#2C7A6B] dark:text-[#55B8A5] font-medium">
                {language === 'en' ? `MINUTE · Sub #${activeSub.code}` : `मिनट · उप #${activeSub.code}`}
              </span>
              <span className="text-[#4B5568] dark:text-[#94A3B8] truncate">
                {activeSub.title[language]}
              </span>
            </div>
          </div>

          {/* Interactive SVG Dial */}
          <div className="relative w-full max-w-[400px] mx-auto aspect-square">
            <svg
              viewBox="0 0 420 420"
              className="w-full h-full select-none"
              role="img"
              aria-label={`12-Pillar Wall Clock showing ${pillar.title[language]} and ${activeSub.title[language]}`}
            >
              {/* Outer Dial Ring */}
              <circle
                cx={cx}
                cy={cy}
                r="198"
                className="fill-[#FAFBFD] dark:fill-[#0F141E] stroke-[#DCE2EC] dark:stroke-[#242E42]"
                strokeWidth="2"
              />
              {/* Subtle Minute Track */}
              <circle
                cx={cx}
                cy={cy}
                r={minuteRadius}
                fill="none"
                className="stroke-[#E5E9F0] dark:stroke-[#1E293B]"
                strokeWidth="1"
                strokeDasharray="3 5"
              />
              {/* Subtle Hour Track */}
              <circle
                cx={cx}
                cy={cy}
                r={hourRadius}
                fill="none"
                className="stroke-[#E5E9F0] dark:stroke-[#1E293B]"
                strokeWidth="1"
              />

              {/* Minute Hand (Sage Teal) */}
              <line
                x1={cx}
                y1={cy}
                x2={minuteHandX}
                y2={minuteHandY}
                className="stroke-[#2C7A6B] dark:stroke-[#55B8A5]"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Hour Hand (Deep Royal Indigo) */}
              <line
                x1={cx}
                y1={cy}
                x2={hourHandX}
                y2={hourHandY}
                className="stroke-[#2D4A8A] dark:stroke-[#7CA0F0]"
                strokeWidth="4.5"
                strokeLinecap="round"
              />

              {/* 6 Sub-Pillar Minute Nodes */}
              {pillar.subPillars.map((sp, idx) => {
                const deg = ((idx + 1) % 6) * 60 - 90;
                const rad = (deg * Math.PI) / 180;
                const x = cx + Math.cos(rad) * minuteRadius;
                const y = cy + Math.sin(rad) * minuteRadius;
                const active = idx === subIndex;

                return (
                  <g
                    key={sp.code}
                    onClick={() => setSubIndex(idx)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Select sub-pillar ${sp.code} ${sp.title[language]}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSubIndex(idx);
                      }
                    }}
                    className="cursor-pointer focus:outline-none"
                  >
                    <circle
                      cx={x}
                      cy={y}
                      r={active ? 19 : 14}
                      className={
                        active
                          ? 'fill-[#2C7A6B] dark:fill-[#55B8A5]'
                          : 'fill-white dark:fill-[#161D2B] stroke-[#2C7A6B]/50 dark:stroke-[#55B8A5]/50'
                      }
                      strokeWidth="1.5"
                    />
                    <text
                      x={x}
                      y={y + 3.5}
                      textAnchor="middle"
                      className={`font-mono text-[10px] font-semibold ${
                        active
                          ? 'fill-white dark:fill-[#0F141E]'
                          : 'fill-[#2C7A6B] dark:fill-[#55B8A5]'
                      }`}
                    >
                      {sp.code}
                    </text>
                  </g>
                );
              })}

              {/* 12 Hour Pillar Nodes */}
              {NATIONAL_PILLARS.map((p) => {
                const deg = (p.hour % 12) * 30 - 90;
                const rad = (deg * Math.PI) / 180;
                const x = cx + Math.cos(rad) * hourRadius;
                const y = cy + Math.sin(rad) * hourRadius;
                const active = p.hour === selectedHour;

                return (
                  <g
                    key={p.hour}
                    onClick={() => handleSelectHour(p.hour)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Select pillar ${p.hourLabel} ${p.title[language]}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSelectHour(p.hour);
                      }
                    }}
                    className="cursor-pointer focus:outline-none"
                  >
                    <circle
                      cx={x}
                      cy={y}
                      r={active ? 22 : 17}
                      className={
                        active
                          ? 'fill-[#2D4A8A] dark:fill-[#7CA0F0]'
                          : 'fill-white dark:fill-[#161D2B] stroke-[#CBD5E1] dark:stroke-[#334155]'
                      }
                      strokeWidth="1.5"
                    />
                    <text
                      x={x}
                      y={y - 2}
                      textAnchor="middle"
                      className={`font-mono text-[9px] font-semibold ${
                        active
                          ? 'fill-white dark:fill-[#0F141E]'
                          : 'fill-[#141926] dark:fill-[#E2E8F0]'
                      }`}
                    >
                      {String(p.hour).padStart(2, '0')}
                    </text>
                    <text
                      x={x}
                      y={y + 8}
                      textAnchor="middle"
                      className={`text-[7.5px] font-medium ${
                        active
                          ? 'fill-white/90 dark:fill-[#0F141E]'
                          : 'fill-[#6E788A] dark:fill-[#94A3B8]'
                      }`}
                    >
                      {p.shortTitle.en.slice(0, 7)}
                    </text>
                  </g>
                );
              })}

              {/* Center Hub */}
              <circle
                cx={cx}
                cy={cy}
                r="34"
                className="fill-white dark:fill-[#161D2B] stroke-[#2D4A8A] dark:stroke-[#7CA0F0]"
                strokeWidth="2.5"
              />
              <text
                x={cx}
                y={cy - 6}
                textAnchor="middle"
                className="font-mono text-[8px] font-medium fill-[#6E788A] dark:fill-[#94A3B8]"
              >
                2047 CLOCK
              </text>
              <text
                x={cx}
                y={cy + 8}
                textAnchor="middle"
                className="font-mono text-[13px] font-bold fill-[#141926] dark:fill-[#F1F5F9]"
              >
                {formattedClockTime}
              </text>
              <text
                x={cx}
                y={cy + 20}
                textAnchor="middle"
                className="font-mono text-[8px] fill-[#2C7A6B] dark:fill-[#55B8A5]"
              >
                P#{pillar.hour} · S#{activeSub.code}
              </text>
            </svg>
          </div>
        </div>

        {/* Right: Pillar & Sub-Pillar Inspector */}
        <div className="lg:col-span-6 space-y-5">
          <div className="rounded-2xl border border-[#E5E9F0] dark:border-[#242E42] bg-white dark:bg-[#161D2B] p-5 sm:p-6 space-y-5">
            <div className="space-y-1">
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="font-mono font-medium text-[#2D4A8A] dark:text-[#7CA0F0]">
                  {pillar.hourLabel} · {language === 'en' ? `Pillar #${pillar.hour}` : `स्तंभ #${pillar.hour}`}
                </span>
                <span className="text-[#6E788A] dark:text-[#94A3B8] truncate">{pillar.source}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#141926] dark:text-[#F1F5F9]">
                {pillar.title[language]}
              </h2>
            </div>

            {/* Executive Pitch */}
            <div className="rounded-xl bg-[#F4F6FA] dark:bg-[#0F141E] p-4 space-y-1.5">
              <p className="text-[11px] font-medium text-[#2D4A8A] dark:text-[#7CA0F0]">
                {language === 'en' ? 'Executive Pitch · 2047 Centenary Vision' : 'कार्यकारी सारांश · 2047 विज़न'}
              </p>
              <p className="text-sm text-[#141926] dark:text-[#E2E8F0] leading-relaxed">
                {pillar.executivePitch[language]}
              </p>
            </div>

            {/* 2026 Reality vs 2047 Target */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-xl border border-[#E5E9F0] dark:border-[#242E42] p-4 space-y-1">
                <span className="text-[11px] text-[#6E788A] dark:text-[#94A3B8]">
                  2026 · {pillar.reality2026Label[language]}
                </span>
                <div className="font-mono text-base font-semibold text-[#141926] dark:text-[#F1F5F9] tabular-nums">
                  {pillar.reality2026Value}
                </div>
              </div>
              <div className="rounded-xl border border-[#2C7A6B]/30 dark:border-[#55B8A5]/30 bg-[#EDF6F4]/60 dark:bg-[#132623] p-4 space-y-1">
                <span className="text-[11px] text-[#2C7A6B] dark:text-[#55B8A5]">
                  2047 · {pillar.target2047Label[language]}
                </span>
                <div className="font-mono text-base font-semibold text-[#1D5C50] dark:text-[#7AD4C3] tabular-nums">
                  {pillar.target2047Value}
                </div>
              </div>
            </div>

            {/* Minute Hand Sub-Pillar Spotlight */}
            <div className="rounded-xl border border-[#DCE2EC] dark:border-[#2A374E] p-4 sm:p-5 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono text-xs font-medium text-[#2C7A6B] dark:text-[#55B8A5]">
                  {language === 'en'
                    ? `Minute Hand Spotlight (#${activeSub.code} · ${activeSub.minute})`
                    : `मिनट सुई फोकस (#${activeSub.code} · ${activeSub.minute})`}
                </span>
                <div className="inline-flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handlePrevSub}
                    aria-label="Previous sub-pillar"
                    className="inline-flex items-center gap-1 px-3 py-1.5 min-h-[36px] rounded-lg border border-[#DCE2EC] dark:border-[#242E42] text-xs font-medium text-[#141926] dark:text-[#F1F5F9] hover:bg-[#F4F6FA] dark:hover:bg-[#1E293B] transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    {language === 'en' ? 'Prev' : 'पिछला'}
                  </button>
                  <button
                    type="button"
                    onClick={handleNextSub}
                    aria-label="Next sub-pillar"
                    className="inline-flex items-center gap-1 px-3 py-1.5 min-h-[36px] rounded-lg bg-[#2D4A8A] text-white text-xs font-medium hover:bg-[#223A6E] transition-colors cursor-pointer"
                  >
                    {language === 'en' ? 'Next Sub-Pillar' : 'अगला उप-स्तंभ'}
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-semibold text-[#141926] dark:text-[#F1F5F9]">
                {activeSub.code} — {activeSub.title[language]}
              </h3>

              <div className="space-y-1.5 text-sm">
                <p className="text-[#2C7A6B] dark:text-[#55B8A5] font-medium">
                  {language === 'en' ? '2047 Target: ' : '2047 लक्ष्य: '}
                  {activeSub.target2047[language]}
                </p>
                <p className="text-[#4B5568] dark:text-[#94A3B8]">
                  {language === 'en' ? '2026 Bottleneck: ' : '2026 चुनौती: '}
                  {activeSub.bottleneck2026[language]}
                </p>
              </div>
            </div>

            {/* Expand All 6 Sub-Pillars */}
            <div className="space-y-3">
              <button
                type="button"
                aria-expanded={showAllSub}
                onClick={() => setShowAllSub((prev) => !prev)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl border border-[#E5E9F0] dark:border-[#242E42] bg-[#FAFBFD] dark:bg-[#0F141E] text-xs font-medium text-[#2D4A8A] dark:text-[#7CA0F0] hover:bg-[#EEF2FA] dark:hover:bg-[#1E293B] transition-colors cursor-pointer"
              >
                {showAllSub ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    {UI_COPY.clock.hideAllSub[language]}
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    {UI_COPY.clock.viewAllSub[language]}
                  </>
                )}
              </button>

              {showAllSub && (
                <div className="divide-y divide-[#EEF1F6] dark:divide-[#1E293B] rounded-xl border border-[#E5E9F0] dark:border-[#242E42] overflow-hidden">
                  {pillar.subPillars.map((sp, idx) => (
                    <button
                      key={sp.code}
                      type="button"
                      onClick={() => setSubIndex(idx)}
                      className={`w-full text-left px-4 py-3 transition-colors cursor-pointer ${
                        idx === subIndex
                          ? 'bg-[#EEF2FA]/70 dark:bg-[#1B2436]'
                          : 'bg-white dark:bg-[#161D2B] hover:bg-[#F8F9FB] dark:hover:bg-[#1B2436]/50'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium text-[#141926] dark:text-[#F1F5F9]">
                          <span className="font-mono text-xs text-[#2C7A6B] dark:text-[#55B8A5] mr-2">
                            {sp.code}
                          </span>
                          {sp.title[language]}
                        </span>
                        <span className="font-mono text-[11px] text-[#6E788A] dark:text-[#94A3B8]">
                          {sp.minute}
                        </span>
                      </div>
                      <p className="text-xs text-[#4B5568] dark:text-[#94A3B8] mt-1">
                        {sp.target2047[language]}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Direct CTA to Submit Idea for Active Pillar */}
            <div className="pt-3 border-t border-[#EEF1F6] dark:border-[#1E293B] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-xs text-[#4B5568] dark:text-[#94A3B8]">
                {language === 'en'
                  ? `Have a grassroots solution for ${activeSub.title.en}?`
                  : `क्या आपके पास ${activeSub.title.hi} हेतु सुझाव है?`}
              </p>
              <button
                type="button"
                onClick={() => onSubmitIdeaForPillar(`${pillar.hourLabel} · ${pillar.shortTitle.en}`)}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-xl bg-[#2D4A8A] text-white text-xs font-medium hover:bg-[#223A6E] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {UI_COPY.clock.submitForPillar[language]} #{pillar.hour}
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Jump Bar — All 12 Pillars */}
      <section className="space-y-3">
        <h3 className="text-xs font-medium text-[#6E788A] dark:text-[#94A3B8]">
          {language === 'en'
            ? 'Quick Jump — Click any hour to move the Hour Hand (12 Pillars)'
            : 'त्वरित चयन — किसी भी घंटे (स्तंभ) पर क्लिक करें'}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
          {NATIONAL_PILLARS.map((p) => {
            const active = p.hour === selectedHour;
            return (
              <button
                key={p.hour}
                type="button"
                aria-pressed={active}
                onClick={() => handleSelectHour(p.hour)}
                className={`text-left px-3 py-2.5 min-h-[44px] rounded-xl border transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#2D4A8A] border-[#2D4A8A] text-white'
                    : 'bg-white dark:bg-[#161D2B] border-[#E5E9F0] dark:border-[#242E42] text-[#141926] dark:text-[#E2E8F0] hover:border-[#2D4A8A]/40'
                }`}
              >
                <div
                  className={`font-mono text-[10px] ${
                    active ? 'text-white/80' : 'text-[#6E788A] dark:text-[#94A3B8]'
                  }`}
                >
                  {p.hourLabel}
                </div>
                <div className="text-xs font-medium truncate mt-0.5">
                  {p.shortTitle[language]}
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
