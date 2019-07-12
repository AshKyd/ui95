import { h } from "preact";
import { storiesOf } from "@storybook/react";
import FileThumbnail from ".";

storiesOf("Components/Desktop/FileThumbnail", module)
  .add("C Drive", () => (
    <FileThumbnail size="16" icon="default" label=" (C:)" />
  ))
  .add("C Drive selected", () => (
    <FileThumbnail size="16" icon="default" selected={true} label=" (C:)" />
  ))
  .add("Long file name", () => (
    <FileThumbnail
      size="16"
      icon="default"
      label="Maritime Museum of Denmark + catching a boat to Sweden"
    />
  ))

  .add("With image", () => (
    <FileThumbnail
      size="16"
      icon="default"
      image={require("./kitten.jpg")}
      imageAlt="A kitten"
      label="Maritime Museum of Denmark + catching a boat to Sweden"
    />
  ))

  .add("With 4X3 image", () => (
    <FileThumbnail
      size="16"
      icon="default"
      image={require("./kitten-4x3.jpg")}
      imageAlt="A kitten"
      label="Maritime Museum of Denmark + catching a boat to Sweden"
    />
  ));
