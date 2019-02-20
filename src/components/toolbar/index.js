import { h, render, Component } from "preact";
import Divider from "../divider/index.js";
import ToolbarItemText from "./toolbar-item-text/index.js";
import ToolbarItemStacked from "./toolbar-item-stacked/index.js";
import "./style.css";

const variants = {
  text: ToolbarItemText,
  stacked: ToolbarItemStacked
};

class Toolbar extends Component {
  getItems(items = []) {
    const { onClick, variant } = this.props;
    return Object.entries(items).map(([label, item]) => {
      if (item === "divider") return <Divider classNames="vertical" />;
      const ToolbarItem = variants[variant || "text"];
      return (
        <ToolbarItem
          label={label}
          icon={item.icon}
          onClick={() => (item.onClick || onClick)(item)}
        />
      );
    });
  }
  render({ classNames, onClick, onMouseDown, items, children }) {
    const className = "ui95-toolbar";
    return h(
      "div",
      {
        className: [className, ...(classNames || "").split(" ")].join(
          ` ${className}--`
        ),
        onClick: onClick,
        onMouseDown: onMouseDown
      },
      [
        <Divider classNames="draggable" />,
        <div style="padding-right:var(--px)" />,
        <Divider classNames="draggable" />,
        <div style="padding-right:var(--px)" />,
        children,
        this.getItems(items)
      ]
    );
  }
}

export default Toolbar;
