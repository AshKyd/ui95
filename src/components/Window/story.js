import { h } from "preact";
import { storiesOf } from "@storybook/react";
import Window from ".";
import WindowArea from "../Desktop/WindowArea";
import Taskbar from "../Taskbar";
import Button from "../Button";

storiesOf("Components/Window", module)
  .add("Without icon", () => <Window>Hello window</Window>)
  .add("With icon", () => <Window icon="preact">Hello window</Window>);
