import { h, render, Component } from "preact";
import "./style.css";

class Desktop {
  componentDidMount() {
    if (this.props.fullscreen) {
      window.addEventListener("resize", this.updateFullscreen);
      this.updateFullscreen();
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateFullscreen);
  }
  updateFullscreen() {
    this.el.style.height = window.innerHeight + "px";
    this.el.style.width = window.innerWidth + "px";
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
