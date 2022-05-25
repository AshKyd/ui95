import { h, Component } from "preact";
import { storiesOf } from "@storybook/react";
import Tray from ".";

const items = [];

storiesOf("Components/Taskbar/Tray", module).add("basic", () => {
  return (
    <div>
      <Tray items={items} />
    </div>
  );
});
