import { h } from "preact";
import { storiesOf } from "@storybook/react";
import Window from "./index.js";

storiesOf("App/Webview", module).add("Window style", () => (
  <Window src="http://example.org/" onFocus={() => {}} onClose={() => {}} />
));
