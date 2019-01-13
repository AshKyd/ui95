import { h, render, Component } from "preact";
import "./style.css";

class Divider extends Component {
  render(props) {
    const className = "ui95-divider";
    return h(
      "div",
      {
        className: [className, ...(props.classNames || "").split(" ")].join(
          ` ${className}--`
        ),
        style: props.style
      },
      props.children
    );
  }
}

export default Divider;
