import { h } from "preact";
import { storiesOf } from "@storybook/react";
import Window from ".";

storiesOf("App/Webview", module)
  .add("Window style", () => <Window src="http://example.org/" />)
  .add("JSPaint app", () => <Window src="https://jspaint.app/" />);
