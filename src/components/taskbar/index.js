import { h, render, Component } from "preact";
import Button from "../button";
import StartMenu from "./startmenu";
import Tray from "./tray";
import Icon from "../icon";
import "./style.css";

function Taskbar({
  startMenu = [],
  windows = [],
  trayItems = [],
  raisedWindow,
  raiseWindow,
  minimizeWindow,
  onLaunchApp
}) {
  return (
    <div className="ui95-taskbar">
      <StartMenu items={startMenu} onLaunchApp={onLaunchApp} />
      <div className="ui95-taskbar__windows">
        {windows.map(({ appName, appProps, windowProps }) => {
          const isRaisedWindow =
            raisedWindow && windowProps.key === raisedWindow.key;
          return (
            <Button
              key={appProps.key}
              classNames={`ui95-taskbar__window ${
                isRaisedWindow ? "active" : "inactive"
              }`}
              onClick={() => {
                if (windowProps.isMinimized || !isRaisedWindow) {
                  raiseWindow(windowProps.key);
                } else {
                  minimizeWindow(windowProps.key);
                }
              }}
            >
              <Icon
                size="16"
                name={appProps.icon || windowProps.icon || "default"}
              />
              {appProps.title}
            </Button>
          );
        })}
      </div>
      <Tray items={trayItems} />
    </div>
  );
}

export default Taskbar;
