import { h, render, Component } from "preact";
import Icon from "../../icon";
import Divider from "../../divider";
import SubMenuItem from "../submenuitem";
import "./style.css";

export default function({
  item,
  onLaunchApp,
  onClose,
  zIndex,
  iconSize,
  className
}) {
  const baseClassName = `ui95-menuitem ${
    className ? `ui95-menuitem--${className}` : ""
  }`;
  if (item === "divider")
    return (
      <div className={``}>
        <Divider classNames="horizontal" />
      </div>
    );

  if (item.disabled) {
    return (
      <span className={`${baseClassName} ui95-menuitem--disabled`}>
        {item.text}
      </span>
    );
  }
  if (item.items)
    return (
      <SubMenuItem
        {...{ item, onLaunchApp, onClose, zIndex, baseClassName, iconSize }}
      />
    );

  if (item.appProps)
    return (
      <a
        class={baseClassName}
        onMouseUp={e => {
          e.preventDefault();
          onClose(onLaunchApp(item.appProps.app, item.appProps));
        }}
        href={item.link || "#"}
      >
        {item.icon && <Icon name={item.icon} size={iconSize} />}
        {item.text}
      </a>
    );
  return (
    <a class={baseClassName} href={item.link}>
      {item.icon && <Icon name={item.icon} size={iconSize} />}
      {item.text}
    </a>
  );
}
