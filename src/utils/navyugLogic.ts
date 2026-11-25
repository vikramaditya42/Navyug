import type { Language, PolicyBrief, PolicyIdeaItem } from '../data/navyugData';

export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

export function calculateCountdown(nowMs: number, targetMs: number): CountdownParts {
  const diff = Math.max(0, targetMs - nowMs);
  if (diff === 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true };
  }
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds, isComplete: false };
}

export function getIndicatorProgress(value: number, target: number): number {
  if (target <= 0 || value <= 0) return 0;
  const pct = (value / target) * 100;
  return Math.min(100, Math.round(pct * 10) / 10);
}

export function filterAndSortIdeas(
  ideas: PolicyIdeaItem[],
  pillarFilter: string,
  sortBy: 'top' | 'newest'
): PolicyIdeaItem[] {
  const filtered =
    pillarFilter === 'all'
      ? [...ideas]
      : ideas.filter((item) => item.pillarCode.toLowerCase().includes(pillarFilter.toLowerCase()));

  return filtered.sort((a, b) => {
    if (sortBy === 'newest') {
      return b.createdAtMs - a.createdAtMs;
    }
    if (b.upvotesCount !== a.upvotesCount) {
      return b.upvotesCount - a.upvotesCount;
    }
    return b.createdAtMs - a.createdAtMs;
  });
}

function escapeCsvCell(value: string | number): string {
  const raw = String(value);
  if (raw.includes(',') || raw.includes('"') || raw.includes('\n')) {
    return `"${raw.replace(/"/g, '""')}"`;
  }
  return raw;
}

export function generateIdeasCsv(ideas: PolicyIdeaItem[]): string {
  const headers = ['Rank', 'Pillar', 'Author', 'Age', 'State', 'Upvotes', '2047 Pitch', '3-Step Blueprint'];
  const rows = ideas.map((idea, index) => [
    index + 1,
    idea.pillarCode,
    idea.authorName,
    idea.age,
    idea.state,
    idea.upvotesCount,
    idea.pitch,
    idea.blueprint,
  ]);
  return [headers, ...rows].map((row) => row.map(escapeCsvCell).join(',')).join('\n');
}

export function generatePolicyBriefText(policy: PolicyBrief, lang: Language): string {
  const lines = [
    'NAVYUG — VIKSIT BHARAT 2047 | 60-SECOND POLICY BRIEF',
    '====================================================',
    `Mission: ${policy.title[lang]}`,
    `Sector: ${policy.category[lang]} (${policy.subtitle[lang]})`,
    '',
    `2047 Impact Pitch: ${policy.impactPitch[lang]}`,
    '',
    '60-Second Summary:',
    policy.summary60s[lang],
    '',
    'Key Deliverables:',
    ...policy.keyDeliverables.map((item, idx) => `${idx + 1}. ${item[lang]}`),
    '',
    `Official Source: ${policy.officialPortal}`,
  ];
  return lines.join('\n');
}

export interface PledgeFormInput {
  citizenName: string;
  location: string;
  commitment: string;
}

export function validatePledgeInput(input: PledgeFormInput): string | null {
  const name = input.citizenName.trim();
  const location = input.location.trim();
  const commitment = input.commitment.trim();

  if (name.length < 2 || name.length > 80) {
    return 'Citizen full name must be between 2 and 80 characters.';
  }
  if (location.length < 2 || location.length > 80) {
    return 'City / State must be between 2 and 80 characters.';
  }
  if (commitment.length < 10 || commitment.length > 240) {
    return 'Commitment must be between 10 and 240 characters.';
  }
  return null;
}

export interface IdeaFormInput {
  authorName: string;
  age: number;
  state: string;
  pillarCode: string;
  pitch: string;
  blueprint: string;
}

