import { h, render, Component } from "preact";
import "./style.css";
import Bezel from "../bezel/index.js";

function Menu({ classNames, style, items = {}, onClose, onLaunchApp }) {
  console.log("menu", items);
  const renderableItems = Object.entries(items).map(([key, value]) => {
    return (
      <a
        class="ui95-menu-entry"
        onMouseUp={e =>
          e.preventDefault() && onClose(onLaunchApp(value.app, value.props))
        }
        href={value.link | "#"}
      >
        {key}
      </a>
    );
  });
  return (
    <div class={`ui95-menu ${classNames || ""}`} style={style}>
      <Bezel classNames="out">{renderableItems}</Bezel>
    </div>
  );
}

export default Menu;
