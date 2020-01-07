import { h } from "preact";
import { storiesOf } from "@storybook/react";
import Icon from ".";

storiesOf("Components/Icon", module)
  .add("Folder", () => <Icon size="16" name="folder" />)
  .add("Custom", () => <Icon size="custom" name="chevron-black-right" />);
