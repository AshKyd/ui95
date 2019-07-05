import { h } from "preact";
import { storiesOf } from "@storybook/react";
import FileIcon from ".";

storiesOf("Components/Desktop/FileIcon", module)
  .add("C Drive", () => <FileIcon size="16" icon="default" label=" (C:)" />)
  .add("C Drive selected", () => (
    <FileIcon size="16" icon="default" selected={true} label=" (C:)" />
  ))
  .add("Long file name", () => (
    <FileIcon size="16" icon="default" label="A long file name" />
  ));
