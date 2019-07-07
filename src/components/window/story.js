import { h } from "preact";
import { storiesOf } from "@storybook/react";
import Window from ".";
import WindowArea from "../desktop/windowarea";
import Taskbar from "../taskbar";
import Button from "../button";

storiesOf("Components/Window", module)
  .add("Without icon", () => <Window>Hello window</Window>)
  .add("With icon", () => <Window icon="preact">Hello window</Window>);
