import { h } from "preact";
import { storiesOf } from "@storybook/react";
import FileIcon from "./index.js";

storiesOf("Components/Desktop/FileThumbnail", module)
  .add("C Drive", () => <FileIcon size="16" icon="default" label=" (C:)" />)
  .add("C Drive selected", () => (
    <FileIcon size="16" icon="default" selected={true} label=" (C:)" />
  ))
  .add("Long file name", () => (
    <FileIcon
      size="16"
      icon="default"
      label="Maritime Museum of Denmark + catching a boat to Sweden"
    />
  ))

  .add("With image", () => (
    <FileIcon
      size="16"
      icon="default"
      image={require("./kitten.jpg")}
      imageAlt="A kitten"
      label="Maritime Museum of Denmark + catching a boat to Sweden"
    />
  ))

  .add("With 4X3 image", () => (
    <FileIcon
      size="16"
      icon="default"
      image={require("./kitten-4x3.jpg")}
      imageAlt="A kitten"
      label="Maritime Museum of Denmark + catching a boat to Sweden"
    />
  ));
