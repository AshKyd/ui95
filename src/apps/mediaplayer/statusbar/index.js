import { h, render, Component } from "preact";
import "./style.css";
import Text from "../../../components/text/index.js";

function formatSeconds(seconds) {
  const date = new Date(null);
  date.setSeconds(seconds);
  return date.toISOString().substr(14, 5);
}

function StatusBar({ title, seconds = 0 }) {
  let text;
  if (title) text = title;
  if (!title) text = "Ready";
  return (
    <div class={`ui95-mpstatus`}>
      <span>
        <Text size="10">{text}</Text>
      </span>
      <span>
        <Text size="10">{formatSeconds(seconds)}</Text>
      </span>
    </div>
  );
}

export default StatusBar;
