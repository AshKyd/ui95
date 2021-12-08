import { h } from "preact";
import { storiesOf } from "@storybook/react";
import Buttons from ".";

storiesOf("Components/Window/Buttons", module)
  .add("No config", () => <Buttons />)
  .add("Maximized", () => <Buttons isMaximized />)
  .add("Custom buttons", () => <Buttons buttons={["close"]} />);
