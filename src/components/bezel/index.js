import { h, render, Component } from "preact";
import { getClasses } from "../../util";

import "./style.css";

function Bezel({ classNames, style, children }) {
  return (
    <div class={getClasses("bezel", classNames)} style={style}>
      {children}
    </div>
  );
}

export default Bezel;
