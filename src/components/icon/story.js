import { h } from "preact";
import { storiesOf } from "@storybook/react";
import Icon from "./index.js";

storiesOf("Input/Icon", module).add("Folder", () => (
  <Icon size="16" name="folder" />
));
