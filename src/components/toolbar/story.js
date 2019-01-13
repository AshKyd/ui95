import { h } from "preact";
import { storiesOf } from "@storybook/react";
import Toolbar from "./index.js";

storiesOf("Toolbar", module)
  .add("Text style", () => (
    <Toolbar
      items={{
        File: {},
        Edit: {},
        View: {},
        Insert: {}
      }}
    />
  ))
  .add("Icon style", () => (
    <Toolbar
      iconOnly={true}
      items={{
        "New document": { icon: "documentNew" },
        Open: { icon: "open" },
        Save: { icon: "save" },
        divider: "divider"
      }}
    />
  ));
