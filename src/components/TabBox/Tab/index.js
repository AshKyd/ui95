import { h, render, Component } from "preact";
import Text from "../../Text";
import "./style.css";

function Tab({ onClick, children, style }) {
  return (
    <button className="ui95-tab" onClick={onClick} style={style}>
      <Text class="ui95-tab__ring">{children}</Text>
    </button>
  );
}

export default Tab;
