import { h } from "preact";
import { storiesOf } from "@storybook/react";
import Toolbar from "./index.js";

storiesOf("Toolbar", module)
  .add("Text style (default)", () => (
    <Toolbar
      items={{
        File: {},
        Edit: {},
        View: {},
        Insert: {}
      }}
    />
  ))
  .add("Stacked icons", () => (
    <Toolbar
      variant="stacked"
      items={{
        Back: { icon: "explorer-back" },
        Forward: { icon: "explorer-forward" },
        Up: { icon: "explorer-up" }
      }}
    />
  ));
