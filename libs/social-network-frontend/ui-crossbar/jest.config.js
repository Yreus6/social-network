module.exports = {
  displayName: 'social-network-frontend-ui-crossbar',
  preset: '../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory:
    '../../../coverage/libs/social-network-frontend/ui-crossbar',
  setupFilesAfterEnv: ['../utils-testing/src/lib/setupTests.ts'],
  reporters: ['default', ['jest-sonar', {
    outputDirectory: 'build/test-results/jest',
    outputName: 'social-network-frontend-ui-crossbar.xml',
    reportedFilePath: 'relative',
    relativeRootDir: '<rootDir>/../',
  }]]
};
