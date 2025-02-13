import nextJest from "next/jest";

import type { Config } from "jest";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

export default createJestConfig(config);
