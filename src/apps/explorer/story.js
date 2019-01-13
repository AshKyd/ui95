import { h } from "preact";
import { storiesOf } from "@storybook/react";
import Explorer from "./index.js";
import WindowArea from "../../components/windowarea/index.js";
import Taskbar from "../../components/taskbar/index.js";
import Button from "../../components/button/index.js";

const icons = {};
["(C:)", "My Documents", "Program Files", "Windows", "README.txt"].forEach(
  label =>
    (icons[label] = {
      permalink: "/",
      image: null,
      description: "A description of the item."
    })
);

storiesOf("App/Explorer", module).add("No configuration", () => (
  <Explorer items={icons} onFocus={() => {}} onClose={() => {}} />
));
