import { h } from "preact";
import { storiesOf } from "@storybook/react";
import Divider from ".";
import Icon from "../icon/index.js";

storiesOf("Components/Divider", module)
  .add("horizontal", () => <Divider classNames="horizontal" />)
  .add("vertical", () => <Divider classNames="vertical" />);
