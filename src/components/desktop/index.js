import { h, render, Component } from "preact";
import throttle from "lodash/throttle";
import { updateVariables } from "../../apps/displayproperties/index.js";

import "./style.css";

class Desktop {
  constructor() {
    this.updateFullscreen = throttle(this.updateFullscreen, 100).bind(this);
    updateVariables();
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateFullscreen);
    this.updateFullscreen();
  }
  compontDidUpdate() {
    this.updateFullscreen();
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateFullscreen);
  }
  updateFullscreen() {
    this.el.style.height = window.innerHeight + "px";
    this.el.style.width = "100%";
    this.el.style.overflow = "hidden";
  }
  render({ children }) {
    return (
      <div className="ui95-desktop" ref={el => (this.el = el)}>
        {children}
      </div>
    );
  }
}

export default Desktop;
