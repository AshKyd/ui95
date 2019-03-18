import { h } from "preact";
import { storiesOf } from "@storybook/react";
import TabDialog from "./index.js";

const noop = () => {};

storiesOf("App/TabDialog", module).add("System Properties", () => (
  <TabDialog
    title="System Properties"
    tabs={{
      General: [<span>Some general content</span>],
      "Device Manager": [<img src="http://placekitten.com/200/200" />],
      Performance: [<pre>{JSON.stringify(performance, null, 2)}</pre>]
    }}
    onClose={noop}
    onFocus={noop}
    zIndex={1}
  />
));
