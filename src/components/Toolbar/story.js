import { h } from "preact";
import Toolbar from ".";

export default {
  title: "Components/Toolbar",
};

export const TextStyleDefault = () => (
  <Toolbar
    items={[
      { text: "File", items: [{ text: "Save as" }, "divider"] },
      { text: "Edit" },
      { text: "View" },
      { text: "Insert" },
    ]}
  />
);

TextStyleDefault.story = {
  name: "Text style (default)",
};

export const StackedIcons = () => (
  <Toolbar
    variant="stacked"
    items={[
      { text: "Back", icon: "explorer-back" },
      { text: "Forward", icon: "explorer-forward" },
      { text: "Up", icon: "explorer-up" },
    ]}
  />
);

StackedIcons.story = {
  name: "Stacked icons",
};
