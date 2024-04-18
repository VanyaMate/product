import type { Config } from '@jest/types';


const config: Config.InitialOptions = {
    verbose                   : true,
    clearMocks                : true,
    coverageDirectory         : 'coverage',
    coveragePathIgnorePatterns: [
        'node_modules',
    ],
    moduleFileExtensions      : [
        'js',
        'mjs',
        'cjs',
        'jsx',
        'ts',
        'tsx',
        'json',
        'node',
    ],
    moduleDirectories         : [
        'node_modules',
    ],
    modulePaths               : [
        '<rootDir>src',
    ],
    moduleNameMapper          : {
        '^@/(.*)$'                    : '<rootDir>/src/$1',
        '^$/(.*)$'                    : '<rootDir>/$1',
        '\\.(css|less|scss|sss|styl)$': '<rootDir>/node_modules/jest-css-modules',

    },
    testEnvironment           : 'jsdom',
    testMatch                 : [
        '**/__tests__/**/*.[jt]s?(x)',
        '**/?(*.)+(spec|test).[tj]s?(x)',
    ],
    setupFilesAfterEnv        : [ '<rootDir>/.jest/jest-setup.ts' ],
    globals                   : {
        __IS_DEV__: false,
        __API__   : '',
    },
};

export default config;
