import { useState } from 'react';
import {
  Bookmark,
  BookmarkCheck,
  ChevronDown,
  ChevronUp,
  Download,
  ExternalLink,
} from 'lucide-react';
import { POLICY_BRIEFS, UI_COPY, YOUTH_STORIES } from '../data/navyugData';
import { generatePolicyBriefText } from '../utils/navyugLogic';
import { useNavyug } from '../context/NavyugContext';

export function ExploreView() {
  const { language, savedPolicyIds, toggleSavedPolicy } = useNavyug();
  const [sectionTab, setSectionTab] = useState<'policies' | 'stories'>('policies');

  // Policy Library State
  const [expandedPolicyIds, setExpandedPolicyIds] = useState<string[]>([POLICY_BRIEFS[0].id]);
  const [onlySavedPolicies, setOnlySavedPolicies] = useState(false);

  // Youth Stories State
  const [storyCategory, setStoryCategory] = useState<string>('all');
  const [expandedStoryIds, setExpandedStoryIds] = useState<string[]>([YOUTH_STORIES[0].id]);

  const allPoliciesExpanded = expandedPolicyIds.length === POLICY_BRIEFS.length;

  const toggleAllPolicies = () => {
    setExpandedPolicyIds(allPoliciesExpanded ? [] : POLICY_BRIEFS.map((p) => p.id));
  };

  const togglePolicy = (id: string) => {
    setExpandedPolicyIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleStory = (id: string) => {
    setExpandedStoryIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDownloadBrief = (policy: (typeof POLICY_BRIEFS)[number]) => {
    const text = generatePolicyBriefText(policy, language);
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `navyug-brief-${policy.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const visiblePolicies = onlySavedPolicies
    ? POLICY_BRIEFS.filter((p) => savedPolicyIds.includes(p.id))
    : POLICY_BRIEFS;

  const storyCategories = Array.from(new Set(YOUTH_STORIES.map((s) => s.category.en)));
  const visibleStories =
    storyCategory === 'all'
      ? YOUTH_STORIES
      : YOUTH_STORIES.filter((s) => s.category.en === storyCategory);

  return (
    <div className="space-y-8">
      {/* Header & Section Switcher */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-5">
        <div className="space-y-2 max-w-2xl">
          <p className="text-xs font-medium text-[#2D4A8A] dark:text-[#7CA0F0]">
            {UI_COPY.explore.eyebrow[language]}
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#141926] dark:text-[#F1F5F9]">
            {UI_COPY.explore.title[language]}
          </h1>
        </div>

        <div
          className="inline-flex items-center p-1 rounded-xl bg-[#EEF1F6] dark:bg-[#161D2B] border border-[#E5E9F0] dark:border-[#242E42] self-start"
          role="tablist"
          aria-label="Explore sections"
        >
          <button
            type="button"
            role="tab"
            aria-selected={sectionTab === 'policies'}
            onClick={() => setSectionTab('policies')}
            className={`px-3.5 py-2 min-h-[40px] rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              sectionTab === 'policies'
                ? 'bg-white dark:bg-[#242E42] text-[#141926] dark:text-[#F1F5F9] shadow-xs'
                : 'text-[#4B5568] dark:text-[#94A3B8] hover:text-[#141926] dark:hover:text-white'
            }`}
          >
            {UI_COPY.explore.tabPolicies[language]}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={sectionTab === 'stories'}
            onClick={() => setSectionTab('stories')}
            className={`px-3.5 py-2 min-h-[40px] rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              sectionTab === 'stories'
                ? 'bg-white dark:bg-[#242E42] text-[#141926] dark:text-[#F1F5F9] shadow-xs'
                : 'text-[#4B5568] dark:text-[#94A3B8] hover:text-[#141926] dark:hover:text-white'
            }`}
          >
            {UI_COPY.explore.tabStories[language]}
          </button>
        </div>
      </section>

      {/* TAB 1: 60s Policy Library */}
      {sectionTab === 'policies' && (
        <section className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2">
              <button
                type="button"
                aria-pressed={!onlySavedPolicies}
                onClick={() => setOnlySavedPolicies(false)}
                className={`px-3 py-1.5 min-h-[38px] rounded-lg text-xs font-medium border cursor-pointer ${
                  !onlySavedPolicies
                    ? 'bg-[#2D4A8A] border-[#2D4A8A] text-white'
                    : 'bg-white dark:bg-[#161D2B] border-[#E5E9F0] dark:border-[#242E42] text-[#4B5568] dark:text-[#94A3B8]'
                }`}
              >
                {language === 'en' ? `All Briefs (${POLICY_BRIEFS.length})` : `सभी (${POLICY_BRIEFS.length})`}
              </button>
              <button
                type="button"
                aria-pressed={onlySavedPolicies}
                onClick={() => setOnlySavedPolicies(true)}
                className={`px-3 py-1.5 min-h-[38px] rounded-lg text-xs font-medium border cursor-pointer ${
                  onlySavedPolicies
                    ? 'bg-[#2D4A8A] border-[#2D4A8A] text-white'
                    : 'bg-white dark:bg-[#161D2B] border-[#E5E9F0] dark:border-[#242E42] text-[#4B5568] dark:text-[#94A3B8]'
                }`}
              >
                {language === 'en'
                  ? `Saved (${savedPolicyIds.length})`
                  : `सहेजे गए (${savedPolicyIds.length})`}
              </button>
            </div>

            <button
              type="button"
              onClick={toggleAllPolicies}
              className="px-3.5 py-2 min-h-[40px] rounded-xl border border-[#DCE2EC] dark:border-[#242E42] bg-white dark:bg-[#161D2B] text-xs font-medium text-[#2D4A8A] dark:text-[#7CA0F0] hover:bg-[#EEF2FA] dark:hover:bg-[#1E293B] transition-colors cursor-pointer"
            >
              {allPoliciesExpanded
                ? UI_COPY.explore.collapseAll[language]
                : UI_COPY.explore.expandAll[language]}
            </button>
          </div>

          {visiblePolicies.length === 0 ? (
            <div className="rounded-2xl border border-[#E5E9F0] dark:border-[#242E42] bg-white dark:bg-[#161D2B] p-10 text-center space-y-2">
              <p className="text-sm font-medium text-[#141926] dark:text-[#F1F5F9]">
                {language === 'en' ? 'No saved policy briefs yet.' : 'अभी कोई नीति सारांश सहेजा नहीं गया है।'}
              </p>
              <p className="text-xs text-[#6E788A] dark:text-[#94A3B8]">
                {language === 'en'
                  ? 'Tap the bookmark icon on any brief to save it for quick reference.'
                  : 'त्वरित संदर्भ के लिए किसी भी सारांश पर बुकमार्क आइकन दबाएं।'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {visiblePolicies.map((policy) => {
                const isOpen = expandedPolicyIds.includes(policy.id);
                const isSaved = savedPolicyIds.includes(policy.id);

                return (
                  <article
                    key={policy.id}
                    className="flex flex-col justify-between rounded-2xl border border-[#E5E9F0] dark:border-[#242E42] bg-white dark:bg-[#161D2B] p-5 space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="text-xs text-[#6E788A] dark:text-[#94A3B8]">
                          <span className="font-medium text-[#2D4A8A] dark:text-[#7CA0F0]">
                            {policy.category[language]}
                          </span>
                          <span aria-hidden="true"> · </span>
                          <span>{policy.subtitle[language]}</span>
                        </div>
                        <button
                          type="button"
                          aria-pressed={isSaved}
                          aria-label={`${isSaved ? 'Remove bookmark for' : 'Bookmark'} ${policy.title.en}`}
                          onClick={() => void toggleSavedPolicy(policy.id)}
                          className="min-w-[36px] min-h-[36px] -mt-1 -mr-1 flex items-center justify-center rounded-lg text-[#6E788A] hover:text-[#2D4A8A] dark:hover:text-[#7CA0F0] hover:bg-[#F4F6FA] dark:hover:bg-[#1E293B] transition-colors cursor-pointer shrink-0"
                        >
                          {isSaved ? (
                            <BookmarkCheck className="w-4 h-4 text-[#2D4A8A] dark:text-[#7CA0F0]" />
                          ) : (
                            <Bookmark className="w-4 h-4" />
                          )}
                        </button>
                      </div>

                      <h2 className="text-base sm:text-lg font-semibold text-[#141926] dark:text-[#F1F5F9] leading-snug">
                        {policy.title[language]}
                      </h2>

                      <div className="rounded-xl bg-[#EDF6F4]/70 dark:bg-[#132623] border border-[#2C7A6B]/20 dark:border-[#55B8A5]/25 p-3.5">
                        <p className="text-xs text-[#1D5C50] dark:text-[#7AD4C3] leading-relaxed">
                          <span className="font-semibold">2047 Impact: </span>
                          {policy.impactPitch[language]}
                        </p>
                      </div>

                      {isOpen && (
                        <div className="space-y-3 pt-1">
                          <p className="text-sm text-[#4B5568] dark:text-[#94A3B8] leading-relaxed">
                            {policy.summary60s[language]}
                          </p>
                          <ul className="space-y-1.5 text-xs text-[#141926] dark:text-[#E2E8F0]">
                            {policy.keyDeliverables.map((item) => (
                              <li key={item.en} className="flex items-start gap-2">
                                <span className="text-[#2C7A6B] dark:text-[#55B8A5]">—</span>
                                <span>{item[language]}</span>
                              </li>
                            ))}
                          </ul>
                          <a
                            href={policy.officialPortal}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-medium text-[#2D4A8A] dark:text-[#7CA0F0] hover:underline"
                          >
                            {language === 'en' ? 'Official Ministry Portal' : 'आधिकारिक मंत्रालय पोर्टल'}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-[#EEF1F6] dark:border-[#1E293B] space-y-2">
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => togglePolicy(policy.id)}
                        className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 min-h-[42px] rounded-xl bg-[#F4F6FA] dark:bg-[#0F141E] text-xs font-medium text-[#141926] dark:text-[#F1F5F9] hover:bg-[#E8EDF5] dark:hover:bg-[#1E293B] transition-colors cursor-pointer"
                      >
                        {isOpen ? (
                          <>
                            <ChevronUp className="w-3.5 h-3.5" />
                            {language === 'en' ? 'Show Less' : 'कम दिखाएं'}
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-3.5 h-3.5" />
                            {language === 'en' ? 'Read 60s Brief' : '60 सेकंड सारांश पढ़ें'}
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDownloadBrief(policy)}
                        className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 min-h-[42px] rounded-xl border border-[#DCE2EC] dark:border-[#242E42] text-xs font-medium text-[#2D4A8A] dark:text-[#7CA0F0] hover:bg-[#EEF2FA] dark:hover:bg-[#1E293B] transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        {UI_COPY.explore.downloadTxt[language]}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* TAB 2: Youth Innovation & Ground Stories */}
      {sectionTab === 'stories' && (
        <section className="space-y-5">
          <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter stories by category">
            <button
              type="button"
              aria-pressed={storyCategory === 'all'}
              onClick={() => setStoryCategory('all')}
              className={`px-3 py-1.5 min-h-[38px] rounded-lg text-xs font-medium border cursor-pointer ${
                storyCategory === 'all'
                  ? 'bg-[#2D4A8A] border-[#2D4A8A] text-white'
                  : 'bg-white dark:bg-[#161D2B] border-[#E5E9F0] dark:border-[#242E42] text-[#4B5568] dark:text-[#94A3B8]'
              }`}
            >
              {language === 'en' ? 'All Sectors' : 'सभी क्षेत्र'}
            </button>
            {storyCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                aria-pressed={storyCategory === cat}
                onClick={() => setStoryCategory(cat)}
                className={`px-3 py-1.5 min-h-[38px] rounded-lg text-xs font-medium border cursor-pointer ${
                  storyCategory === cat
                    ? 'bg-[#2D4A8A] border-[#2D4A8A] text-white'
                    : 'bg-white dark:bg-[#161D2B] border-[#E5E9F0] dark:border-[#242E42] text-[#4B5568] dark:text-[#94A3B8]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {visibleStories.map((story) => {
              const isOpen = expandedStoryIds.includes(story.id);
              return (
                <article
                  key={story.id}
                  className="flex flex-col justify-between rounded-2xl border border-[#E5E9F0] dark:border-[#242E42] bg-white dark:bg-[#161D2B] p-5 space-y-4"
                >
                  <div className="space-y-3">
                    <div className="text-xs text-[#6E788A] dark:text-[#94A3B8]">
                      <span className="font-medium text-[#2D4A8A] dark:text-[#7CA0F0]">
                        {story.category[language]}
                      </span>
                      <span aria-hidden="true"> · </span>
                      <span>{story.location[language]}</span>
                    </div>

                    <h2 className="text-base sm:text-lg font-semibold text-[#141926] dark:text-[#F1F5F9] leading-snug">
                      {story.title[language]}
                    </h2>

                    <div className="font-mono text-xs font-semibold text-[#2C7A6B] dark:text-[#55B8A5] tabular-nums">
                      {story.impactMetric[language]}
                    </div>

                    {isOpen && (
                      <div className="space-y-3 pt-1">
                        <p className="text-sm text-[#4B5568] dark:text-[#94A3B8] leading-relaxed">
                          {story.summary[language]}
                        </p>
                        <p className="text-xs text-[#6E788A] dark:text-[#94A3B8] pt-2 border-t border-[#EEF1F6] dark:border-[#1E293B]">
                          <span className="font-medium text-[#141926] dark:text-[#E2E8F0]">
                            {language === 'en' ? 'Replication: ' : 'विस्तार मॉडल: '}
                          </span>
                          {story.replicationNote[language]}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-[#EEF1F6] dark:border-[#1E293B] flex items-center justify-between gap-2">
                    <span className="text-xs text-[#6E788A] dark:text-[#94A3B8]">
                      {language === 'en' ? 'Verified Ground Pilot' : 'सत्यापित जमीनी पायलट'}
                    </span>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => toggleStory(story.id)}
                      className="inline-flex items-center gap-1 text-xs font-medium text-[#2D4A8A] dark:text-[#7CA0F0] hover:underline min-h-[36px] px-1 cursor-pointer"
                    >
                      {isOpen ? (
                        <>
                          <ChevronUp className="w-3.5 h-3.5" />
                          {language === 'en' ? 'Show Less' : 'कम दिखाएं'}
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-3.5 h-3.5" />
                          {language === 'en' ? 'Deep Dive' : 'विस्तार से पढ़ें'}
                        </>
                      )}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
