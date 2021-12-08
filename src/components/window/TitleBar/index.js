import { h, render, Component } from "preact";
import Icon from "../../icon";
import Text from "../../text";
import Buttons from "../Buttons";
import "./style.css";

export default function WindowButtons({
  icon,
  title = "Untitled window",
  onMove,
  onClose,
  onMinimize,
  isMaximized,
  toggleState,
  buttons
}) {
  return (
    <div
      class="ui95-window-titlebar"
      onMouseDown={onMove}
      onTouchStart={onMove}
      onDoubleClick={() => buttons.includes("maximize") && toggleState("isMaximized")}
    >
      <Text type="h1" className="ui95-window-titlebar__heading">
        {icon && (
          <Icon
            size="16"
            name={icon}
            classNames="application"
            onDblClick={onClose}
          />
        )}
        {title}
      </Text>
      <Buttons
        buttons={buttons}
        isMaximized={isMaximized}
        toggleState={toggleState}
        onClose={onClose}
        onMinimize={onMinimize}
      />
    </div>
  );
}
