import { h } from "preact";
import { storiesOf } from "@storybook/react";
import TabDialog from ".";

storiesOf("App/Talks", module).add("System Properties", () => (
  <TabDialog title="System Properties" />
));
