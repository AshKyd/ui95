import { h, render, Component } from "preact";
import Text from "../../text/index.js";
import "./style.css";

function ToolbarItemText(props) {
  const { onClick, label } = props;
  return (
    <button class="ui95-toolbar-text" onClick={onClick}>
      <Text>{label}</Text>
    </button>
  );
}

export default ToolbarItemText;
