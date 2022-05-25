import { h } from "preact";
import { storiesOf } from "@storybook/react";
import Tab from ".";

storiesOf("Components/TabBox/Tab", module).add("Active", () => (
  <Tab>General</Tab>
));
