module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: [
    'controllers/**/*.ts',
    'models/**/*.ts',
    'data/**/*.ts',
    '!**/*.test.ts',
  ],
  coverageDirectory: 'coverage',
};
