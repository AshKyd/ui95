import { h, render, Component } from "preact";
import "./style.css";

class Bezel extends Component {
  render(props) {
    const className = "ui95-bezel";
    const classNames = [className, ...(props.classNames || "").split(" ")].join(
      ` ${className}--`
    );
    return (
      <div class={classNames} style={props.style}>
        {props.children}
      </div>
    );
  }
}

export default Bezel;
