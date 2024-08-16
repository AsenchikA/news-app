module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setup-tests.js'],
  moduleNameMapper: {
    '\\.(css)$': 'identity-obj-proxy',
  },
};
