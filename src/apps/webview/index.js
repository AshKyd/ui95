import { h, render, Component } from "preact";
import "./style.css";
import Window from "../../components/window/index.js";

function Webview({ title, src, wmProps }) {
  return (
    <Window
      title={title}
      classNames="webview"
      width={800}
      height={600}
      {...wmProps}
    >
      <iframe class="ui95-webview" src={src} allowfullscreen />
    </Window>
  );
}

export default Webview;
