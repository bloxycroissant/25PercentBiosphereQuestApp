import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react';

export type StudySession = { id: number; day: string; title: string; time: string; done: boolean };
type Progress = { xp: number; level: number; nextLevelXp: number; lessons: number; studyMinutes: number; streak: number; gamesPassed: number; leaderboardXp: number; sessions: StudySession[] };
type ProgressContextValue = Progress & { addXp: (amount: number) => void; completeLesson: (minutes: number) => void; completeGame: (amount: number) => void; addSession: (session: Omit<StudySession, 'id' | 'done'>) => void; updateSession: (id: number, changes: Partial<StudySession>) => void };

const ProgressContext = createContext<ProgressContextValue | null>(null);
const initialProgress: Progress = { xp: 120, level: 2, nextLevelXp: 200, lessons: 1, studyMinutes: 18, streak: 0, gamesPassed: 0, leaderboardXp: 0, sessions: [{ id: 1, day: 'Monday', title: 'Review for Measurements', time: '09:00AM · 45 mins', done: true }, { id: 2, day: 'Tuesday', title: 'Review for Decimals', time: '02:00PM · 30 mins', done: false }] };

export function ProgressProvider({ children }: PropsWithChildren) {
  const [progress, setProgress] = useState(initialProgress);
  const addXp = (amount: number) => setProgress((current) => { const xp = current.xp + amount; const level = Math.floor(xp / 100) + 1; return { ...current, xp, level, nextLevelXp: level * 100 }; });
  const completeLesson = (minutes: number) => { addXp(40); setProgress((current) => ({ ...current, lessons: current.lessons + 1, studyMinutes: current.studyMinutes + minutes })); };
  const completeGame = (amount: number) => { addXp(amount); setProgress((current) => ({ ...current, gamesPassed: current.gamesPassed + 1, leaderboardXp: current.leaderboardXp + amount })); };
  const addSession = (session: Omit<StudySession, 'id' | 'done'>) => setProgress((current) => ({ ...current, sessions: [...current.sessions, { ...session, id: Date.now(), done: false }] }));
  const updateSession = (id: number, changes: Partial<StudySession>) => setProgress((current) => ({ ...current, sessions: current.sessions.map((session) => session.id === id ? { ...session, ...changes } : session) }));
  const value = useMemo(() => ({ ...progress, addXp, completeLesson, completeGame, addSession, updateSession }), [progress]);
  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() { const value = useContext(ProgressContext); if (!value) throw new Error('useProgress must be used inside ProgressProvider'); return value; }
