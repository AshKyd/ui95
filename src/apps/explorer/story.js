import { h } from "preact";
import { storiesOf } from "@storybook/react";
import Explorer from ".";
import WindowArea from "../../components/desktop/windowarea";
import Taskbar from "../../components/taskbar";
import Button from "../../components/button";
import { Filesystem, File } from "../../lib/filesystem";

const fs = new Filesystem();

fs.files.push(
  new File("c:", {
    label: "C:",
    description: "Spinny disk",
    layout: "details",
    columns: ["size", "date"],
    defaultSort: ["date", false]
  })
);

[...new Array(100)].forEach((val, i) => {
  fs.files.push(
    new File("c:/file " + i, {
      label: "file " + i,
      size: i + " kb",
      date: new Date(Date.now() - Math.random() * 1e10)
    })
  );
});

storiesOf("App/Explorer", module)
  .add("No configuration", () => (
    <Explorer wmProps={{ fs, setAppState: () => {} }} path="/" />
  ))
  .add("Small window", () => (
    <Explorer wmProps={{ fs, setAppState: () => {}, width: 400 }} path="/" />
  ));
