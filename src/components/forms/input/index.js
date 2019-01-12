import { h, render, Component } from "preact";
import "./style.css";
import Bezel from "../../bezel/index.js";

class Input extends Component {
  render(props) {
    const className = "input";
    const classNames = [
      className,
      "in",
      props.disabled && "disabled",
      ...(props.classNames || "").split(" ")
    ].join(` ${className}--`);
    const element = props.multiline ? "textarea" : "input";
    return (
      <Bezel
        classNames={classNames}
        style={{
          width: props.width || "calc(100 * var(--px))",
          height: props.height || "calc(16 * var(--px))",
          ...(props.style || {})
        }}
      >
        {h(element, {
          value: props.value,
          disabled: props.disabled
        })}
      </Bezel>
    );
  }
}

export default Input;
