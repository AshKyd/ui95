import { h } from "preact";
import { storiesOf } from "@storybook/react";
import ColorPicker from ".";

storiesOf("Components/ColorPicker", module)
  .add("Red", () => <ColorPicker value="#ff0000" onChange={console.log} />)
  .add("Green", () => <ColorPicker value="#008800" onChange={console.log} />);
