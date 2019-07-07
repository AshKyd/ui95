import { h } from "preact";
import { storiesOf } from "@storybook/react";
import BlinkenPrompt from ".";

storiesOf("Components/BootSequence/BlinkenPrompt", module).add("Normal", () => (
  <BlinkenPrompt />
));
