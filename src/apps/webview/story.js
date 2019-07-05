import { h } from "preact";
import { storiesOf } from "@storybook/react";
import Window from ".";

storiesOf("App/Webview", module)
  .add("Window style", () => (
    <Window src="http://example.org/" onFocus={() => {}} onClose={() => {}} />
  ))
  .add("JSPaint app", () => (
    <Window src="https://jspaint.app/" onFocus={() => {}} onClose={() => {}} />
  ));
