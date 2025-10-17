export const palette = {
  backgroundGradient: ['#0f172a', '#1e293b', '#312e81'],
  surface: '#111827',
  textPrimary: '#f8fafc',
  textSecondary: '#cbd5f5',
  accents: {
    board: '#60a5fa',
    lyfe: '#f472b6',
    kor: '#34d399',
    zone: '#facc15',
    shop: '#f97316',
    skrybe: '#a855f7',
    stryke: '#fb7185',
    tree: '#4ade80',
    vyra: '#22d3ee',
    pulse: '#0ea5e9',
    studio: '#e879f9',
    spotlight: '#f59e0b',
    moneymoves: '#10b981',
    lifelab: '#6366f1'
  }
};

export const typography = {
  heading: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: palette.textPrimary
  },
  body: {
    fontSize: 16,
    color: palette.textSecondary
  }
};
