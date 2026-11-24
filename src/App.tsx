import { useState } from 'react';
import {
  Award,
  BarChart3,
  BookOpen,
  Clock,
  Home,
  Languages,
  LogIn,
  LogOut,
  Moon,
  Sun,
} from 'lucide-react';
import { UI_COPY } from './data/navyugData';
import { NavyugProvider, useNavyug } from './context/NavyugContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LogoMark } from './components/LogoMark';
import { HomeView, type NavDestination } from './components/HomeView';
import { DataView } from './components/DataView';
import { ClockView } from './components/ClockView';
import { PledgeView } from './components/PledgeView';
import { ExploreView } from './components/ExploreView';

const NAV_ITEMS: { id: NavDestination; icon: typeof Home }[] = [
  { id: 'home', icon: Home },
  { id: 'data', icon: BarChart3 },
  { id: 'clock', icon: Clock },
  { id: 'pledge', icon: Award },
  { id: 'explore', icon: BookOpen },
];

function NavyugShell() {
  const {
    user,
    authBusy,
    authError,
    signInWithGoogle,
    signOutUser,
    language,
    toggleLanguage,
    theme,
    toggleTheme,
  } = useNavyug();

  const [activeTab, setActiveTab] = useState<NavDestination>('home');
  const [preselectedPillar, setPreselectedPillar] = useState<string | undefined>(undefined);
  const [autoOpenIdeaForm, setAutoOpenIdeaForm] = useState(false);

  const handleNavigate = (dest: NavDestination) => {
    setActiveTab(dest);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitIdeaForPillar = (pillarLabel: string) => {
    setPreselectedPillar(pillarLabel);
    setAutoOpenIdeaForm(true);
    setActiveTab('pledge');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FB] text-[#141926] dark:bg-[#0F141E] dark:text-[#F1F5F9] transition-colors">
      {/* Sticky Minimalist Top Header (56px mobile / 64px desktop) */}
      <header className="sticky top-0 z-30 h-14 lg:h-16 bg-white/90 dark:bg-[#111723]/90 backdrop-blur-md border-b border-[#E5E9F0] dark:border-[#1E293B]">
        <div className="max-w-6xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 lg:gap-8">
          {/* Zone 1: Brand Wordmark + Swappable Minimal Logo */}
          <button
            type="button"
            onClick={() => handleNavigate('home')}
            className="inline-flex items-center gap-2.5 text-left whitespace-nowrap shrink-0 cursor-pointer min-h-[44px]"
            aria-label="NAVYUG Home"
          >
            <LogoMark className="w-8 h-8 shrink-0" />
            <span className="font-display text-lg font-bold tracking-tight text-[#141926] dark:text-[#F1F5F9]">
              NAVYUG
            </span>
          </button>

          {/* Zone 2: Clean Single-Line Desktop Navigation (5 items) */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-center gap-7"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => handleNavigate(item.id)}
                  className={`relative py-2 text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'text-[#2D4A8A] dark:text-[#7CA0F0]'
                      : 'text-[#4B5568] dark:text-[#94A3B8] hover:text-[#141926] dark:hover:text-[#F1F5F9]'
                  }`}
                >
                  {UI_COPY.nav[item.id][language]}
                  {isActive && (
                    <span
                      className="absolute left-0 right-0 -bottom-[13px] h-[2px] bg-[#2D4A8A] dark:bg-[#7CA0F0] rounded-full"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Language, Theme & Account Action */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label={language === 'en' ? 'Switch to Hindi' : 'Switch to English'}
              className="inline-flex items-center justify-center gap-1.5 px-2.5 min-h-[40px] min-w-[44px] rounded-xl text-xs font-medium text-[#4B5568] dark:text-[#CBD5E1] hover:bg-[#F1F4F8] dark:hover:bg-[#1E293B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Languages className="w-4 h-4 text-[#2D4A8A] dark:text-[#7CA0F0]" />
              <span>{language === 'en' ? 'हिन्दी' : 'EN'}</span>
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
              className="inline-flex items-center justify-center min-w-[40px] min-h-[40px] rounded-xl text-[#4B5568] dark:text-[#CBD5E1] hover:bg-[#F1F4F8] dark:hover:bg-[#1E293B] transition-colors shrink-0 cursor-pointer"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            {user ? (
              <button
                type="button"
                disabled={authBusy}
                onClick={() => void signOutUser()}
                aria-label={`Sign out ${user.displayName || 'account'}`}
                className="inline-flex items-center gap-2 pl-2 pr-3 min-h-[40px] rounded-xl border border-[#DCE2EC] dark:border-[#242E42] bg-[#FAFBFD] dark:bg-[#161D2B] text-xs font-medium text-[#141926] dark:text-[#F1F5F9] hover:bg-[#EEF2FA] dark:hover:bg-[#1E293B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="w-6 h-6 rounded-full object-cover"
                  />
                ) : (
                  <span className="w-6 h-6 rounded-full bg-[#2D4A8A] text-white text-[11px] font-semibold flex items-center justify-center">
                    {(user.displayName || 'U').charAt(0).toUpperCase()}
                  </span>
                )}
                <span className="hidden sm:inline max-w-[90px] truncate">
                  {user.displayName?.split(' ')[0] || UI_COPY.auth.signOut[language]}
                </span>
                <LogOut className="w-3.5 h-3.5 text-[#6E788A]" />
              </button>
            ) : (
              <button
                type="button"
                disabled={authBusy}
                onClick={() => void signInWithGoogle()}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 min-h-[40px] rounded-xl bg-[#2D4A8A] text-white text-xs font-medium hover:bg-[#223A6E] transition-colors whitespace-nowrap shrink-0 disabled:opacity-60 cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>{UI_COPY.auth.signIn[language]}</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Optional Auth Feedback Strip */}
      {authError && (
        <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-3">
          <p
            role="alert"
            className="text-xs px-3.5 py-2.5 rounded-xl bg-[#FEF2F2] dark:bg-[#2A1517] border border-[#FCA5A5]/40 text-[#991B1B] dark:text-[#FCA5A5]"
          >
            {authError}
          </p>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-24 lg:pb-14">
        <ErrorBoundary>
          {activeTab === 'home' && <HomeView onNavigate={handleNavigate} />}
          {activeTab === 'data' && <DataView />}
          {activeTab === 'clock' && <ClockView onSubmitIdeaForPillar={handleSubmitIdeaForPillar} />}
          {activeTab === 'pledge' && (
            <PledgeView
              preselectedPillar={preselectedPillar}
              autoOpenIdeaForm={autoOpenIdeaForm}
              onClearPreselect={() => setAutoOpenIdeaForm(false)}
            />
          )}
          {activeTab === 'explore' && <ExploreView />}
        </ErrorBoundary>
      </main>

      {/* Quiet Editorial Footer (Desktop) */}
      <footer className="hidden lg:block border-t border-[#E5E9F0] dark:border-[#1E293B] bg-white/60 dark:bg-[#111723]/60">
        <div className="max-w-6xl mx-auto px-8 py-5 flex items-center justify-between text-xs text-[#6E788A] dark:text-[#94A3B8]">
          <span>
            NAVYUG · {UI_COPY.brandSub[language]}
          </span>
          <span>
            {language === 'en'
              ? 'Benchmarks sourced from IMF WEO, NITI Aayog, UNDP HDR, CEA & MoSPI'
              : 'स्रोत: IMF WEO, नीति आयोग, UNDP HDR, CEA व MoSPI'}
          </span>
        </div>
      </footer>

      {/* Mobile-First Fixed Bottom Navigation Bar (Thumb Zone, 64px height -> 120px total sticky <= 15% of 844px) */}
      <nav
        aria-label="Mobile bottom navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#111723]/95 backdrop-blur-md border-t border-[#E5E9F0] dark:border-[#1E293B] pb-safe"
      >
        <div className="grid grid-cols-5 h-16 max-w-lg mx-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-current={isActive ? 'page' : undefined}
                onClick={() => handleNavigate(item.id)}
                className={`flex flex-col items-center justify-center min-h-[44px] gap-1 transition-colors cursor-pointer ${
                  isActive
                    ? 'text-[#2D4A8A] dark:text-[#7CA0F0]'
                    : 'text-[#6E788A] dark:text-[#94A3B8]'
                }`}
              >
                <Icon className="w-5 h-5" strokeWidth={isActive ? 2.25 : 1.75} />
                <span className="text-[10px] font-medium leading-none truncate max-w-[64px]">
                  {UI_COPY.nav[item.id][language]}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export default function App() {
  return (
    <NavyugProvider>
      <NavyugShell />
    </NavyugProvider>
  );
}
