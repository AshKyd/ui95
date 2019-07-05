import { h, render, Component } from "preact";
import Text from "../../text/index.js";
import "./style.css";

function ToolbarItemText({ onClick, text, className }) {
  return (
    <button
      class={`ui95-toolbar-text ${
        className ? `ui95-toolbar-text--${className}` : ""
      }`}
      onClick={onClick}
    >
      <Text>{text}</Text>
    </button>
  );
}

export default ToolbarItemText;
