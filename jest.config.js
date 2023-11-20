module.exports = {
  preset: 'react-native',
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
  },
  moduleDirectories: ['node_modules', '<rootDir>'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@react-native|react-native|@rneui/*)',
  ],
};
