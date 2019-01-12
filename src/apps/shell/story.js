import { h } from "preact";
import { storiesOf } from "@storybook/react";
import Shell from "./index.js";

storiesOf("Shell", module).add("No configuration", () => <Shell />);
