import { h } from "preact";
import { storiesOf } from "@storybook/react";
import Window from "./index.js";
import WindowArea from "../../components/windowarea/index.js";
import Taskbar from "../../components/taskbar/index.js";
import Button from "../../components/button/index.js";

storiesOf("App/Explorer", module).add("No configuration", () => (
  <Window onFocus={() => {}} onClose={() => {}} />
));
