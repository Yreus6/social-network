module.exports = {
  displayName: 'social-network-frontend-feature-auth',
  preset: '../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory:
    '../../../coverage/libs/social-network-frontend/feature-auth',
  reporters: ['default', ['jest-sonar', {
    outputDirectory: 'build/test-results/jest',
    outputName: 'social-network-frontend-feature-auth.xml',
    reportedFilePath: 'relative',
    relativeRootDir: '<rootDir>/../',
  }]]
};
