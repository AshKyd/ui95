import { h, render, Component } from "preact";
import Icon from "../../icon";
import Divider from "../../divider";
import SubMenuItem from "../submenuitem";
import "./style.css";

export default function({ item, onLaunchApp, onClose }) {
  if (item === "divider")
    return (
      <div className="ui95-menuitem__divider">
        <Divider classNames="horizontal" />
      </div>
    );

  if (item.disabled) {
    return (
      <span className="ui95-menuitem ui95-menuitem--disabled">{item.text}</span>
    );
  }
  if (item.items) return <SubMenuItem {...{ item, onLaunchApp, onClose }} />;

  if (item.appProps)
    return (
      <a
        class="ui95-menuitem"
        onMouseUp={e => {
          e.preventDefault();
          onClose(onLaunchApp(item.appProps.app, item.appProps));
        }}
        href={item.link || "#"}
      >
        {item.icon && <Icon name={item.icon} />}
        {item.text}
      </a>
    );
  return (
    <a class="ui95-menuitem" href={item.link}>
      {item.icon && <Icon name={item.icon} />}
      {item.text}
    </a>
  );
}
