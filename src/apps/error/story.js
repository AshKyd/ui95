import { h } from "preact";
import { storiesOf } from "@storybook/react";
import Window from ".";
import WindowArea from "../../components/windowarea/index.js";
import Taskbar from "../../components/taskbar/index.js";
import Button from "../../components/button/index.js";

storiesOf("App/Error", module).add("Window style", () => (
  <Window wmProps={{}} error={new Error("an error")} />
));
