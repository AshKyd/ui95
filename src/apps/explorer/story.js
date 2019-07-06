import { h } from "preact";
import { storiesOf } from "@storybook/react";
import Explorer from ".";
import WindowArea from "../../components/windowarea/index.js";
import Taskbar from "../../components/taskbar/index.js";
import Button from "../../components/button/index.js";
import { Filesystem, File } from "../../lib/filesystem/index.js";

const fs = new Filesystem();

storiesOf("App/Explorer", module).add("No configuration", () => (
  <Explorer wmProps={{ fs }} path="/" onFocus={() => {}} onClose={() => {}} />
));
