import { h, render, Component } from "preact";
import Icon from "../../icon";
import Divider from "../../divider";
import Text from "../../text";
import SubMenuItem from "../submenuitem";
import "./style.css";

export default function({
  item,
  onLaunchApp,
  onClose,
  zIndex,
  iconSize,
  className,
  onClick
}) {
  const baseClassName = `ui95-menuitem ${
    className ? `ui95-menuitem--${className}` : ""
  }`;
  if (item === "divider") return <Divider classNames="horizontal" />;

  if (item.disabled) {
    return (
      <span className={`${baseClassName} ui95-menuitem--disabled`}>
        <Text>{item.text}</Text>
      </span>
    );
  }
  if (item.items)
    return (
      <SubMenuItem
        {...{
          item,
          onLaunchApp,
          onClose,
          zIndex,
          baseClassName,
          iconSize,
          onClick
        }}
      />
    );

  function click(e) {
    if (item.link) return window.open(item.link);
    if (item.onClick) return item.onClick();
    if (!item.appProps && item.link) return;
    e.preventDefault();
    onClick(item.appProps);
  }

  return (
    <a
      class={baseClassName}
      onMouseUp={click}
      onTouchEnd={click}
      onKeyPress={click}
      href={item.link || "#"}
      target="_blank"
    >
      {item.icon && <Icon name={item.icon} size={iconSize} />}
      <Text>{item.text}</Text>
    </a>
  );
}
