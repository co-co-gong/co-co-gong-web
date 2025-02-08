import path from "path";

import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  features: {
    experimentalRSC: true,
  },
  core: {
    builder: "@storybook/builder-webpack5",
  },
  webpackFinal: (config) => {
    config.resolve!.alias = {
      ...config.resolve?.alias,
      "@": [path.resolve(__dirname, "../src")],
    };
    config.resolve!.roots = [path.resolve(__dirname, "../public"), "node_modules"];
    return config;
  },
  staticDirs: ["../public"],
};
export default config;
