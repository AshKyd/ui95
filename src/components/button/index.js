import { h, render, Component } from "preact";
import "./style.css";

class Button extends Component {
  render(props) {
    const className = "ui95-button";
    return h(
      props.type || "button",
      {
        className: [className, ...(props.classNames || "").split(" ")].join(
          ` ${className}--`
        ),
        onClick: props.onClick,
        onMouseDown: props.onMouseDown,
        disabled: props.disabled,
        style: props.style
      },
      props.children
    );
  }
}

export default Button;
