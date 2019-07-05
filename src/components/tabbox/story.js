import { h } from "preact";
import { storiesOf } from "@storybook/react";
import TabBox from ".";

storiesOf("Components/TabBox", module).add("Recessed", () => (
  <TabBox tabs={{ General: [], "Device Manager": [], Performance: [] }} />
));
