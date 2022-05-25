import { h } from "preact";
import { storiesOf } from "@storybook/react";
import Window from ".";
import WindowArea from "../../components/Desktop/WindowArea";
import Taskbar from "../../components/Taskbar";
import Button from "../../components/Button";

storiesOf("App/Error", module).add("Window style", () => (
  <Window wmProps={{}} error={new Error("an error")} />
));
