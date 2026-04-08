// Yeh file as a temporary backend kaam karegi real API aane tak.
// Ismein hum metrics aur deep repository details mock karenge.

export interface RepoStats {
  commits: number;
  prCount: number;
  healthScore: number;
  stars: number;
  forks: number;
  lastUpdated: string;
}

export interface Repository {
  id: string;
  name: string;
  description: string;
  language: string;
  stats: RepoStats;
  commitData: { day: string; count: number }[];
  contributors: { name: string; avatar: string; impact: number; role: string }[];
  issues: { open: number; closed: number; priority: 'high' | 'medium' | 'low' };
}

// Global analytics ke liye kuch badhiya numbers
export const GLOBAL_STATS = {
  totalRepos: 12,
  totalStars: 428,
  totalForks: 86,
  productivity: 94, // Percentage score
  skillRadar: [
    { subject: 'Frontend', A: 120, fullMark: 150 },
    { subject: 'Backend', A: 98, fullMark: 150 },
    { subject: 'Security', A: 86, fullMark: 150 },
    { subject: 'DevOps', A: 110, fullMark: 150 },
    { subject: 'AI/ML', A: 75, fullMark: 150 },
  ]
};

// Yeh logic single repository ki "Everything Possible" details generate karta hai
export const MOCK_REPOSITORIES: Repository[] = [
  {
    id: '1',
    name: 'DevSignal',
    description: 'Intelligent developer growth engine with vibrant deep-space UI.',
    language: 'TypeScript',
    stats: {
      commits: 1240,
      prCount: 45,
      healthScore: 96,
      stars: 128,
      forks: 34,
      lastUpdated: '2h ago'
    },
    commitData: [
      { day: 'Mon', count: 12 }, { day: 'Tue', count: 18 }, { day: 'Wed', count: 8 },
      { day: 'Thu', count: 24 }, { day: 'Fri', count: 15 }, { day: 'Sat', count: 5 }, { day: 'Sun', count: 2 }
    ],
    contributors: [
      { name: 'Tarunya Kesharwani', avatar: 'https://github.com/TarunyaProgrammer.png', impact: 85, role: 'Lead' },
      { name: 'Antigravity AI', avatar: '', impact: 95, role: 'Architect' }
    ],
    issues: { open: 4, closed: 128, priority: 'medium' }
  },
  {
    id: '2',
    name: 'RepoPulse-Dashboard',
    description: 'High-performance real-time analysis dashboard for large orgs.',
    language: 'React',
    stats: {
      commits: 850,
      prCount: 22,
      healthScore: 82,
      stars: 45,
      forks: 12,
      lastUpdated: '5h ago'
    },
    commitData: [
      { day: 'Mon', count: 5 }, { day: 'Tue', count: 9 }, { day: 'Wed', count: 12 },
      { day: 'Thu', count: 6 }, { day: 'Fri', count: 18 }, { day: 'Sat', count: 22 }, { day: 'Sun', count: 10 }
    ],
    contributors: [
      { name: 'Abhra0404', avatar: '', impact: 65, role: 'Maintainer' }
    ],
    issues: { open: 12, closed: 56, priority: 'high' }
  }
];

// Activity Feed ke liye Hinglish detailed events
export const RECENT_ACTIVITY = [
  { id: 'act_1', type: 'commit', msg: 'Hinglish comments add kiye components mein', user: 'Antigravity', repo: 'DevSignal', time: '10m ago' },
  { id: 'act_2', type: 'pr', msg: 'Finalizing Dashboard Brain logic', user: 'Tarunya', repo: 'DevSignal', time: '1h ago' },
  { id: 'act_3', type: 'issue', msg: 'Z-index issue fixed for mobile nav', user: 'Siddhant', repo: 'RepoPulse', time: '3h ago' }
];
