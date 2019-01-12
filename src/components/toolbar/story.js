import { h } from "preact";
import { storiesOf } from "@storybook/react";
import Toolbar from "./index.js";
import Icon from "../icon/index.js";
import Divider from "../divider/index.js";
import ToolbarItem from "../toolbar-item/index.js";

storiesOf("Toolbar", module).add("Toolbar style", () => (
  <div>
    <Toolbar>
      <ToolbarItem classNames="borderless icon">
        <Icon name="word" size="16" />
      </ToolbarItem>
      <ToolbarItem classNames="borderless text">
        <u>F</u>ile
      </ToolbarItem>
      <ToolbarItem classNames="borderless text">
        <u>E</u>dit
      </ToolbarItem>
      <Divider classNames="vertical" />
      <ToolbarItem classNames="borderless text">
        <u>H</u>elp
      </ToolbarItem>
    </Toolbar>
    <Toolbar>
      <ToolbarItem classNames="borderless icon">
        <Icon name="documentNew" size="16" />
      </ToolbarItem>
      <ToolbarItem classNames="borderless icon">
        <Icon name="open" size="16" />
      </ToolbarItem>
      <ToolbarItem classNames="borderless icon">
        <Icon name="save" size="16" />
      </ToolbarItem>
      <Divider classNames="vertical" />
      <ToolbarItem classNames="borderless icon">
        <Icon name="print" size="16" />
      </ToolbarItem>
      <ToolbarItem classNames="borderless icon">
        <Icon name="documentFind" size="16" />
      </ToolbarItem>
    </Toolbar>
  </div>
));
