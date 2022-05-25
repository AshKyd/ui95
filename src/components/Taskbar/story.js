import { h } from "preact";
import Taskbar from ".";
import Button from "../Button";
import Icon from "../Icon";

export default {
  title: "Components/Taskbar",
};

export const RenderATaskbar = () => (
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
);

RenderATaskbar.story = {
  name: "Render a taskbar",
};
