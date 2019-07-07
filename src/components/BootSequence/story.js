import { h } from "preact";
import { storiesOf } from "@storybook/react";
import BootSequence from ".";

storiesOf("Components/BootSequence", module).add("Normal", () => (
  <BootSequence
    branding="Ash Kyd"
    copyright="Copyright © 2019 Ash Kyd some rights reserved"
  />
));
