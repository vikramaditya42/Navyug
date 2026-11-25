import { useEffect, useState } from 'react';
import { ArrowRight, ChevronDown, ChevronUp, Compass, BarChart3, Clock } from 'lucide-react';
import {
  MANIFESTO_POINTS,
  POLICY_BRIEFS,
  TARGET_CENTENARY_UTC,
  UI_COPY,
  VISION_PILLARS,
} from '../data/navyugData';
import { calculateCountdown, computeCivicProgress } from '../utils/navyugLogic';
import { useNavyug } from '../context/NavyugContext';
import { CivicProgressTracker } from './CivicProgressTracker';

export type NavDestination = 'home' | 'data' | 'clock' | 'pledge' | 'explore';

interface HomeViewProps {
  onNavigate: (dest: NavDestination) => void;
  initialSubTab?: 'vision' | 'manifesto';
}

export function HomeView({ onNavigate, initialSubTab = 'vision' }: HomeViewProps) {
  const {
    user,
    language,
    metricsLoading,
    savedPledges,
    localPledgeDownloads,
    savedPolicyIds,
    votedIdeaIds,
    ideas,
  } = useNavyug();
  const [subTab, setSubTab] = useState<'vision' | 'manifesto'>(initialSubTab);
  const [expandedManifesto, setExpandedManifesto] = useState<string>('01');
  const [nowMs, setNowMs] = useState<number>(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNowMs(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const previewSkeleton =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('skeleton') === '1';
  const showEngagementSkeleton = metricsLoading || previewSkeleton;

  const authoredIdeasCount = user
    ? ideas.filter((item) => item.authorId === user.uid).length
    : 0;
  const engagementSummary = computeCivicProgress({
    pledgesCount: Math.max(savedPledges.length, localPledgeDownloads),
    savedPoliciesCount: savedPolicyIds.length,
    totalPolicies: POLICY_BRIEFS.length,
    votesCastCount: votedIdeaIds.length,
    authoredIdeasCount,
    isSignedIn: Boolean(user),
  });

  const countdown = calculateCountdown(nowMs, TARGET_CENTENARY_UTC);
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="space-y-10 sm:space-y-14">
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch pt-2">
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <p className="text-xs font-medium tracking-wide text-[#2D4A8A] dark:text-[#7CA0F0]">
              {UI_COPY.home.eyebrow[language]}
            </p>
            <h1 className="text-[clamp(2rem,4.5vw,3.35rem)] font-bold leading-[1.12] tracking-tight text-[#141926] dark:text-[#F1F5F9]">
              {UI_COPY.home.headlinePrefix[language]}{' '}
              <span className="text-[#2D4A8A] dark:text-[#7CA0F0]">
                {UI_COPY.home.headlineAccent[language]}
              </span>
            </h1>
            <p className="text-[15px] sm:text-base text-[#4B5568] dark:text-[#94A3B8] leading-relaxed max-w-2xl">
              {UI_COPY.home.subcopy[language]}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => onNavigate('pledge')}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-xl bg-[#2D4A8A] text-white text-sm font-medium hover:bg-[#223A6E] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {UI_COPY.home.primaryCta[language]}
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                setSubTab('manifesto');
                document.getElementById('navyug-charter-tabs')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-xl border border-[#DCE2EC] dark:border-[#242E42] bg-white dark:bg-[#161D2B] text-[#141926] dark:text-[#F1F5F9] text-sm font-medium hover:bg-[#F1F4F8] dark:hover:bg-[#1E293B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {UI_COPY.home.secondaryCta[language]}
            </button>
          </div>

          <div className="min-h-[20px] flex items-center">
            {showEngagementSkeleton ? (
              <div
                role="status"
                aria-busy="true"
                aria-label={language === 'en' ? 'Syncing engagement summary' : 'सहभागिता सारांश लोड हो रहा है'}
                data-testid="home-engagement-skeleton"
                className="flex items-center gap-2"
              >
                <div className="h-3.5 w-36 rounded-md bg-[#E8ECF4] dark:bg-[#232F45] motion-safe:animate-pulse" />
                <div className="h-3.5 w-24 rounded-md bg-[#EEF1F6] dark:bg-[#1E293B] motion-safe:animate-pulse" />
              </div>
            ) : (
              <p
                data-testid="home-engagement-summary"
                className="text-xs text-[#6E788A] dark:text-[#94A3B8] tabular-nums"
              >
                {language === 'en'
                  ? `Your 2047 Readiness: ${engagementSummary.overallPercent}% · ${engagementSummary.completedMilestones}/${engagementSummary.totalMilestones} milestones completed`
                  : `आपकी 2047 तैयारी: ${engagementSummary.overallPercent}% · ${engagementSummary.completedMilestones}/${engagementSummary.totalMilestones} लक्ष्य पूर्ण`}
              </p>
            )}
          </div>
        </div>

        {/* Live Centenary Countdown Panel */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-[#E5E9F0] dark:border-[#242E42] bg-white dark:bg-[#161D2B] p-6">
          <div className="flex items-center justify-between gap-2 pb-4 border-b border-[#EEF1F6] dark:border-[#1E293B]">
            <span className="text-xs font-medium text-[#4B5568] dark:text-[#94A3B8]">
              {UI_COPY.home.countdownLabel[language]}
            </span>
            <span className="text-xs font-mono font-medium text-[#2C7A6B] dark:text-[#55B8A5] tabular-nums whitespace-nowrap">
              {UI_COPY.home.countdownTarget[language]}
            </span>
          </div>

          <div
            className="grid grid-cols-4 gap-2.5 py-6"
            aria-label="Countdown to August 15, 2047"
            data-testid="centenary-countdown"
          >
            {[
              { value: String(countdown.days), label: UI_COPY.home.days[language], accent: true },
              { value: pad(countdown.hours), label: UI_COPY.home.hours[language], accent: false },
              { value: pad(countdown.minutes), label: UI_COPY.home.mins[language], accent: false },
              { value: pad(countdown.seconds), label: UI_COPY.home.secs[language], accent: false },
            ].map((unit) => (
              <div
                key={unit.label}
                className="rounded-xl bg-[#F4F6FA] dark:bg-[#0F141E] py-3.5 px-2 text-center"
              >
                <div
                  className={`font-mono text-xl sm:text-2xl font-semibold tabular-nums ${
                    unit.accent
                      ? 'text-[#2D4A8A] dark:text-[#7CA0F0]'
                      : 'text-[#141926] dark:text-[#F1F5F9]'
                  }`}
                >
                  {unit.value}
                </div>
                <div className="text-[11px] text-[#6E788A] dark:text-[#94A3B8] mt-1">
                  {unit.label}
                </div>
              </div>
            ))}
          </div>

          {/* 3 Verified Headline KPIs */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#EEF1F6] dark:border-[#1E293B]">
            <div>
              <div className="font-mono text-sm font-semibold text-[#141926] dark:text-[#F1F5F9] tabular-nums">
                $4.06T → $30T+
              </div>
              <div className="text-[11px] text-[#6E788A] dark:text-[#94A3B8] mt-0.5">
                {language === 'en' ? 'GDP · IMF / NITI' : 'जीडीपी · IMF / नीति'}
              </div>
            </div>
            <div>
              <div className="font-mono text-sm font-semibold text-[#2C7A6B] dark:text-[#55B8A5] tabular-nums">
                300.5 GW
              </div>
              <div className="text-[11px] text-[#6E788A] dark:text-[#94A3B8] mt-0.5">
                {language === 'en' ? 'Clean Power 2026' : 'स्वच्छ ऊर्जा 2026'}
              </div>
            </div>
            <div>
              <div className="font-mono text-sm font-semibold text-[#2D4A8A] dark:text-[#7CA0F0] tabular-nums">
                0.685 HDI
              </div>
              <div className="text-[11px] text-[#6E788A] dark:text-[#94A3B8] mt-0.5">
                {language === 'en' ? 'UNDP Rank #130' : 'UNDP रैंक #130'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Quick Pathway Strip */}
      <section aria-label="Quick journey modules" className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            step: language === 'en' ? 'Step 01 · Core Roadmap' : 'चरण 01 · मुख्य रोडमैप',
            title: language === 'en' ? '5-Point Manifesto' : '5-सूत्रीय घोषणापत्र',
            desc: language === 'en' ? 'Developing → Developed Nation' : 'विकासशील → विकसित राष्ट्र',
            icon: Compass,
            onClick: () => {
              setSubTab('manifesto');
              document.getElementById('navyug-charter-tabs')?.scrollIntoView({ behavior: 'smooth' });
            },
          },
          {
            step: language === 'en' ? 'Step 02 · Verified Data' : 'चरण 02 · प्रमाणित आंकड़े',
            title: language === 'en' ? '2026 vs 2047 Bar Graph' : '2026 बनाम 2047 ग्राफ',
            desc: language === 'en' ? '$4.06T → $30T+ Leap & Heatmap' : '$4.06T → $30T+ छलांग व हीटमैप',
            icon: BarChart3,
            onClick: () => onNavigate('data'),
          },
          {
            step: language === 'en' ? 'Step 03 · Deep Architecture' : 'चरण 03 · गहरा आर्किटेक्चर',
            title: language === 'en' ? '12-Pillar Wall Clock' : '12-स्तंभ दीवार घड़ी',
            desc: language === 'en' ? 'Hour = Pillar · Minute = Sub-Pillar' : 'घंटा = स्तंभ · मिनट = उप-स्तंभ',
            icon: Clock,
            onClick: () => onNavigate('clock'),
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.title}
              type="button"
              onClick={item.onClick}
              className="group text-left rounded-2xl border border-[#E5E9F0] dark:border-[#242E42] bg-white dark:bg-[#161D2B] p-5 hover:border-[#2D4A8A]/40 dark:hover:border-[#7CA0F0]/40 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-[#6E788A] dark:text-[#94A3B8]">
                  {item.step}
                </span>
                <Icon className="w-4 h-4 text-[#2D4A8A] dark:text-[#7CA0F0] group-hover:translate-x-0.5 transition-transform" />
              </div>
              <div className="text-base font-semibold text-[#141926] dark:text-[#F1F5F9]">
                {item.title}
              </div>
              <div className="text-xs text-[#4B5568] dark:text-[#94A3B8] mt-1">
                {item.desc}
              </div>
            </button>
          );
        })}
      </section>

      {/* Visual 2047 Pledge & Engagement Progress Tracker (Recharts) */}
      <CivicProgressTracker onNavigate={onNavigate} isLoading={showEngagementSkeleton} />

      {/* Segmented Switch: Vision & Executive Summary | 5-Point Manifesto */}
      <section id="navyug-charter-tabs" className="space-y-6 scroll-mt-20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#E5E9F0] dark:border-[#242E42] pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#141926] dark:text-[#F1F5F9]">
              {subTab === 'vision'
                ? language === 'en'
                  ? 'Vision of Navyug: Architecting the Next Era (2026–2047)'
                  : 'नवयुग का विज़न: अगले युग का निर्माण (2026–2047)'
                : language === 'en'
                ? '5-Point National Manifesto (2026 → 2047)'
                : '5-सूत्रीय राष्ट्रीय घोषणापत्र (2026 → 2047)'}
            </h2>
          </div>

          <div
            className="inline-flex items-center p-1 rounded-xl bg-[#EEF1F6] dark:bg-[#161D2B] border border-[#E5E9F0] dark:border-[#242E42] self-start"
            role="tablist"
            aria-label="Charter sections"
          >
            <button
              type="button"
              role="tab"
              aria-selected={subTab === 'vision'}
              onClick={() => setSubTab('vision')}
              className={`px-3.5 py-2 min-h-[40px] rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                subTab === 'vision'
                  ? 'bg-white dark:bg-[#242E42] text-[#141926] dark:text-[#F1F5F9] shadow-xs'
                  : 'text-[#4B5568] dark:text-[#94A3B8] hover:text-[#141926] dark:hover:text-white'
              }`}
            >
              {UI_COPY.home.tabVision[language]}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={subTab === 'manifesto'}
              onClick={() => setSubTab('manifesto')}
              className={`px-3.5 py-2 min-h-[40px] rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                subTab === 'manifesto'
                  ? 'bg-white dark:bg-[#242E42] text-[#141926] dark:text-[#F1F5F9] shadow-xs'
                  : 'text-[#4B5568] dark:text-[#94A3B8] hover:text-[#141926] dark:hover:text-white'
              }`}
            >
              {UI_COPY.home.tabManifesto[language]}
            </button>
          </div>
        </div>

        {subTab === 'vision' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {VISION_PILLARS.map((pillar) => (
              <article
                key={pillar.title.en}
                className="flex flex-col justify-between rounded-2xl border border-[#E5E9F0] dark:border-[#242E42] bg-white dark:bg-[#161D2B] p-6 space-y-5"
              >
                <div className="space-y-3">
                  <p className="text-xs font-medium text-[#2D4A8A] dark:text-[#7CA0F0]">
                    {pillar.tag[language]}
                  </p>
                  <h3 className="text-lg font-semibold text-[#141926] dark:text-[#F1F5F9] leading-snug">
                    {pillar.title[language]}
                  </h3>
                  <p className="text-sm text-[#4B5568] dark:text-[#94A3B8] leading-relaxed">
                    {pillar.body[language]}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EEF1F6] dark:border-[#1E293B] flex items-center justify-between gap-2 text-xs">
                  <span className="font-medium text-[#141926] dark:text-[#E2E8F0]">
                    {pillar.metaLeft[language]}
                  </span>
                  <span className="text-[#2C7A6B] dark:text-[#55B8A5] text-right">
                    {pillar.metaRight}
                  </span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {MANIFESTO_POINTS.map((point) => {
              const isOpen = expandedManifesto === point.number;
              return (
                <article
                  key={point.number}
                  className="rounded-2xl border border-[#E5E9F0] dark:border-[#242E42] bg-white dark:bg-[#161D2B] overflow-hidden"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setExpandedManifesto(isOpen ? '' : point.number)}
                    className="w-full text-left px-5 sm:px-6 py-4 min-h-[60px] flex items-center justify-between gap-4 hover:bg-[#F8F9FB] dark:hover:bg-[#1C2536] transition-colors cursor-pointer"
                  >
                    <div className="flex items-baseline gap-4 min-w-0">
                      <span className="font-mono text-sm font-semibold text-[#2D4A8A] dark:text-[#7CA0F0] shrink-0">
                        {point.number}.
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-base font-semibold text-[#141926] dark:text-[#F1F5F9]">
                          {point.title[language]}
                        </h3>
                        <p className="text-xs font-mono text-[#2C7A6B] dark:text-[#55B8A5] mt-0.5 tabular-nums">
                          {point.metricShift}
                        </p>
                      </div>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#6E788A] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#6E788A] shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 pt-2 border-t border-[#EEF1F6] dark:border-[#1E293B] space-y-4">
                      <p className="text-sm text-[#4B5568] dark:text-[#94A3B8] leading-relaxed">
                        {point.summary[language]}
                      </p>
                      <ul className="space-y-2">
                        {point.keyLevers.map((lever) => (
                          <li
                            key={lever.en}
                            className="text-sm text-[#141926] dark:text-[#E2E8F0] flex items-start gap-2.5"
                          >
                            <span className="text-[#2C7A6B] dark:text-[#55B8A5] font-mono text-xs mt-0.5">
                              —
                            </span>
                            <span>{lever[language]}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
