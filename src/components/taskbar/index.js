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
  onLaunchApp,
  shell
}) {
  return (
    <div className="ui95-taskbar">
      <StartMenu items={startMenu} onLaunchApp={onLaunchApp} />
      <div className="ui95-taskbar__windows">
        {windows.map(({ appName, appProps, windowProps }) => {
          const isRaisedWindow =
            raisedWindow && windowProps.key === raisedWindow.key;
          function minimize() {
            minimizeWindow(windowProps.key);
          }
          function restore() {
            raiseWindow(windowProps.key);
          }
          return (
            <Button
              key={appProps.key}
              classNames={`ui95-taskbar__window ${
                isRaisedWindow ? "active" : "inactive"
              }`}
              onClick={() => {
                if (windowProps.isMinimized || !isRaisedWindow) {
                  restore();
                } else {
                  minimize();
                }
              }}
              onContextMenu={e => {
                e.preventDefault();
                e.stopPropagation();
                shell &&
                  shell.openContextMenu({
                    x: e.clientX,
                    y: e.clientY,
                    items: [
                      {
                        text: "Restore",
                        disabled: !windowProps.isMinimized,
                        onClick: restore
                      },
                      { text: "Maximize", disabled: true },
                      {
                        text: "Minimize",
                        disabled: windowProps.isMinimized,
                        onClick: minimize
                      },
                      "divider",
                      {
                        text: "Close",
                        onClick: () => shell.closeWindow(windowProps.key)
                      }
                    ]
                  });
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