export function validateIdeaInput(input: IdeaFormInput): string | null {
  const authorName = input.authorName.trim();
  const state = input.state.trim();
  const pillarCode = input.pillarCode.trim();
  const pitch = input.pitch.trim();
  const blueprint = input.blueprint.trim();

  if (authorName.length < 2 || authorName.length > 80) {
    return 'Author name must be between 2 and 80 characters.';
  }
  if (!Number.isFinite(input.age) || input.age < 13 || input.age > 100) {
    return 'Age must be a valid number between 13 and 100.';
  }
  if (state.length < 2 || state.length > 60) {
    return 'State must be between 2 and 60 characters.';
  }
  if (pillarCode.length < 4 || pillarCode.length > 60) {
    return 'Please select a valid 12-pillar category.';
  }
  if (pitch.length < 15 || pitch.length > 280) {
    return 'Solution pitch must be between 15 and 280 characters.';
  }
  if (blueprint.length < 15 || blueprint.length > 600) {
    return '3-step blueprint must be between 15 and 600 characters.';
  }
  return null;
}

export function formatCertificateDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export interface CivicEngagementInput {
  pledgesCount: number;
  savedPoliciesCount: number;
  totalPolicies: number;
  votesCastCount: number;
  authoredIdeasCount: number;
  isSignedIn: boolean;
}

export interface CivicMilestoneItem {
  id: 'pledge' | 'policies' | 'votes' | 'ideas';
  labelEn: string;
  labelHi: string;
  current: number;
  target: number;
  percent: number;
  color: string;
}

export interface CivicProgressSummary {
  overallPercent: number;
  completedMilestones: number;
  totalMilestones: number;
  milestones: CivicMilestoneItem[];
}

export function computeCivicProgress(input: CivicEngagementInput): CivicProgressSummary {
  const pledgePct = Math.min(100, input.pledgesCount > 0 ? 100 : 0);
  const policyTarget = Math.max(1, Math.min(3, input.totalPolicies));
  const policyPct = Math.min(100, Math.round((input.savedPoliciesCount / policyTarget) * 100));
  const voteTarget = 3;
  const votePct = Math.min(100, Math.round((input.votesCastCount / voteTarget) * 100));
  const ideaTarget = 1;
  const ideaPct = Math.min(100, Math.round((input.authoredIdeasCount / ideaTarget) * 100));

  const milestones: CivicMilestoneItem[] = [
    {
      id: 'pledge',
      labelEn: '2047 Pledge',
      labelHi: '2047 प्रतिज्ञा',
      current: input.pledgesCount,
      target: 1,
      percent: pledgePct,
      color: '#2D4A8A',
    },
    {
      id: 'policies',
      labelEn: 'Policy Briefs',
      labelHi: 'नीति सारांश',
      current: input.savedPoliciesCount,
      target: policyTarget,
      percent: policyPct,
      color: '#2C7A6B',
    },
    {
      id: 'votes',
      labelEn: 'Civic Votes',
      labelHi: 'नागरिक वोट',
      current: input.votesCastCount,
      target: voteTarget,
      percent: votePct,
      color: '#6366A8',
    },
    {
      id: 'ideas',
      labelEn: 'Blueprints',
      labelHi: 'नीति सुझाव',
      current: input.authoredIdeasCount,
      target: ideaTarget,
      percent: ideaPct,
      color: '#4F6D7A',
    },
  ];

  // Weighted score: Pledge 35%, Policies 25%, Votes 20%, Blueprints 20%
  const weighted = Math.round(
    pledgePct * 0.35 + policyPct * 0.25 + votePct * 0.2 + ideaPct * 0.2
  );
  const completedMilestones = milestones.filter((m) => m.percent >= 100).length;

  return {
    overallPercent: Math.min(100, Math.max(0, weighted)),
    completedMilestones,
    totalMilestones: milestones.length,
    milestones,
  };
}

export interface EngagementLoadingState {
  authReady: boolean;
  isSignedIn: boolean;
  profileLoaded: boolean;
  pledgesLoaded: boolean;
  ideasLoaded: boolean;
}

export function isEngagementLoading(state: EngagementLoadingState): boolean {
  if (!state.authReady) return true;
  if (!state.isSignedIn) return false;
  return !(state.profileLoaded && state.pledgesLoaded && state.ideasLoaded);
}

