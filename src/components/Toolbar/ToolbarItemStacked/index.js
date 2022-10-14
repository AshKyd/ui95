import { h, render, Component } from "preact";
import Icon from "../../Icon/";
import Text from "../../Text/";
import "./style.css";

function ToolbarItemStacked(props) {
  const { onClick, icon, text, url } = props;
  if (!icon)
    return (
      <span class="ui95-toolbar-stacked ui95-toolbar-stacked--text">
        <Text>{text}</Text>
      </span>
    );
  return (
    <button class="ui95-toolbar-stacked" onClick={onClick}>
      <Icon size={24} name={icon} url={url} />
      <Text>{text}</Text>
    </button>
  );
}

export default ToolbarItemStacked;
