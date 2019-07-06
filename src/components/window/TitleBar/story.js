import { h } from "preact";
import { storiesOf } from "@storybook/react";
import TitleBar from ".";

storiesOf("Components/Window/TitleBar", module)
  .add("Text only", () => <TitleBar text="Hello world" />)
  .add("Text and icon", () => <TitleBar icon="preact" text="Hello world" />);
