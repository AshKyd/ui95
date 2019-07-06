import { h } from "preact";
import { storiesOf } from "@storybook/react";
import Window from ".";
import WindowArea from "../windowarea/index.js";
import Taskbar from "../taskbar/index.js";
import Button from "../button/index.js";

storiesOf("Components/Window", module)
  .add("Without icon", () => <Window>Hello window</Window>)
  .add("With icon", () => <Window icon="preact">Hello window</Window>);
