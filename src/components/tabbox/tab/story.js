import { h } from "preact";
import { storiesOf } from "@storybook/react";
import Tab from "./index.js";

storiesOf("TabBox/Tab", module).add("Active", () => <Tab>General</Tab>);
