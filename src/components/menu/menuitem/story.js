import { h } from "preact";
import { storiesOf } from "@storybook/react";
import MenuItem from ".";

storiesOf("Components/Menu/MenuItem", module)
  .add("divider", () => <MenuItem item="divider" />)
  .add("appProps", () => (
    <MenuItem
      item={{
        text: "Launch the app",
        link: "https://example.org/",
        appProps: {
          app: "foo"
        }
      }}
    />
  ))
  .add("with an icon", () => (
    <MenuItem
      item={{
        icon: "default",
        text: "Launch the app",
        link: "https://example.org/",
        appProps: {
          app: "foo"
        }
      }}
    />
  ));
