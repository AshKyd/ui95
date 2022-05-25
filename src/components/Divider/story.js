import { h } from "preact";
import { storiesOf } from "@storybook/react";
import Divider from ".";
import Icon from "../Icon/";

storiesOf("Components/Divider", module)
  .add("horizontal", () => <Divider classNames="horizontal" />)
  .add("vertical", () => <Divider classNames="vertical" />);
