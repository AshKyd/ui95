import { h, render, Component } from "preact";
import Icon from "../../Icon/";
import Divider from "../../Divider";
import Text from "../../Text";
import SubMenuItem from "../SubMenuItem";
import "./style.css";

export default function ({
  item,
  onLaunchApp,
  onClose,
  zIndex,
  iconSize,
  className,
  onClick,
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
  if (item.items) {
    return (
      <SubMenuItem
        {...{
          item,
          onLaunchApp,
          onClose,
          zIndex,
          baseClassName,
          iconSize,
          onClick,
        }}
      />
    );
  }

  function click(e) {
    console.log("clicked!!!!!", item);
    if (item.link) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    if (item.onClick) {
      return item.onClick();
    }
    onClick(item.appProps);
  }

  return (
    <a
      class={baseClassName}
      onMouseUp={click}
      onTouchEnd={click}
      onKeyPress={click}
      href={item.link || "#"}
      target={item.link ? "_blank" : ""}
    >
      {item.icon && <Icon name={item.icon} size={iconSize} />}
      <Text>{item.text}</Text>
    </a>
  );
}
