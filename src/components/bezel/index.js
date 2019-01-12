import { h, render, Component } from "preact";
import "./style.css";

class Bezel extends Component {
  render(props) {
    const className = "ui95-bezel";
    return (
      <div
        class={[className, ...(props.classNames || "").split(" ")].join(
          ` ${className}--`
        )}
        style={props.style}
      >
        {props.children}
      </div>
    );
  }
}

export default Bezel;
