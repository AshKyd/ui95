import { h, render, Component } from "preact";
import "./style.css";
import Button from "../../Button/";
import Divider from "../../Divider/";
import Icon from "../../Icon/";

function ColorPicker(props) {
  const className = "input";
  const classNames = [
    className,
    "in",
    props.disabled && "disabled",
    ...(props.classNames || "").split(" "),
  ].join(` ${className}--`);
  return (
    <Button
      classNames="color-picker"
      onClick={() => {
        console.log("clickety");
        document.querySelector(".ui95-colourpicker__input").click();
      }}
      onChange={(e) => props.onChange(e.target.value)}
    >
      <div
        className="ui95-colorpicker__swatch"
        style={{ backgroundColor: props.value }}
      ></div>
      <Divider classNames="vertical" />
      <input
        type="color"
        value={props.value}
        className="ui95-colourpicker__input"
      />
      <Icon
        size="custom"
        name="chevron-black-right"
        style="transform: rotate(90deg);transform-origin:center;"
      />
    </Button>
  );
}

export default ColorPicker;
