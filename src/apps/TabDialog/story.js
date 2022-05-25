import { h } from "preact";
import TabDialog from ".";

export default {
  title: "App/TabDialog",
};

export const SystemProperties = () => (
  <TabDialog
    title="System Properties"
    tabs={{
      General: ["Hello yes this is dog"],
      "Device Manager": [<img src="http://placekitten.com/200/200" />],
      Performance: [<pre>{JSON.stringify(performance, null, 2)}</pre>],
    }}
  />
);
