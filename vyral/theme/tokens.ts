export const palette = {
  backgroundGradient: ['#000000', '#0B0E2A', '#3B2A78'],
  backgroundSecondary: ['rgba(13, 16, 46, 0.92)', 'rgba(11, 14, 42, 0.6)'],
  surface: 'rgba(13, 16, 46, 0.85)',
  surfaceSecondary: 'rgba(41, 27, 86, 0.7)',
  textPrimary: '#F5F3FF',
  textSecondary: '#C5C2FF',
  textMuted: 'rgba(197, 194, 255, 0.6)',
  glow: '#6D5BFE',
  accents: {
    kor: '#6D5BFE',
    stryke: '#D946EF',
    skrybe: '#8E7BFF',
    zone: '#4DE4FF',
    lyfe: '#6AF7C9',
    tree: '#5BFEB3',
    board: '#8A7BFF',
    shop: '#FF8FF5',
    vyra: '#78E5FF'
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
