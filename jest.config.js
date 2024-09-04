require('dotenv').config({ path: './.env' });

module.exports = {
  testEnvironment: 'jest-fixed-jsdom',
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  setupFilesAfterEnv: ['<rootDir>/setup-tests.js'],
  moduleNameMapper: {
    '\\.(css)$': 'identity-obj-proxy',
    '@components/(.*)': '<rootDir>/src/components/$1',
    '@constants/(.*)': '<rootDir>/src/constants/$1',
    '@mocks/(.*)': '<rootDir>/src/mocks/$1',
    '@store/(.*)': '<rootDir>/src/store/$1',
    '@utils/(.*)': '<rootDir>/src/utils/$1',
  },
};
