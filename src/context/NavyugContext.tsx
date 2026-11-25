import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut, type User } from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  writeBatch,
  type Timestamp,
} from 'firebase/firestore';
import { auth, db, googleProvider, handleFirestoreError, OperationType } from '../lib/firebase';
import {
  SEED_POLICY_IDEAS,
  type Language,
  type PolicyIdeaItem,
} from '../data/navyugData';
import {
  formatCertificateDate,
  isEngagementLoading,
  validateIdeaInput,
  validatePledgeInput,
  type IdeaFormInput,
  type PledgeFormInput,
} from '../utils/navyugLogic';

export type ThemeMode = 'light' | 'dark';

export interface SavedPledge {
  id: string;
  userId: string;
  citizenName: string;
  location: string;
  commitment: string;
  issuedDate: string;
  createdAtMs: number;
}

interface NavyugContextValue {
  user: User | null;
  authReady: boolean;
  metricsLoading: boolean;
  authBusy: boolean;
  authError: string | null;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  savedPolicyIds: string[];
  toggleSavedPolicy: (policyId: string) => Promise<void>;
  savedPledges: SavedPledge[];
  localPledgeDownloads: number;
  recordPledgeDownload: () => void;
  savePledge: (input: PledgeFormInput) => Promise<{ ok: boolean; error?: string }>;
  deletePledge: (pledgeId: string) => Promise<void>;
  ideas: PolicyIdeaItem[];
  votedIdeaIds: string[];
  submitPolicyIdea: (input: IdeaFormInput) => Promise<{ ok: boolean; error?: string }>;
  toggleIdeaUpvote: (idea: PolicyIdeaItem) => Promise<{ ok: boolean; error?: string }>;
}

const NavyugContext = createContext<NavyugContextValue | null>(null);

function tsToMs(value: unknown): number {
  if (value && typeof value === 'object' && 'toMillis' in value && typeof (value as Timestamp).toMillis === 'function') {
    return (value as Timestamp).toMillis();
  }
  return Date.now();
}

