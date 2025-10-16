module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      require.resolve('expo-router/babel'),
      [
        'module-resolver',
        {
          alias: {
            '@/components': './components',
            '@/context': './context',
            '@/hooks': './hooks',
            '@/lib': './lib',
            '@/modules': './modules',
            '@/theme': './theme'
          }
        }
      ]
    ]
  };
};
