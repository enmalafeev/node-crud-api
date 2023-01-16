import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  modulePaths: ['<rootDir>'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.[jt]s$': '$1'
  }
};

export default config;
