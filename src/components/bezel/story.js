import { h } from "preact";
import { storiesOf } from "@storybook/react";
import Bezel from ".";

storiesOf("Components/Bezel", module)
  .add("Recessed", () => <Bezel classNames="in">A recessed area</Bezel>)
  .add("Pop out", () => <Bezel classNames="out">A popped out area</Bezel>);
