import { h } from "preact";
import { storiesOf } from "@storybook/react";
import Window from ".";
import WindowArea from "../../components/desktop/windowarea";
import Taskbar from "../../components/taskbar";
import Button from "../../components/button";

storiesOf("App/Error", module).add("Window style", () => (
  <Window wmProps={{}} error={new Error("an error")} />
));
