import { h, Component } from "preact";
import Tray from ".";

const items = [];

export default {
  title: "Components/Taskbar/Tray",
};

export const Basic = () => {
  return (
    <div>
      <Tray items={items} />
    </div>
  );
};

Basic.story = {
  name: "basic",
};
