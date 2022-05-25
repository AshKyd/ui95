module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/story.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/preact",
};
