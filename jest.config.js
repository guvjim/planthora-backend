// /** @type {import('ts-jest').JestConfigWithTsJest} **/
// module.exports = {
//   testEnvironment: "node",
//   transform: {
//     "^.+.tsx?$": ["ts-jest",{}],
//   },
// };

// export default {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
//   verbose: true,
//   collectCoverage: true,
//   coverageDirectory: 'coverage',
//   testMatch: ['**/__tests__/**/*.test.ts'],  // Look for test files in this pattern
//   moduleFileExtensions: ['ts', 'js'],
// };
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  testMatch: ['**/__tests__/**/*.test.ts'],  // Look for test files in this pattern
  moduleFileExtensions: ['ts', 'js'],
};

