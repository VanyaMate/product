import type { Config } from '@jest/types';


const config: Config.InitialOptions = {
    verbose                   : true,
    clearMocks                : true,
    collectCoverage           : true,
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
    testEnvironment           : 'jsdom',
    testMatch                 : [
        '**/__tests__/**/*.[jt]s?(x)',
        '**/?(*.)+(spec|test).[tj]s?(x)',
    ],
};

export default config;
