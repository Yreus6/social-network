module.exports = {
  displayName: 'social-network-frontend-data-access-user',
  preset: '../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory:
    '../../../coverage/libs/social-network-frontend/data-access-user',
  setupFilesAfterEnv: ['../utils-testing/src/lib/setupTests.ts'],
  reporters: ['default', ['jest-sonar', {
    outputDirectory: 'build/test-results/jest',
    outputName: 'social-network-frontend-data-access-user.xml',
    reportedFilePath: 'relative',
    relativeRootDir: '<rootDir>/../',
  }]]
};
