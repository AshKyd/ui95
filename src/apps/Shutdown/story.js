import { h } from "preact";
import { storiesOf } from "@storybook/react";
import Shutdown from ".";

storiesOf("App/Shutdown", module).add("Main", () => (
  <Shutdown
    branding="Ash Kyd"
    copyright="Copyright © 2019 Ash Kyd some rights reserved"
    onChange={() => {}}
  />
));
