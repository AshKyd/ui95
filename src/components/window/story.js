import { h } from "preact";
import { storiesOf } from "@storybook/react";
import Window from "./index.js";
import WindowArea from "../windowarea/index.js";
import Taskbar from "../taskbar/index.js";
import Button from "../button/index.js";

storiesOf("Window", module)
  .add("Without icon", () => (
    <Window onFocus={() => {}} onClose={() => {}}>
      Hello window
    </Window>
  ))
  .add("With icon", () => (
    <Window onFocus={() => {}} onClose={() => {}} icon="default">
      Hello window
    </Window>
  ));
