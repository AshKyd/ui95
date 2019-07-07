import { h } from "preact";
import { storiesOf } from "@storybook/react";
import Explorer from ".";
import WindowArea from "../../components/desktop/windowarea";
import Taskbar from "../../components/taskbar";
import Button from "../../components/button";
import { Filesystem, File } from "../../lib/filesystem";

const fs = new Filesystem();

storiesOf("App/Explorer", module).add("No configuration", () => (
  <Explorer wmProps={{ fs }} path="/" onFocus={() => {}} onClose={() => {}} />
));
