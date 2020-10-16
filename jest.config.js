module.exports = {
  notify: true,
  notifyMode: 'failure-success',

  collectCoverage: true,
  coverageReporters: process.env.CI ? ['lcov'] : ['text', 'text-summary', 'html'], // eslint-disable-line no-process-env
  collectCoverageFrom: [
    'src/**/*.js',
  ],

  projects: [
    {
      displayName: 'test',
      verbose: true,
      testMatch: ['<rootDir>/test/index.js'],
    },
    {
      displayName: 'lint',
      runner: 'jest-runner-eslint',
      testMatch: ['<rootDir>/**/*.js'],
    },
  ],
};
