import { configure } from "@storybook/react";
import faker from "faker";
window.faker = faker;

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

function loadStories() {
  requireAll(require.context("../src/", true, /story\.jsx?$/));
}

configure(loadStories, module);
