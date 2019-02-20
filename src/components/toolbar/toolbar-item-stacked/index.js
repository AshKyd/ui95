import { h, render, Component } from "preact";
import Icon from "../../icon/index.js";
import Text from "../../text/index.js";
import "./style.css";

function ToolbarItemStacked(props) {
  const { onClick, icon, label } = props;
  return (
    <button class="ui95-toolbar-stacked" onClick={onClick}>
      <Icon size={24} name={icon} />
      <Text>{label}</Text>
    </button>
  );
}

export default ToolbarItemStacked;
