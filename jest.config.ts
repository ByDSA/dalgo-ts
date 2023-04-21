import { Config } from "jest";

const coverageThreshold: Config["coverageThreshold"] = {
  global: {
    branches: 50,
    functions: 50,
    lines: 80,
    statements: 80,
  },
};
const config: Config = {
  moduleDirectories: [
    "node_modules",
    "src",
  ],
  globals: {
  },
  roots: ["<rootDir>/src", "<rootDir>/tests"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": require.resolve("babel-jest"),
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterEnv: ["jest-expect-message", "<rootDir>/tests/setup.js"],
  moduleNameMapper: {
    "^~($|/.*)$": "<rootDir>/src/$1",
    "^#tests($|/.*)$": "<rootDir>/tests/$1",
  },
  coverageThreshold,
};

export default config;