import type { Config } from 'jest';

const config: Config = {
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/$1',
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  collectCoverageFrom: [
    '**/*.{controller,service}.ts',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
};

export default config;
