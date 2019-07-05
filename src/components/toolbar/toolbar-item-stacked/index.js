import { h, render, Component } from "preact";
import Icon from "../../icon/index.js";
import Text from "../../text/index.js";
import "./style.css";

function ToolbarItemStacked(props) {
  const { onClick, icon, text } = props;
  if (!icon)
    return (
      <span class="ui95-toolbar-stacked ui95-toolbar-stacked--text">
        <Text>{text}</Text>
      </span>
    );
  return (
    <button class="ui95-toolbar-stacked" onClick={onClick}>
      <Icon size={24} name={icon} />
      <Text>{text}</Text>
    </button>
  );
}

export default ToolbarItemStacked;
