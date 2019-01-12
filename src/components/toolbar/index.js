import { h, render, Component } from "preact";
import Divider from "../divider/index.js";
import ToolbarItem from "./toolbar-item/index.js";
import "./style.css";

class Toolbar extends Component {
  getItems(items = []) {
    return Object.entries(items).map((label, item) => {
      if (item === "divider") return <Divider classNames="vertical" />;
      return (
        <ToolbarItem label={label} item={item} iconOnly={this.props.iconOnly} />
      );
    });
  }
  render(props) {
    const className = "ui95-toolbar";
    return h(
      "div",
      {
        className: [className, ...(props.classNames || "").split(" ")].join(
          ` ${className}--`
        ),
        onClick: props.onClick,
        onMouseDown: props.onMouseDown
      },
      [
        <Divider classNames="draggable" />,
        <div style="padding-right:var(--px)" />,
        <Divider classNames="draggable" />,
        props.children,
        this.getItems(props.items)
      ]
    );
  }
}

export default Toolbar;
