module.exports = api => ({
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: `.${api.env('development') ? 'development' : 'production'}.env`,
        allowUndefined: false
      }
    ],
    'react-native-reanimated/plugin'
  ]
});
