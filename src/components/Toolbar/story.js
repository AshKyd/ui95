import { h } from "preact";
import { storiesOf } from "@storybook/react";
import Toolbar from ".";

storiesOf("Components/Toolbar", module)
  .add("Text style (default)", () => (
    <Toolbar
      items={[
        { text: "File" },
        { text: "Edit" },
        { text: "View" },
        { text: "Insert" }
      ]}
    />
  ))
  .add("Stacked icons", () => (
    <Toolbar
      variant="stacked"
      items={[
        { text: "Back", icon: "explorer-back" },
        { text: "Forward", icon: "explorer-forward" },
        { text: "Up", icon: "explorer-up" }
      ]}
    />
  ));
