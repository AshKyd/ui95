import { h } from "preact";
import { storiesOf } from "@storybook/react";
import Window from ".";

storiesOf("App/Error", module).add("Window style", () => (
  <Window wmProps={{}} error={new Error("an error")} />
));