export function NavyugProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [authBusy, setAuthBusy] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const [language, setLanguageState] = useState<Language>('en');
  const [theme, setThemeState] = useState<ThemeMode>('light');
  const [savedPolicyIds, setSavedPolicyIds] = useState<string[]>([]);

  const [savedPledges, setSavedPledges] = useState<SavedPledge[]>([]);
  const [localPledgeDownloads, setLocalPledgeDownloads] = useState<number>(0);
  const [cloudIdeas, setCloudIdeas] = useState<PolicyIdeaItem[]>([]);
  const [seedVoteDelta, setSeedVoteDelta] = useState<Record<string, number>>({});
  const [votedIdeaIds, setVotedIdeaIds] = useState<string[]>([]);

  const [profileLoaded, setProfileLoaded] = useState(false);
  const [pledgesLoaded, setPledgesLoaded] = useState(false);
  const [ideasLoaded, setIdeasLoaded] = useState(false);

  // Apply light/dark class on <html> (Light theme default)
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setProfileLoaded(false);
      setPledgesLoaded(false);
      setIdeasLoaded(false);
      setUser(firebaseUser);
      setAuthReady(true);
    });
    return () => unsub();
  }, []);

  // Load or bootstrap user profile preferences on sign-in
  useEffect(() => {
    if (!authReady || !user) {
      setSavedPledges([]);
      setCloudIdeas([]);
      return;
    }

    const userDocRef = doc(db, 'users', user.uid);
    let active = true;

    (async () => {
      try {
        const snap = await getDoc(userDocRef);
        if (!active) return;
        if (snap.exists()) {
          const data = snap.data();
          if (data.language === 'en' || data.language === 'hi') {
            setLanguageState(data.language);
          }
          if (data.theme === 'light' || data.theme === 'dark') {
            setThemeState(data.theme);
          }
          if (Array.isArray(data.savedPolicyIds)) {
            setSavedPolicyIds(
              data.savedPolicyIds.filter((id): id is string => typeof id === 'string').slice(0, 12)
            );
          }
        } else if (user.emailVerified) {
          const displayName = (user.displayName || user.email?.split('@')[0] || 'Citizen').slice(0, 100);
          await setDoc(userDocRef, {
            uid: user.uid,
            displayName,
            language: 'en',
            theme: 'light',
            savedPolicyIds: [],
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        }
      } catch (error) {
        console.warn('Could not sync user profile:', error);
      } finally {
        if (active) {
          setProfileLoaded(true);
        }
      }
    })();

    return () => {
      active = false;
    };
  }, [authReady, user]);

  // Subscribe to user's own saved pledges
  useEffect(() => {
    if (!authReady || !user) return;
    const path = 'pledges';
    const q = query(collection(db, path), where('userId', '==', user.uid));
    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const list: SavedPledge[] = snapshot.docs
          .map((d) => {
            const data = d.data();
            return {
              id: d.id,
              userId: String(data.userId || ''),
              citizenName: String(data.citizenName || ''),
              location: String(data.location || ''),
              commitment: String(data.commitment || ''),
              issuedDate: String(data.issuedDate || ''),
              createdAtMs: tsToMs(data.createdAt),
            };
          })
          .sort((a, b) => b.createdAtMs - a.createdAtMs);
        setSavedPledges(list);
        setPledgesLoaded(true);
      },
      (error) => {
        setPledgesLoaded(true);
        handleFirestoreError(error, OperationType.LIST, path);
      }
    );
    return () => unsub();
  }, [authReady, user]);

  // Subscribe to public community policy ideas when authenticated
  useEffect(() => {
    if (!authReady || !user) return;
    let active = true;
    const path = 'ideas';
    const q = query(collection(db, path), where('visibility', '==', 'public'));
    const unsub = onSnapshot(
      q,
      async (snapshot) => {
        const list: PolicyIdeaItem[] = snapshot.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            authorId: String(data.authorId || ''),
            authorName: String(data.authorName || ''),
            age: Number(data.age || 22),
            state: String(data.state || ''),
            pillarCode: String(data.pillarCode || ''),
            pitch: String(data.pitch || ''),
            blueprint: String(data.blueprint || ''),
            upvotesCount: Number(data.upvotesCount || 0),
            visibility: 'public',
            createdAtMs: tsToMs(data.createdAt),
          };
        });
        if (!active) return;
        setCloudIdeas(list);

        // Check which cloud ideas this user already voted on
        try {
          const voteChecks = await Promise.all(
            list.map(async (idea) => {
              const voteSnap = await getDoc(doc(db, 'ideas', idea.id, 'votes', user.uid));
              return voteSnap.exists() ? idea.id : null;
            })
          );
          if (!active) return;
          const cloudVoted = voteChecks.filter((id): id is string => Boolean(id));
          setVotedIdeaIds((prev) => {
            const seedOnly = prev.filter((id) => id.startsWith('seed-'));
            return Array.from(new Set([...seedOnly, ...cloudVoted]));
          });
        } catch (err) {
          console.warn('Could not verify user votes:', err);
        } finally {
          if (active) {
            setIdeasLoaded(true);
          }
        }
      },
      (error) => {
        if (active) {
          setIdeasLoaded(true);
        }
        handleFirestoreError(error, OperationType.LIST, path);
      }
    );
    return () => {
      active = false;
      unsub();
    };
  }, [authReady, user]);

  const syncUserPrefs = useCallback(
    async (patch: Partial<{ language: Language; theme: ThemeMode; savedPolicyIds: string[] }>) => {
      if (!user || !user.emailVerified) return;
      const path = `users/${user.uid}`;
      try {
        await updateDoc(doc(db, 'users', user.uid), {
          ...patch,
          updatedAt: serverTimestamp(),
        });
      } catch (error) {
        // Fallback if profile doc not created yet
        try {
          const displayName = (user.displayName || user.email?.split('@')[0] || 'Citizen').slice(0, 100);
          await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            displayName,
            language: patch.language ?? language,
            theme: patch.theme ?? theme,
            savedPolicyIds: (patch.savedPolicyIds ?? savedPolicyIds).slice(0, 12),
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        } catch (nestedErr) {
          handleFirestoreError(nestedErr, OperationType.WRITE, path);
        }
      }
    },
    [user, language, theme, savedPolicyIds]
  );

  const setLanguage = useCallback(
    (lang: Language) => {
      setLanguageState(lang);
      void syncUserPrefs({ language: lang });
    },
    [syncUserPrefs]
  );

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  }, [language, setLanguage]);

  const setTheme = useCallback(
    (mode: ThemeMode) => {
      setThemeState(mode);
      void syncUserPrefs({ theme: mode });
    },
    [syncUserPrefs]
  );

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [theme, setTheme]);

  const toggleSavedPolicy = useCallback(
    async (policyId: string) => {
      const next = savedPolicyIds.includes(policyId)
        ? savedPolicyIds.filter((id) => id !== policyId)
        : [...savedPolicyIds, policyId].slice(0, 12);
      setSavedPolicyIds(next);
      await syncUserPrefs({ savedPolicyIds: next });
    },
    [savedPolicyIds, syncUserPrefs]
  );

  const signInWithGoogle = useCallback(async () => {
    setAuthBusy(true);
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Unable to sign in right now.';
      if (!msg.includes('popup-closed-by-user')) {
        setAuthError('Sign-in was cancelled or blocked by the browser.');
      }
    } finally {
      setAuthBusy(false);
    }
  }, []);

  const signOutUser = useCallback(async () => {
    setAuthBusy(true);
    setAuthError(null);
    try {
      await signOut(auth);
    } finally {
      setAuthBusy(false);
    }
  }, []);

  const recordPledgeDownload = useCallback(() => {
    setLocalPledgeDownloads((prev) => prev + 1);
  }, []);

  const savePledge = useCallback(
    async (input: PledgeFormInput): Promise<{ ok: boolean; error?: string }> => {
      const validationError = validatePledgeInput(input);
      if (validationError) return { ok: false, error: validationError };
      if (!user) {
        return { ok: false, error: 'Please sign in with Google to save your pledge to your account.' };
      }

      const pledgeId = `pledge_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      const path = `pledges/${pledgeId}`;
      try {
        await setDoc(doc(db, 'pledges', pledgeId), {
          userId: user.uid,
          citizenName: input.citizenName.trim().slice(0, 80),
          location: input.location.trim().slice(0, 80),
          commitment: input.commitment.trim().slice(0, 240),
          issuedDate: formatCertificateDate(new Date()),
          createdAt: serverTimestamp(),
        });
        return { ok: true };
      } catch (error) {
        handleFirestoreError(error, OperationType.CREATE, path);
      }
    },
    [user]
  );

  const deletePledge = useCallback(
    async (pledgeId: string) => {
      if (!user) return;
      const path = `pledges/${pledgeId}`;
      try {
        await deleteDoc(doc(db, 'pledges', pledgeId));
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, path);
      }
    },
    [user]
  );

  const submitPolicyIdea = useCallback(
    async (input: IdeaFormInput): Promise<{ ok: boolean; error?: string }> => {
      const validationError = validateIdeaInput(input);
      if (validationError) return { ok: false, error: validationError };
      if (!user) {
        return { ok: false, error: 'Please sign in with Google to publish a community policy idea.' };
      }

      const ideaId = `idea_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      const path = `ideas/${ideaId}`;
      try {
        await setDoc(doc(db, 'ideas', ideaId), {
          authorId: user.uid,
          authorName: input.authorName.trim().slice(0, 80),
          age: Math.round(input.age),
          state: input.state.trim().slice(0, 60),
          pillarCode: input.pillarCode.trim().slice(0, 60),
          pitch: input.pitch.trim().slice(0, 280),
          blueprint: input.blueprint.trim().slice(0, 600),
          upvotesCount: 0,
          visibility: 'public',
          createdAt: serverTimestamp(),
        });
        return { ok: true };
      } catch (error) {
        handleFirestoreError(error, OperationType.CREATE, path);
      }
    },
    [user]
  );

  const toggleIdeaUpvote = useCallback(
    async (idea: PolicyIdeaItem): Promise<{ ok: boolean; error?: string }> => {
      const alreadyVoted = votedIdeaIds.includes(idea.id);

      // Seed ideas toggle cleanly in session state for instant interactive testing
      if (idea.isSeed) {
        setVotedIdeaIds((prev) =>
          alreadyVoted ? prev.filter((id) => id !== idea.id) : [...prev, idea.id]
        );
        setSeedVoteDelta((prev) => ({
          ...prev,
          [idea.id]: alreadyVoted ? 0 : 1,
        }));
        return { ok: true };
      }

      if (!user) {
        return { ok: false, error: 'Sign in with Google to upvote community submissions.' };
      }

      const ideaRef = doc(db, 'ideas', idea.id);
      const voteRef = doc(db, 'ideas', idea.id, 'votes', user.uid);
      const path = `ideas/${idea.id}/votes/${user.uid}`;

      try {
        const batch = writeBatch(db);
        if (alreadyVoted) {
          batch.delete(voteRef);
          batch.update(ideaRef, { upvotesCount: Math.max(0, idea.upvotesCount - 1) });
          await batch.commit();
          setVotedIdeaIds((prev) => prev.filter((id) => id !== idea.id));
        } else {
          batch.set(voteRef, {
            userId: user.uid,
            ideaId: idea.id,
            createdAt: serverTimestamp(),
          });
          batch.update(ideaRef, { upvotesCount: idea.upvotesCount + 1 });
          await batch.commit();
          setVotedIdeaIds((prev) => Array.from(new Set([...prev, idea.id])));
        }
        return { ok: true };
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, path);
      }
    },
    [user, votedIdeaIds]
  );

  const ideas = useMemo<PolicyIdeaItem[]>(() => {
    const adjustedSeeds = SEED_POLICY_IDEAS.map((seed) => ({
      ...seed,
      upvotesCount: seed.upvotesCount + (seedVoteDelta[seed.id] ?? 0),
    }));
    return [...cloudIdeas, ...adjustedSeeds];
  }, [cloudIdeas, seedVoteDelta]);

  const metricsLoading = useMemo(
    () =>
      isEngagementLoading({
        authReady,
        isSignedIn: Boolean(user),
        profileLoaded,
        pledgesLoaded,
        ideasLoaded,
      }),
    [authReady, user, profileLoaded, pledgesLoaded, ideasLoaded]
  );

  const value = useMemo<NavyugContextValue>(
    () => ({
      user,
      authReady,
      metricsLoading,
      authBusy,
      authError,
      signInWithGoogle,
      signOutUser,
      language,
      setLanguage,
      toggleLanguage,
      theme,
      setTheme,
      toggleTheme,
      savedPolicyIds,
      toggleSavedPolicy,
      savedPledges,
      localPledgeDownloads,
      recordPledgeDownload,
      savePledge,
      deletePledge,
      ideas,
      votedIdeaIds,
      submitPolicyIdea,
      toggleIdeaUpvote,
    }),
    [
      user,
      authReady,
      metricsLoading,
      authBusy,
      authError,
      signInWithGoogle,
      signOutUser,
      language,
      setLanguage,
      toggleLanguage,
      theme,
      setTheme,
      toggleTheme,
      savedPolicyIds,
      toggleSavedPolicy,
      savedPledges,
      localPledgeDownloads,
      recordPledgeDownload,
      savePledge,
      deletePledge,
      ideas,
      votedIdeaIds,
      submitPolicyIdea,
      toggleIdeaUpvote,
    ]
  );

  return <NavyugContext.Provider value={value}>{children}</NavyugContext.Provider>;
}

export function useNavyug() {
  const ctx = useContext(NavyugContext);
  if (!ctx) throw new Error('useNavyug must be used within NavyugProvider');
  return ctx;
}
