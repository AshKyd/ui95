import { h } from "preact";
import { storiesOf } from "@storybook/react";
import ShutdownDialog from ".";

storiesOf("App/Shutdown/Dialog", module).add("Main", () => (
  <ShutdownDialog wmProps={{}} />
));
