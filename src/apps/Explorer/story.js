import { h } from "preact";
import Explorer from ".";
import WindowArea from "../../components/Desktop/WindowArea";
import Taskbar from "../../components/Taskbar";
import Button from "../../components/Button";
import { Filesystem, File } from "../../lib/filesystem";

const fs = new Filesystem();

fs.files.push(
  new File("c:", {
    label: "C:",
    description: "Spinny disk",
    layout: "details",
    columns: ["size", "date"],
    defaultSort: ["date", false],
  })
);

[...new Array(100)].forEach((val, i) => {
  fs.files.push(
    new File("c:/file " + i, {
      label: "file " + i,
      size: i + " kb",
      date: new Date(Date.now() - Math.random() * 1e10),
    })
  );
});

export default {
  title: "App/Explorer",
};

export const NoConfiguration = () => (
  <Explorer wmProps={{ fs, setAppState: () => {} }} path="/" />
);

NoConfiguration.story = {
  name: "No configuration",
};

export const SmallWindow = () => (
  <Explorer wmProps={{ fs, setAppState: () => {}, width: 400 }} path="/" />
);

SmallWindow.story = {
  name: "Small window",
};
