import { h, render, Component } from "preact";
import "./style.css";
import Bezel from "../../Bezel";
import Button from "../../Button";
import Icon from "../../Icon";

function Input(props) {
  const className = "select";
  const classNames = [
    className,
    "in",
    props.disabled && "disabled",
    ...(props.classNames || "").split(" "),
  ].join(` ${className}--`);
  const options = props.options || [];
  return (
    <Bezel
      classNames={classNames}
      style={{
        width: props.width || "100px",
        height: props.height || "24px",
        ...(props.style || {}),
      }}
    >
      <select
        value={props.value}
        disabled={props.disabled}
        onChange={props.onChange}
        id={props.name}
      >
        {props.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <Button>
        <Icon size="custom" name="chevron-black-right" />
      </Button>
    </Bezel>
  );
}

export default Input;
