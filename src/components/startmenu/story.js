import { h } from "preact";
import { storiesOf } from "@storybook/react";
import StartMenu from "./index.js";

const menu = {
  "Windows Update": { icon: "windowsupdate" },
  Divider: "divider",
  Programs: {
    icon: "windowsupdate",
    items: {
      "My Documents": { icon: "windowsupdate" },
      Run: { icon: "windowsupdate" },
      "Shut Down": { icon: "windowsupdate" }
    }
  },
  "My Documents": { icon: "windowsupdate" },
  Run: { icon: "windowsupdate" },
  Divider2: "divider",
  "Shut Down": { icon: "windowsupdate" }
};

storiesOf("Start menu", module).add("render some text", () => (
  <StartMenu items={menu} isOpen="true" />
));
