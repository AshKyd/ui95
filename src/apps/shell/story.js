import { h } from "preact";
import { storiesOf } from "@storybook/react";
import Shell from "./index.js";

storiesOf("App/Shell", module).add("No configuration", () => <Shell />);
