export type Achievement = {
  id: number;
  title: string;
  category: string;
  description: string;
  icon: string;
  accent: string;
  xp: number;
  unlocked: boolean;
};

export const achievements: Achievement[] = [
  { id: 1, title: 'First Steps', category: 'Onboarding & First Steps', description: 'Complete account setup, profile verification, and your first lesson module.', icon: '🚀', accent: '#45c878', xp: 50, unlocked: true },
  { id: 2, title: 'Cadet Scholar', category: 'Onboarding & First Steps', description: 'Complete 5 foundational Grade 1–3 modules.', icon: '🛸', accent: '#bd7a4e', xp: 100, unlocked: false },
  { id: 3, title: 'Streak Master', category: 'Daily Streaks & Planning', description: 'Maintain a 7-day daily study streak.', icon: '🔥', accent: '#e5a52f', xp: 150, unlocked: false },
  { id: 4, title: 'Time Explorer', category: 'Daily Streaks & Planning', description: 'Log 10 completed study sessions using the planner.', icon: '⏱️', accent: '#48aee9', xp: 150, unlocked: false },
  { id: 5, title: 'Daily Challenger', category: 'Daily Streaks & Planning', description: 'Finish 5 Daily Challenges with a score of 70% or higher.', icon: '🏆', accent: '#f1cb46', xp: 100, unlocked: false },
  { id: 6, title: 'Perfect Accuracy', category: 'Quiz & Mini-Game Achievements', description: 'Finish any quiz or mini-game with 100% accuracy.', icon: '🎯', accent: '#f1d05a', xp: 200, unlocked: false },
  { id: 7, title: 'Mini-Game Master', category: 'Quiz & Mini-Game Achievements', description: 'Play and pass 10 interactive mini-games.', icon: '🎮', accent: '#8f76ff', xp: 250, unlocked: false },
  { id: 8, title: 'Speed Demon', category: 'Quiz & Mini-Game Achievements', description: 'Complete a quiz round in under 15 seconds with a passing score.', icon: '⚡', accent: '#f3c637', xp: 200, unlocked: false },
  { id: 9, title: 'Junior Scientist', category: 'Grade Progression & Leveling Up', description: 'Pass your first Grade 4–6 Fractions, Geometry, or Life Sciences module.', icon: '⚛️', accent: '#4ac7e9', xp: 300, unlocked: false },
  { id: 10, title: 'Scholar Elite', category: 'Grade Progression & Leveling Up', description: 'Collect enough XP to reach Level 10.', icon: '👑', accent: '#c9d1e5', xp: 500, unlocked: false },
  { id: 11, title: 'Gold Scholar', category: 'Grade Progression & Leveling Up', description: 'Reach Level 20 or top the weekly Elementary Leaderboard.', icon: '🥇', accent: '#f2c340', xp: 750, unlocked: false },
  { id: 12, title: 'Master Explorer', category: 'Grade Progression & Leveling Up', description: 'Complete 50 total lesson modules across math, science, and vocabulary.', icon: '🔭', accent: '#f0c34c', xp: 1000, unlocked: false },
];

export const currentProgress = { xp: 0, level: 1, nextLevelXp: 200, lessons: 0, streak: 0 };
