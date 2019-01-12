import { h, render, Component } from "preact";
import "./style.css";

class Button extends Component {
  render(props) {
    const className = "ui95-text";
    return h(
      props.type || "p",
      {
        className: [className, ...(props.classNames || "").split(" ")].join(
          ` ${className}--`
        ),
        style: props.style,
        dangerouslySetInnerHTML: props.html && { __html: props.html }
      },
      props.children
    );
  }
}

export default Button;
