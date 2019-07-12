import { h } from "preact";
import { storiesOf } from "@storybook/react";
import Button from ".";
import Icon from "../icon/index.js";

storiesOf("Components/Button", module)
  .add("Button style", () => <Button>Start</Button>)
  .add("Bold", () => <Button classNames="bold">Start</Button>)
  .add("With image", () => (
    <Button classNames="bold left">
      <Icon size="16" name="folder" />
      Start
    </Button>
  ))
  .add("Block style", () => <Button type="div">Start</Button>)
  .add("Active style", () => <Button className="active">Start</Button>);
