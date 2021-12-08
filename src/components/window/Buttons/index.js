import { h, render, Component } from "preact";
import Icon from "../../icon";
import Button from "../../button";
import "./style.css";

/**
 * stop propagation so buttons aren't overridden by the move handlers
 */
function stopPropagation(e) {
  e.stopPropagation();
}
export default function WindowButtons({
  buttons,
  onClose,
  onMinimize,
  toggleState,
  isMaximized = false
}) {
  return (
    <div
      class="ui95__window-buttons"
      onTouchStart={e => e.stopPropagation()}
      onTouchStart={stopPropagation}
      onMouseDown={stopPropagation}
    >
      {buttons.includes("minimize") && (
        <Button classNames="titlebar minimize" onClick={onMinimize}>
          <Icon size="custom" name="window-minimize" title="Minimize" />
        </Button>
      )}
      {buttons.includes("maximize") && (
        <Button
          classNames="titlebar maximize"
          onClick={() => toggleState("isMaximized")}
          ariaHidden
        >
          {isMaximized ? (
            <Icon size="custom" name="window-restore" title="Restore" />
          ) : (
            <Icon size="custom" name="window-maximize" title="Maximize" />
          )}
        </Button>
      )}
      {buttons.includes("close") && (
        <Button classNames="titlebar close" onClick={onClose}>
          <Icon size="custom" name="window-close" title="Close" />
        </Button>
      )}
    </div>
  );
}
