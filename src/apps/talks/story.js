import { h } from "preact";
import { storiesOf } from "@storybook/react";
import TabDialog from ".";

const noop = () => {};

storiesOf("App/Talks", module).add("System Properties", () => (
  <TabDialog
    title="System Properties"
    onClose={noop}
    onFocus={noop}
    zIndex={1}
  />
));
