module.exports = {
  displayName: 'social-network-frontend-components-routes',
  preset: '../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory:
    '../../../coverage/libs/social-network-frontend/components-routes',
  setupFilesAfterEnv: ['../utils-testing/src/lib/setupTests.ts']
};
