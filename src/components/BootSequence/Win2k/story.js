import { h } from "preact";
import { storiesOf } from "@storybook/react";
import BootSequenceWin2k from ".";

storiesOf("Components/BootSequence/Win2k", module).add("Normal", () => (
  <BootSequenceWin2k
    branding="Ash Kyd"
    copyright="Copyright © 2019 Ash Kyd some rights reserved"
  />
));
