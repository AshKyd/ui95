import { h } from "preact";
import { storiesOf } from "@storybook/react";
import Taskbar from ".";
import Button from "../Button";
import Icon from "../Icon";

storiesOf("Components/Taskbar", module).add("Render a taskbar", () => (
  <Taskbar>
    <Button classNames="bold left">
      <Icon size="16" name="folder" />
      Taskbar
    </Button>
    <Button classNames="left flex-taskbar active">
      <Icon size="16" name="folder" />
      Control panel
    </Button>
    <Button classNames="left flex-taskbar">
      <Icon size="16" name="folder" />
      Control panel
    </Button>
  </Taskbar>
));
