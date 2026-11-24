import React, { useEffect, useMemo, useState } from 'react';
import {
  Check,
  ChevronDown,
  ChevronUp,
  CloudUpload,
  Copy,
  Download,
  Flame,
  Plus,
  Trash2,
  X,
} from 'lucide-react';
import {
  NATIONAL_PILLARS,
  PLEDGE_COMMITMENTS,
  UI_COPY,
} from '../data/navyugData';
import {
  filterAndSortIdeas,
  formatCertificateDate,
  generateIdeasCsv,
  validateIdeaInput,
  validatePledgeInput,
} from '../utils/navyugLogic';
import { useNavyug } from '../context/NavyugContext';
import { LogoMark } from './LogoMark';

interface PledgeViewProps {
  preselectedPillar?: string;
  autoOpenIdeaForm?: boolean;
  onClearPreselect?: () => void;
}

const PILLAR_OPTIONS = NATIONAL_PILLARS.map((p) => `${p.hourLabel} · ${p.shortTitle.en}`);

function downloadTextFile(filename: string, content: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function renderCertificatePng(name: string, location: string, commitment: string, issuedDate: string) {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 800;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Background
  ctx.fillStyle = '#F8F9FB';
  ctx.fillRect(0, 0, 1200, 800);

  // Outer card frame
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(48, 48, 1104, 704);
  ctx.strokeStyle = '#2D4A8A';
  ctx.lineWidth = 4;
  ctx.strokeRect(48, 48, 1104, 704);

  // Inner sage hairline border
  ctx.strokeStyle = '#2C7A6B';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(66, 66, 1068, 668);

  // Header
  ctx.fillStyle = '#2D4A8A';
  ctx.font = '600 18px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('NAVYUG (THE NEXT ERA) · VIKSIT BHARAT 2047 CITIZEN PLEDGE', 600, 140);

  ctx.fillStyle = '#141926';
  ctx.font = '700 38px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('INDIA @ 100 CHANGEMAKER CERTIFICATE', 600, 200);

  ctx.fillStyle = '#6E788A';
  ctx.font = '400 20px "DM Sans", sans-serif';
  ctx.fillText('This certifies that citizen innovator', 600, 275);

  // Citizen Name
  ctx.fillStyle = '#2D4A8A';
  ctx.font = '700 46px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(name.toUpperCase(), 600, 345);

  // Location
  ctx.fillStyle = '#2C7A6B';
  ctx.font = '500 22px "DM Sans", sans-serif';
  ctx.fillText(location, 600, 392);

  // Wrapped Pledge text
  ctx.fillStyle = '#141926';
  ctx.font = '400 23px "DM Sans", sans-serif';
  const fullQuote = `"My 2047 Pledge: ${commitment}"`;
  const words = fullQuote.split(' ');
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width > 880 && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);

  lines.slice(0, 4).forEach((line, idx) => {
    ctx.fillText(line, 600, 475 + idx * 36);
  });

  // Footer hairline
  ctx.strokeStyle = '#E5E9F0';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(110, 645);
  ctx.lineTo(1090, 645);
  ctx.stroke();

  // Footer metadata
  ctx.font = '500 16px "JetBrains Mono", monospace';
  ctx.fillStyle = '#6E788A';
  ctx.textAlign = 'left';
  ctx.fillText(`ISSUED: ${issuedDate}`, 110, 688);
  ctx.textAlign = 'center';
  ctx.fillStyle = '#2C7A6B';
  ctx.fillText('TARGET: 15 AUGUST 2047', 600, 688);
  ctx.textAlign = 'right';
  ctx.fillStyle = '#2D4A8A';
  ctx.fillText('NAVYUG · THE NEXT ERA', 1090, 688);

  const link = document.createElement('a');
  link.download = `navyug-2047-pledge-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

export function PledgeView({
  preselectedPillar,
  autoOpenIdeaForm,
  onClearPreselect,
}: PledgeViewProps) {
  const {
    user,
    language,
    signInWithGoogle,
    savedPledges,
    savePledge,
    deletePledge,
    ideas,
    votedIdeaIds,
    submitPolicyIdea,
    toggleIdeaUpvote,
  } = useNavyug();

  // Pledge form state
  const [citizenName, setCitizenName] = useState('Yuva Changemaker');
  const [location, setLocation] = useState('Jaipur, Rajasthan');
  const [commitment, setCommitment] = useState(PLEDGE_COMMITMENTS[0].en);
  const [pledgeStatus, setPledgeStatus] = useState<{ type: 'ok' | 'error'; text: string } | null>(null);
  const [savingPledge, setSavingPledge] = useState(false);
  const [copiedPledge, setCopiedPledge] = useState(false);

  // Leaderboard state
  const [pillarFilter, setPillarFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'top' | 'newest'>('top');
  const [expandedIdeaIds, setExpandedIdeaIds] = useState<string[]>(['seed-1']);
  const [voteNotice, setVoteNotice] = useState<string | null>(null);

  // Submit Idea Drawer state
  const [showIdeaForm, setShowIdeaForm] = useState(Boolean(autoOpenIdeaForm));
  const [ideaAuthor, setIdeaAuthor] = useState('');
  const [ideaAge, setIdeaAge] = useState('22');
  const [ideaState, setIdeaState] = useState('');
  const [ideaPillar, setIdeaPillar] = useState(preselectedPillar || PILLAR_OPTIONS[0]);
  const [ideaPitch, setIdeaPitch] = useState('');
  const [ideaBlueprint, setIdeaBlueprint] = useState('');
  const [ideaError, setIdeaError] = useState<string | null>(null);
  const [ideaSuccess, setIdeaSuccess] = useState<string | null>(null);
  const [submittingIdea, setSubmittingIdea] = useState(false);

  useEffect(() => {
    if (user?.displayName) {
      setCitizenName((prev) => (prev === 'Yuva Changemaker' ? user.displayName || prev : prev));
      setIdeaAuthor((prev) => prev || user.displayName || '');
    }
  }, [user]);

  useEffect(() => {
    if (preselectedPillar) {
      setIdeaPillar(preselectedPillar);
    }
    if (autoOpenIdeaForm) {
      setShowIdeaForm(true);
      onClearPreselect?.();
    }
  }, [preselectedPillar, autoOpenIdeaForm, onClearPreselect]);

  const issuedDate = useMemo(() => formatCertificateDate(new Date()), []);
  const visibleIdeas = useMemo(
    () => filterAndSortIdeas(ideas, pillarFilter, sortBy),
    [ideas, pillarFilter, sortBy]
  );

  const handleSavePledge = async () => {
    setPledgeStatus(null);
    const err = validatePledgeInput({ citizenName, location, commitment });
    if (err) {
      setPledgeStatus({ type: 'error', text: err });
      return;
    }
    if (!user) {
      setPledgeStatus({
        type: 'error',
        text:
          language === 'en'
            ? 'Sign in with Google to save your pledge to your cloud profile, or download the PNG certificate directly.'
            : 'क्लाउड में प्रतिज्ञा सहेजने हेतु Google से साइन इन करें, या सीधे PNG डाउनलोड करें।',
      });
      return;
    }
    setSavingPledge(true);
    try {
      const res = await savePledge({ citizenName, location, commitment });
      if (res.ok) {
        setPledgeStatus({
          type: 'ok',
          text: language === 'en' ? 'Pledge saved to your NAVYUG account.' : 'आपकी प्रतिज्ञा सहेजी गई।',
        });
      } else if (res.error) {
        setPledgeStatus({ type: 'error', text: res.error });
      }
    } finally {
      setSavingPledge(false);
    }
  };

  const handleDownloadPng = () => {
    const err = validatePledgeInput({ citizenName, location, commitment });
    if (err) {
      setPledgeStatus({ type: 'error', text: err });
      return;
    }
    setPledgeStatus(null);
    renderCertificatePng(citizenName.trim(), location.trim(), commitment.trim(), issuedDate);
  };

  const handleCopyPledge = async () => {
    const text = `I just took the Viksit Bharat 2047 Pledge on NAVYUG as ${citizenName} (${location}): "${commitment}" — Target: 15 August 2047.`;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedPledge(true);
      window.setTimeout(() => setCopiedPledge(false), 2000);
    } catch {
      setPledgeStatus({ type: 'error', text: 'Clipboard copy is unavailable in this browser.' });
    }
  };

  const handleExportCsv = () => {
    const csv = generateIdeasCsv(visibleIdeas);
    downloadTextFile('navyug-2047-policy-ideas.csv', csv, 'text/csv;charset=utf-8;');
  };

  const handleToggleExpand = (id: string) => {
    setExpandedIdeaIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleUpvote = async (idea: (typeof visibleIdeas)[number]) => {
    setVoteNotice(null);
    const res = await toggleIdeaUpvote(idea);
    if (!res.ok && res.error) {
      setVoteNotice(res.error);
    }
  };

  const handleSubmitIdea = async (e: React.FormEvent) => {
    e.preventDefault();
    setIdeaError(null);
    setIdeaSuccess(null);

    const payload = {
      authorName: ideaAuthor,
      age: Number(ideaAge),
      state: ideaState,
      pillarCode: ideaPillar,
      pitch: ideaPitch,
      blueprint: ideaBlueprint,
    };

    const validationErr = validateIdeaInput(payload);
    if (validationErr) {
      setIdeaError(validationErr);
      return;
    }

    if (!user) {
      setIdeaError(
        language === 'en'
          ? 'Please sign in with Google first to publish your policy blueprint to the live leaderboard.'
          : 'लाइव लीडरबोर्ड में सुझाव प्रकाशित करने हेतु पहले Google से साइन इन करें।'
      );
      return;
    }

    setSubmittingIdea(true);
    try {
      const res = await submitPolicyIdea(payload);
      if (res.ok) {
        setIdeaPitch('');
        setIdeaBlueprint('');
        setIdeaSuccess(
          language === 'en'
            ? 'Your 2047 policy blueprint is now live on the leaderboard.'
            : 'आपका 2047 नीति सुझाव लीडरबोर्ड पर प्रकाशित हो गया है।'
        );
        setShowIdeaForm(false);
      } else if (res.error) {
        setIdeaError(res.error);
      }
    } finally {
      setSubmittingIdea(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="space-y-2 max-w-2xl">
        <p className="text-xs font-medium text-[#2D4A8A] dark:text-[#7CA0F0]">
          {UI_COPY.pledge.eyebrow[language]}
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#141926] dark:text-[#F1F5F9]">
          {UI_COPY.pledge.title[language]}
        </h1>
        <p className="text-sm sm:text-[15px] text-[#4B5568] dark:text-[#94A3B8] leading-relaxed">
          {UI_COPY.pledge.subtitle[language]}
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT: Digital Pledge Certificate Generator */}
        <section className="lg:col-span-5 rounded-2xl border border-[#E5E9F0] dark:border-[#242E42] bg-white dark:bg-[#161D2B] p-5 sm:p-6 space-y-5">
          <div className="space-y-1">
            <p className="text-xs font-medium text-[#2C7A6B] dark:text-[#55B8A5]">
              {language === 'en' ? 'Instant 10-Second Action' : 'तत्काल 10-सेकंड संकल्प'}
            </p>
            <h2 className="text-xl font-bold text-[#141926] dark:text-[#F1F5F9]">
              {language === 'en' ? 'Viksit Bharat Digital Pledge' : 'विकसित भारत डिजिटल प्रतिज्ञा'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1.5">
              <label
                htmlFor="pledge-name"
                className="block text-xs font-medium text-[#4B5568] dark:text-[#94A3B8]"
              >
                {language === 'en' ? 'Citizen Full Name' : 'नागरिक का पूरा नाम'}
              </label>
              <input
                id="pledge-name"
                type="text"
                maxLength={80}
                value={citizenName}
                onChange={(e) => setCitizenName(e.target.value)}
                className="w-full min-h-[44px] px-3.5 py-2 rounded-xl border border-[#DCE2EC] dark:border-[#242E42] bg-[#FAFBFD] dark:bg-[#0F141E] text-sm text-[#141926] dark:text-[#F1F5F9] focus:outline-none focus:border-[#2D4A8A]"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="pledge-location"
                className="block text-xs font-medium text-[#4B5568] dark:text-[#94A3B8]"
              >
                {language === 'en' ? 'City / State' : 'शहर / राज्य'}
              </label>
              <input
                id="pledge-location"
                type="text"
                maxLength={80}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full min-h-[44px] px-3.5 py-2 rounded-xl border border-[#DCE2EC] dark:border-[#242E42] bg-[#FAFBFD] dark:bg-[#0F141E] text-sm text-[#141926] dark:text-[#F1F5F9] focus:outline-none focus:border-[#2D4A8A]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="pledge-commitment"
              className="block text-xs font-medium text-[#4B5568] dark:text-[#94A3B8]"
            >
              {language === 'en' ? 'Select Core 2047 Commitment' : 'अपना मुख्य 2047 संकल्प चुनें'}
            </label>
            <select
              id="pledge-commitment"
              value={commitment}
              onChange={(e) => setCommitment(e.target.value)}
              className="w-full min-h-[44px] px-3.5 py-2 rounded-xl border border-[#DCE2EC] dark:border-[#242E42] bg-[#FAFBFD] dark:bg-[#0F141E] text-sm text-[#141926] dark:text-[#F1F5F9] focus:outline-none focus:border-[#2D4A8A]"
            >
              {PLEDGE_COMMITMENTS.map((item) => (
                <option key={item.en} value={item.en}>
                  {item[language]}
                </option>
              ))}
            </select>
          </div>

          {/* Live Certificate Preview */}
          <div
            className="rounded-xl border-2 border-[#2D4A8A]/70 dark:border-[#7CA0F0]/60 p-1.5 bg-[#FAFBFD] dark:bg-[#0F141E]"
            data-testid="pledge-certificate-preview"
          >
            <div className="rounded-lg border border-[#2C7A6B]/40 dark:border-[#55B8A5]/40 bg-white dark:bg-[#161D2B] p-4 sm:p-5 text-center space-y-3">
              <div className="flex items-center justify-center gap-2">
                <LogoMark className="w-6 h-6" />
                <span className="font-mono text-[10px] font-semibold tracking-wide text-[#2D4A8A] dark:text-[#7CA0F0]">
                  NAVYUG · VIKSIT BHARAT 2047 PLEDGE
                </span>
              </div>

              <h3 className="text-sm sm:text-base font-bold tracking-tight text-[#141926] dark:text-[#F1F5F9]">
                INDIA @ 100 CHANGEMAKER CERTIFICATE
              </h3>

              <p className="text-[11px] text-[#6E788A] dark:text-[#94A3B8]">
                This certifies that citizen innovator
              </p>

              <div className="space-y-0.5">
                <div className="text-lg sm:text-xl font-bold text-[#2D4A8A] dark:text-[#7CA0F0] break-words">
                  {(citizenName.trim() || 'YUVA CHANGEMAKER').toUpperCase()}
                </div>
                <div className="text-xs font-medium text-[#2C7A6B] dark:text-[#55B8A5]">
                  {location.trim() || 'India'}
                </div>
              </div>

              <p className="text-xs text-[#4B5568] dark:text-[#CBD5E1] leading-relaxed italic px-2">
                &ldquo;My 2047 Pledge: {commitment}&rdquo;
              </p>

              <div className="pt-3 border-t border-[#EEF1F6] dark:border-[#1E293B] flex items-center justify-between text-[10px] font-mono text-[#6E788A] dark:text-[#94A3B8] tabular-nums">
                <span>ISSUED: {issuedDate}</span>
                <span className="text-[#2C7A6B] dark:text-[#55B8A5]">TARGET: 15 AUG 2047</span>
              </div>
            </div>
          </div>

          {pledgeStatus && (
            <p
              role="status"
              className={`text-xs px-3 py-2.5 rounded-xl border ${
                pledgeStatus.type === 'ok'
                  ? 'bg-[#EDF6F4] dark:bg-[#132623] border-[#2C7A6B]/30 text-[#1D5C50] dark:text-[#7AD4C3]'
                  : 'bg-[#FEF2F2] dark:bg-[#2A1517] border-[#FCA5A5]/40 text-[#991B1B] dark:text-[#FCA5A5]'
              }`}
            >
              {pledgeStatus.text}
            </p>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={handleDownloadPng}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl bg-[#2D4A8A] text-white text-xs font-medium hover:bg-[#223A6E] transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              {UI_COPY.pledge.downloadPng[language]}
            </button>
            <button
              type="button"
              disabled={savingPledge}
              onClick={handleSavePledge}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl border border-[#DCE2EC] dark:border-[#242E42] bg-[#FAFBFD] dark:bg-[#0F141E] text-[#141926] dark:text-[#F1F5F9] text-xs font-medium hover:bg-[#EEF2FA] dark:hover:bg-[#1E293B] transition-colors disabled:opacity-50 cursor-pointer"
            >
              <CloudUpload className="w-4 h-4 text-[#2C7A6B] dark:text-[#55B8A5]" />
              {savingPledge ? 'Saving...' : UI_COPY.pledge.saveCloud[language]}
            </button>
          </div>

          <button
            type="button"
            onClick={handleCopyPledge}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl border border-[#E5E9F0] dark:border-[#242E42] text-xs font-medium text-[#4B5568] dark:text-[#94A3B8] hover:text-[#141926] dark:hover:text-white transition-colors cursor-pointer"
          >
            {copiedPledge ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#2C7A6B]" />
                {language === 'en' ? 'Pledge Copied to Clipboard' : 'संकल्प कॉपी किया गया'}
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                {language === 'en' ? 'Copy Shareable Pledge Text' : 'संकल्प टेक्स्ट कॉपी करें'}
              </>
            )}
          </button>

          {/* Saved Cloud Pledges for Signed-In Users */}
          {user && savedPledges.length > 0 && (
            <div className="pt-4 border-t border-[#EEF1F6] dark:border-[#1E293B] space-y-2.5">
              <h3 className="text-xs font-semibold text-[#141926] dark:text-[#F1F5F9]">
                {language === 'en'
                  ? `Your Saved Pledges (${savedPledges.length})`
                  : `आपकी सहेजी गई प्रतिज्ञाएं (${savedPledges.length})`}
              </h3>
              <div className="space-y-2">
                {savedPledges.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 rounded-xl bg-[#F8F9FB] dark:bg-[#0F141E] border border-[#EEF1F6] dark:border-[#1E293B] px-3.5 py-2.5"
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-medium text-[#141926] dark:text-[#F1F5F9] truncate">
                        {item.citizenName} · {item.location}
                      </div>
                      <div className="text-[11px] text-[#6E788A] dark:text-[#94A3B8] truncate">
                        {item.issuedDate} — {item.commitment}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => void deletePledge(item.id)}
                      aria-label={`Delete pledge for ${item.citizenName}`}
                      className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg text-[#6E788A] hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* RIGHT: Crowdsourced Policy Leaderboard */}
        <section className="lg:col-span-7 rounded-2xl border border-[#E5E9F0] dark:border-[#242E42] bg-white dark:bg-[#161D2B] p-5 sm:p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EEF1F6] dark:border-[#1E293B]">
            <div className="space-y-1">
              <p className="text-xs font-medium text-[#2C7A6B] dark:text-[#55B8A5]">
                {language === 'en'
                  ? `Crowdsourced Policy Leaderboard · ${visibleIdeas.length} Ideas Live`
                  : `समुदाय नीति लीडरबोर्ड · ${visibleIdeas.length} सक्रिय सुझाव`}
              </p>
              <h2 className="text-xl font-bold text-[#141926] dark:text-[#F1F5F9]">
                {language === 'en' ? 'Top Community-Voted Ideas' : 'शीर्ष समुदाय-समर्थित सुझाव'}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleExportCsv}
                className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[40px] rounded-xl border border-[#DCE2EC] dark:border-[#242E42] text-xs font-medium text-[#4B5568] dark:text-[#94A3B8] hover:text-[#141926] dark:hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                {UI_COPY.pledge.exportCsv[language]}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowIdeaForm((prev) => !prev);
                  setIdeaError(null);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] rounded-xl bg-[#2D4A8A] text-white text-xs font-medium hover:bg-[#223A6E] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {showIdeaForm ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                {showIdeaForm
                  ? language === 'en'
                    ? 'Close Form'
                    : 'बंद करें'
                  : UI_COPY.pledge.submitIdea[language]}
              </button>
            </div>
          </div>

          {/* Submit Policy Idea Form */}
          {showIdeaForm && (
            <form
              onSubmit={handleSubmitIdea}
              className="rounded-xl border border-[#DCE2EC] dark:border-[#2A374E] bg-[#F8F9FB] dark:bg-[#0F141E] p-4 sm:p-5 space-y-4"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-semibold text-[#141926] dark:text-[#F1F5F9]">
                  {language === 'en' ? 'Submit a 2047 Policy Blueprint' : '2047 नीति सुझाव जोड़ें'}
                </h3>
                {!user && (
                  <button
                    type="button"
                    onClick={() => void signInWithGoogle()}
                    className="text-xs font-medium text-[#2D4A8A] dark:text-[#7CA0F0] hover:underline cursor-pointer"
                  >
                    {language === 'en' ? 'Sign in with Google to publish' : 'प्रकाशन हेतु साइन इन करें'}
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label htmlFor="idea-author" className="text-xs text-[#4B5568] dark:text-[#94A3B8]">
                    {language === 'en' ? 'Your Name' : 'आपका नाम'}
                  </label>
                  <input
                    id="idea-author"
                    type="text"
                    maxLength={80}
                    placeholder="e.g. Kabir Sharma"
                    value={ideaAuthor}
                    onChange={(e) => setIdeaAuthor(e.target.value)}
                    className="w-full min-h-[42px] px-3 rounded-lg border border-[#DCE2EC] dark:border-[#242E42] bg-white dark:bg-[#161D2B] text-sm text-[#141926] dark:text-[#F1F5F9]"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="idea-age" className="text-xs text-[#4B5568] dark:text-[#94A3B8]">
                    {language === 'en' ? 'Age' : 'आयु'}
                  </label>
                  <input
                    id="idea-age"
                    type="number"
                    min={13}
                    max={100}
                    value={ideaAge}
                    onChange={(e) => setIdeaAge(e.target.value)}
                    className="w-full min-h-[42px] px-3 rounded-lg border border-[#DCE2EC] dark:border-[#242E42] bg-white dark:bg-[#161D2B] text-sm font-mono text-[#141926] dark:text-[#F1F5F9]"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="idea-state" className="text-xs text-[#4B5568] dark:text-[#94A3B8]">
                    {language === 'en' ? 'State / UT' : 'राज्य / केंद्रशासित'}
                  </label>
                  <input
                    id="idea-state"
                    type="text"
                    maxLength={60}
                    placeholder="e.g. Maharashtra"
                    value={ideaState}
                    onChange={(e) => setIdeaState(e.target.value)}
                    className="w-full min-h-[42px] px-3 rounded-lg border border-[#DCE2EC] dark:border-[#242E42] bg-white dark:bg-[#161D2B] text-sm text-[#141926] dark:text-[#F1F5F9]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="idea-pillar" className="text-xs text-[#4B5568] dark:text-[#94A3B8]">
                  {language === 'en' ? 'Target 12-Pillar Clock Sector' : '12-स्तंभ क्षेत्र चुनें'}
                </label>
                <select
                  id="idea-pillar"
                  value={ideaPillar}
                  onChange={(e) => setIdeaPillar(e.target.value)}
                  className="w-full min-h-[42px] px-3 rounded-lg border border-[#DCE2EC] dark:border-[#242E42] bg-white dark:bg-[#161D2B] text-sm text-[#141926] dark:text-[#F1F5F9]"
                >
                  {PILLAR_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label htmlFor="idea-pitch" className="text-xs text-[#4B5568] dark:text-[#94A3B8]">
                  {language === 'en' ? '2047 Solution Pitch (15–280 chars)' : '2047 समाधान सारांश (15–280 अक्षर)'}
                </label>
                <textarea
                  id="idea-pitch"
                  rows={2}
                  maxLength={280}
                  placeholder="Describe the concrete policy reform or grassroots innovation..."
                  value={ideaPitch}
                  onChange={(e) => setIdeaPitch(e.target.value)}
                  className="w-full p-3 rounded-lg border border-[#DCE2EC] dark:border-[#242E42] bg-white dark:bg-[#161D2B] text-sm text-[#141926] dark:text-[#F1F5F9]"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="idea-blueprint" className="text-xs text-[#4B5568] dark:text-[#94A3B8]">
                  {language === 'en' ? '3-Step Implementation Blueprint (15–600 chars)' : '3-चरणीय क्रियान्वयन योजना'}
                </label>
                <textarea
                  id="idea-blueprint"
                  rows={3}
                  maxLength={600}
                  placeholder="1. Pilot phase... 2. Funding/governance model... 3. 2047 scale metric..."
                  value={ideaBlueprint}
                  onChange={(e) => setIdeaBlueprint(e.target.value)}
                  className="w-full p-3 rounded-lg border border-[#DCE2EC] dark:border-[#242E42] bg-white dark:bg-[#161D2B] text-sm text-[#141926] dark:text-[#F1F5F9]"
                />
              </div>

              {ideaError && (
                <p role="alert" className="text-xs text-[#991B1B] dark:text-[#FCA5A5]">
                  {ideaError}
                </p>
              )}

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowIdeaForm(false)}
                  className="px-4 py-2 min-h-[40px] rounded-lg text-xs font-medium text-[#4B5568] dark:text-[#94A3B8] hover:text-[#141926] dark:hover:text-white cursor-pointer"
                >
                  {language === 'en' ? 'Cancel' : 'रद्द करें'}
                </button>
                <button
                  type="submit"
                  disabled={submittingIdea}
                  className="px-4 py-2 min-h-[40px] rounded-lg bg-[#2D4A8A] text-white text-xs font-medium hover:bg-[#223A6E] disabled:opacity-50 cursor-pointer"
                >
                  {submittingIdea
                    ? 'Publishing...'
                    : language === 'en'
                    ? 'Publish Policy Idea'
                    : 'सुझाव प्रकाशित करें'}
                </button>
              </div>
            </form>
          )}

          {ideaSuccess && (
            <p
              role="status"
              className="text-xs px-3 py-2.5 rounded-xl bg-[#EDF6F4] dark:bg-[#132623] border border-[#2C7A6B]/30 text-[#1D5C50] dark:text-[#7AD4C3]"
            >
              {ideaSuccess}
            </p>
          )}

          {voteNotice && (
            <p
              role="status"
              className="text-xs px-3 py-2.5 rounded-xl bg-[#EEF2FA] dark:bg-[#1E293B] text-[#2D4A8A] dark:text-[#7CA0F0]"
            >
              {voteNotice}
            </p>
          )}

          {/* Filter & Sort Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <select
              aria-label="Filter ideas by pillar"
              value={pillarFilter}
              onChange={(e) => setPillarFilter(e.target.value)}
              className="min-h-[40px] px-3 py-1.5 rounded-xl border border-[#DCE2EC] dark:border-[#242E42] bg-[#FAFBFD] dark:bg-[#0F141E] text-xs text-[#141926] dark:text-[#F1F5F9]"
            >
              <option value="all">{language === 'en' ? 'All 12 Pillars' : 'सभी 12 स्तंभ'}</option>
              {PILLAR_OPTIONS.map((opt) => (
                <option key={opt} value={opt.slice(0, 5)}>
                  {opt}
                </option>
              ))}
            </select>

            <div className="inline-flex items-center p-1 rounded-xl bg-[#F4F6FA] dark:bg-[#0F141E] border border-[#E5E9F0] dark:border-[#242E42]">
              <button
                type="button"
                aria-pressed={sortBy === 'top'}
                onClick={() => setSortBy('top')}
                className={`px-3 py-1.5 min-h-[34px] rounded-lg text-xs font-medium cursor-pointer ${
                  sortBy === 'top'
                    ? 'bg-white dark:bg-[#242E42] text-[#141926] dark:text-[#F1F5F9]'
                    : 'text-[#6E788A] dark:text-[#94A3B8]'
                }`}
              >
                {language === 'en' ? 'Top Voted' : 'शीर्ष वोट'}
              </button>
              <button
                type="button"
                aria-pressed={sortBy === 'newest'}
                onClick={() => setSortBy('newest')}
                className={`px-3 py-1.5 min-h-[34px] rounded-lg text-xs font-medium cursor-pointer ${
                  sortBy === 'newest'
                    ? 'bg-white dark:bg-[#242E42] text-[#141926] dark:text-[#F1F5F9]'
                    : 'text-[#6E788A] dark:text-[#94A3B8]'
                }`}
              >
                {language === 'en' ? 'Newest' : 'नवीनतम'}
              </button>
            </div>
          </div>

          {/* Ranked Ideas List */}
          {visibleIdeas.length === 0 ? (
            <div className="rounded-xl border border-[#EEF1F6] dark:border-[#1E293B] p-8 text-center text-sm text-[#6E788A] dark:text-[#94A3B8]">
              {language === 'en'
                ? 'No policy ideas for this pillar yet. Be the first to submit a blueprint.'
                : 'इस स्तंभ के लिए अभी कोई सुझाव नहीं है। पहला सुझाव जोड़ें।'}
            </div>
          ) : (
            <div className="space-y-3">
              {visibleIdeas.map((idea, index) => {
                const isExpanded = expandedIdeaIds.includes(idea.id);
                const hasVoted = votedIdeaIds.includes(idea.id);

                return (
                  <article
                    key={idea.id}
                    className="rounded-xl border border-[#EEF1F6] dark:border-[#1E293B] bg-[#FAFBFD] dark:bg-[#111723] p-4 sm:p-5 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs">
                          <span className="font-mono font-semibold text-[#2D4A8A] dark:text-[#7CA0F0]">
                            #{index + 1}
                          </span>
                          <span className="font-medium text-[#2C7A6B] dark:text-[#55B8A5]">
                            {idea.pillarCode}
                          </span>
                        </div>
                        <div className="text-xs text-[#6E788A] dark:text-[#94A3B8]">
                          {idea.authorName}, {idea.age} · {idea.state}
                        </div>
                      </div>

                      <button
                        type="button"
                        aria-pressed={hasVoted}
                        aria-label={`Upvote policy idea by ${idea.authorName}, current count ${idea.upvotesCount}`}
                        onClick={() => void handleUpvote(idea)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[40px] rounded-xl border font-mono text-xs font-semibold tabular-nums transition-colors shrink-0 cursor-pointer ${
                          hasVoted
                            ? 'bg-[#2D4A8A] border-[#2D4A8A] text-white'
                            : 'bg-white dark:bg-[#161D2B] border-[#DCE2EC] dark:border-[#242E42] text-[#141926] dark:text-[#F1F5F9] hover:border-[#2D4A8A]'
                        }`}
                      >
                        <Flame className="w-3.5 h-3.5" />
                        {idea.upvotesCount}
                      </button>
                    </div>

                    <p className="text-sm text-[#141926] dark:text-[#E2E8F0] leading-relaxed">
                      <span className="font-semibold text-[#2C7A6B] dark:text-[#55B8A5]">
                        2047 Pitch:{' '}
                      </span>
                      {idea.pitch}
                    </p>

                    <div className="pt-1">
                      <button
                        type="button"
                        aria-expanded={isExpanded}
                        onClick={() => handleToggleExpand(idea.id)}
                        className="inline-flex items-center gap-1 text-xs font-medium text-[#2D4A8A] dark:text-[#7CA0F0] hover:underline py-1 cursor-pointer"
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp className="w-3.5 h-3.5" />
                            {language === 'en' ? 'Hide 3-Step Blueprint' : 'योजना छिपाएं'}
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-3.5 h-3.5" />
                            {language === 'en' ? 'Deep Dive · 3-Step Blueprint' : 'विस्तृत 3-चरणीय योजना'}
                          </>
                        )}
                      </button>

                      {isExpanded && (
                        <p className="mt-2 pt-2.5 border-t border-[#E5E9F0] dark:border-[#242E42] text-xs sm:text-sm text-[#4B5568] dark:text-[#94A3B8] leading-relaxed">
                          {idea.blueprint}
                        </p>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
