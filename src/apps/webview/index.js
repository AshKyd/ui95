import { h, render, Component } from "preact";
import "./style.css";
import Window from "../../components/window/index.js";

function Webview({ title, src, onClose, onFocus, isMinimized, zIndex }) {
  return (
    <Window
      title={title}
      zIndex={zIndex}
      classNames="webview"
      width={800}
      height={600}
      isMinimized={isMinimized}
      onClose={onClose}
      onFocus={onFocus}
    >
      <iframe class="ui95-webview" src={src} />
    </Window>
  );
}

export default Webview;
