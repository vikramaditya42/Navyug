import { ArrowUpRight } from 'lucide-react';
import {
  Bar,
  BarChart,
  Cell,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { POLICY_BRIEFS } from '../data/navyugData';
import { computeCivicProgress } from '../utils/navyugLogic';
import { useNavyug } from '../context/NavyugContext';
import type { NavDestination } from './HomeView';

interface CivicProgressTrackerProps {
  onNavigate: (dest: NavDestination) => void;
  isLoading?: boolean;
}

const SKELETON_BAR_WIDTHS = ['64%', '48%', '76%', '36%'] as const;

export function CivicProgressTracker({ onNavigate, isLoading }: CivicProgressTrackerProps) {
  const {
    user,
    metricsLoading,
    language,
    theme,
    savedPledges,
    localPledgeDownloads,
    savedPolicyIds,
    votedIdeaIds,
    ideas,
    signInWithGoogle,
  } = useNavyug();

  const loading = isLoading ?? metricsLoading;

  if (loading) {
    return (
      <section
        role="status"
        aria-live="polite"
        aria-busy="true"
        aria-label={
          language === 'en'
            ? 'Loading 2047 pledge and civic engagement metrics'
            : '2047 प्रतिज्ञा और नागरिक सहभागिता आंकड़े लोड हो रहे हैं'
        }
        data-testid="civic-progress-skeleton"
        className="rounded-2xl border border-[#E5E9F0] dark:border-[#242E42] bg-white dark:bg-[#161D2B] p-5 sm:p-6 space-y-6"
      >
        <span className="sr-only">
          {language === 'en'
            ? 'Loading engagement metrics...'
            : 'सहभागिता आंकड़े लोड हो रहे हैं...'}
        </span>

        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#EEF1F6] dark:border-[#1E293B]">
          <div className="space-y-2.5 flex-1 max-w-md">
            <div className="h-3.5 w-44 rounded-md bg-[#EEF1F6] dark:bg-[#1E293B] motion-safe:animate-pulse" />
            <div className="h-6 w-72 max-w-full rounded-md bg-[#E8ECF4] dark:bg-[#232F45] motion-safe:animate-pulse" />
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="h-[38px] w-32 rounded-xl bg-[#EEF1F6] dark:bg-[#1E293B] motion-safe:animate-pulse" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left: Radial Ring Skeleton */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center rounded-xl bg-[#FAFBFD] dark:bg-[#0F141E] border border-[#EEF1F6] dark:border-[#1E293B] p-4">
            <div className="relative w-44 h-44 flex items-center justify-center">
              <div className="w-[152px] h-[152px] rounded-full border-[12px] border-[#EEF1F6] dark:border-[#1E293B] motion-safe:animate-pulse" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <div className="h-7 w-14 rounded-md bg-[#E8ECF4] dark:bg-[#232F45] motion-safe:animate-pulse" />
                <div className="h-3 w-20 rounded-md bg-[#EEF1F6] dark:bg-[#1E293B] motion-safe:animate-pulse" />
              </div>
            </div>
            <div className="h-3.5 w-48 max-w-full rounded-md bg-[#EEF1F6] dark:bg-[#1E293B] motion-safe:animate-pulse mt-2.5" />
          </div>

          {/* Right: Horizontal Bar Chart + 4 Milestone Cards Skeleton */}
          <div className="lg:col-span-8 space-y-4">
            <div className="h-52 w-full flex flex-col justify-between py-2.5 px-2">
              <div className="flex-1 flex flex-col justify-around gap-3">
                {SKELETON_BAR_WIDTHS.map((width, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-24 h-3.5 rounded-md bg-[#EEF1F6] dark:bg-[#1E293B] shrink-0 motion-safe:animate-pulse" />
                    <div className="flex-1 h-[18px] rounded-lg bg-[#F4F6FA] dark:bg-[#101724] overflow-hidden">
                      <div
                        className="h-full rounded-r-lg bg-[#E4E9F2] dark:bg-[#232F45] motion-safe:animate-pulse"
                        style={{ width }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="pl-28 pt-2 flex items-center justify-between">
                {[0, 25, 50, 75, 100].map((tick) => (
                  <div
                    key={tick}
                    className="h-2.5 w-6 rounded-sm bg-[#EEF1F6] dark:bg-[#1E293B] motion-safe:animate-pulse"
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-[#EEF1F6] dark:border-[#1E293B]">
              {[0, 1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className="rounded-xl bg-[#FAFBFD] dark:bg-[#0F141E] border border-[#EEF1F6] dark:border-[#1E293B] px-3 py-2.5 space-y-2"
                >
                  <div className="h-3 w-16 rounded-sm bg-[#EEF1F6] dark:bg-[#1E293B] motion-safe:animate-pulse" />
                  <div className="flex items-baseline justify-between">
                    <div className="h-4 w-8 rounded-sm bg-[#E8ECF4] dark:bg-[#232F45] motion-safe:animate-pulse" />
                    <div className="h-3 w-7 rounded-sm bg-[#EEF1F6] dark:bg-[#1E293B] motion-safe:animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const authoredIdeasCount = user
    ? ideas.filter((item) => item.authorId === user.uid).length
    : 0;

  const effectivePledgesCount = Math.max(savedPledges.length, localPledgeDownloads);

  const progress = computeCivicProgress({
    pledgesCount: effectivePledgesCount,
    savedPoliciesCount: savedPolicyIds.length,
    totalPolicies: POLICY_BRIEFS.length,
    votesCastCount: votedIdeaIds.length,
    authoredIdeasCount,
    isSignedIn: Boolean(user),
  });

  const radialData = [
    {
      name: language === 'en' ? '2047 Civic Progress' : '2047 नागरिक प्रगति',
      value: progress.overallPercent,
      fill: theme === 'dark' ? '#7CA0F0' : '#2D4A8A',
    },
  ];

  const barData = progress.milestones.map((m) => ({
    id: m.id,
    name: language === 'en' ? m.labelEn : m.labelHi,
    percent: m.percent,
    current: m.current,
    target: m.target,
    color: m.color,
  }));

  const trackColor = theme === 'dark' ? '#1E293B' : '#EEF1F6';
  const axisColor = theme === 'dark' ? '#94A3B8' : '#4B5568';
  const tooltipBg = theme === 'dark' ? '#161D2B' : '#FFFFFF';
  const tooltipBorder = theme === 'dark' ? '#242E42' : '#E5E9F0';

  return (
    <section
      aria-label={language === 'en' ? 'Your 2047 Pledge & Civic Progress' : 'आपकी 2047 प्रतिज्ञा व प्रगति'}
      data-testid="civic-progress-tracker"
      className="rounded-2xl border border-[#E5E9F0] dark:border-[#242E42] bg-white dark:bg-[#161D2B] p-5 sm:p-6 space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#EEF1F6] dark:border-[#1E293B]">
        <div className="space-y-1">
          <p className="text-xs font-medium text-[#2C7A6B] dark:text-[#55B8A5]">
            {language === 'en'
              ? 'Jan Bhagidari Tracker · 2047 Readiness'
              : 'जन भागीदारी ट्रैकर · 2047 संकल्प प्रगति'}
          </p>
          <h2 className="text-lg sm:text-xl font-semibold text-[#141926] dark:text-[#F1F5F9]">
            {language === 'en'
              ? 'Your 2047 Pledge & Civic Engagement Progress'
              : 'आपकी 2047 प्रतिज्ञा व नागरिक सहभागिता प्रगति'}
          </h2>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {!user && (
            <button
              type="button"
              onClick={() => void signInWithGoogle()}
              className="px-3 py-2 min-h-[38px] rounded-xl border border-[#DCE2EC] dark:border-[#242E42] text-xs font-medium text-[#2D4A8A] dark:text-[#7CA0F0] hover:bg-[#EEF2FA] dark:hover:bg-[#1E293B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {language === 'en' ? 'Sign In to Sync' : 'सिंक हेतु साइन इन'}
            </button>
          )}
          <button
            type="button"
            onClick={() => onNavigate('pledge')}
            className="inline-flex items-center gap-1 px-3 py-2 min-h-[38px] rounded-xl bg-[#EEF2FA] dark:bg-[#1E293B] text-xs font-medium text-[#2D4A8A] dark:text-[#7CA0F0] hover:bg-[#E1E8F7] dark:hover:bg-[#28354D] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {effectivePledgesCount > 0
              ? language === 'en'
                ? 'Manage Pledges'
                : 'प्रतिज्ञाएं देखें'
              : language === 'en'
              ? 'Complete Pledge'
              : 'प्रतिज्ञा पूरी करें'}
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Recharts Radial Completion Ring */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center rounded-xl bg-[#FAFBFD] dark:bg-[#0F141E] border border-[#EEF1F6] dark:border-[#1E293B] p-4">
          <div className="relative w-44 h-44">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="72%"
                outerRadius="96%"
                barSize={12}
                data={radialData}
                startAngle={90}
                endAngle={-270}
              >
                <PolarAngleAxis
                  type="number"
                  domain={[0, 100]}
                  angleAxisId={0}
                  tick={false}
                />
                <RadialBar
                  background={{ fill: trackColor }}
                  dataKey="value"
                  cornerRadius={8}
                  isAnimationActive={false}
                />
              </RadialBarChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
              <span
                className="font-mono text-3xl font-bold text-[#141926] dark:text-[#F1F5F9] tabular-nums"
                data-testid="civic-overall-percent"
              >
                {progress.overallPercent}%
              </span>
              <span className="text-[11px] text-[#6E788A] dark:text-[#94A3B8] mt-0.5">
                {progress.completedMilestones}/{progress.totalMilestones}{' '}
                {language === 'en' ? 'Milestones' : 'लक्ष्य पूर्ण'}
              </span>
            </div>
          </div>

          <p className="text-xs text-[#4B5568] dark:text-[#94A3B8] text-center mt-2">
            {effectivePledgesCount > 0
              ? language === 'en'
                ? `${effectivePledgesCount} 2047 pledge certificate${effectivePledgesCount > 1 ? 's' : ''} recorded`
                : `${effectivePledgesCount} 2047 प्रतिज्ञा प्रमाणपत्र दर्ज`
              : language === 'en'
              ? 'Take your 2047 Digital Pledge to unlock 35% progress'
              : '35% प्रगति हेतु अपनी 2047 डिजिटल प्रतिज्ञा लें'}
          </p>
        </div>

        {/* Right: Recharts Horizontal Engagement Bar Chart + Actionable Status Row */}
        <div className="lg:col-span-8 space-y-4">
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barData}
                layout="vertical"
                margin={{ top: 4, right: 20, left: 10, bottom: 4 }}
              >
                <XAxis
                  type="number"
                  domain={[0, 100]}
                  tickFormatter={(v) => `${v}%`}
                  tick={{ fill: axisColor, fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={102}
                  tick={{ fill: axisColor, fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(45,74,138,0.05)' }}
                  contentStyle={{
                    backgroundColor: tooltipBg,
                    borderColor: tooltipBorder,
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: theme === 'dark' ? '#F1F5F9' : '#141926',
                  }}
                  formatter={(value, _name, item) => {
                    const payload = item?.payload as { current: number; target: number } | undefined;
                    const suffix = payload ? ` (${payload.current}/${payload.target})` : '';
                    return [`${value}%${suffix}`, language === 'en' ? 'Completion' : 'पूर्णता'];
                  }}
                />
                <Bar
                  dataKey="percent"
                  radius={[0, 8, 8, 0]}
                  barSize={18}
                  background={{ fill: trackColor, radius: 8 }}
                  isAnimationActive={false}
                >
                  {barData.map((entry) => (
                    <Cell key={entry.id} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-[#EEF1F6] dark:border-[#1E293B]">
            {progress.milestones.map((m) => {
              const targetNav: NavDestination = m.id === 'policies' ? 'explore' : 'pledge';
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => onNavigate(targetNav)}
                  className="text-left rounded-xl bg-[#FAFBFD] dark:bg-[#0F141E] border border-[#EEF1F6] dark:border-[#1E293B] px-3 py-2.5 hover:border-[#2D4A8A]/40 transition-colors cursor-pointer"
                >
                  <div className="text-[11px] text-[#6E788A] dark:text-[#94A3B8] truncate">
                    {language === 'en' ? m.labelEn : m.labelHi}
                  </div>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="font-mono text-sm font-semibold text-[#141926] dark:text-[#F1F5F9] tabular-nums">
                      {m.current}/{m.target}
                    </span>
                    <span className="font-mono text-[11px] font-medium text-[#2C7A6B] dark:text-[#55B8A5] tabular-nums">
                      {m.percent}%
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
