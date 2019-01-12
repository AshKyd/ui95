import { h } from "preact";
import { storiesOf } from "@storybook/react";
import Window from "./index.js";
import WindowArea from "../windowarea/index.js";
import Taskbar from "../taskbar/index.js";
import Button from "../button/index.js";

storiesOf("Window", module).add("Window style", () => (
  <Window onFocus={() => {}} onClose={() => {}}>
    Hello window
  </Window>
));
