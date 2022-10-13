import { h, render, Component } from "preact";
import Text from "../../Text/";
import "./style.css";

function ToolbarItemText({ onClick, text, fwdRef, className }) {
  return (
    <button
      ref={fwdRef}
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
