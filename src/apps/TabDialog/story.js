import { h } from "preact";
import { storiesOf } from "@storybook/react";
import TabDialog from ".";

storiesOf("App/TabDialog", module).add("System Properties", () => (
  <TabDialog
    title="System Properties"
    tabs={{
      General: [faker.lorem.paragraph()],
      "Device Manager": [<img src="http://placekitten.com/200/200" />],
      Performance: [<pre>{JSON.stringify(performance, null, 2)}</pre>]
    }}
  />
));
