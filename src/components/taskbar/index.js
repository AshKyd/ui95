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
  onLaunchApp
}) {
  console.log(windows);
  return (
    <div className="ui95-taskbar">
      <StartMenu items={startMenu} onLaunchApp={onLaunchApp} />
      <div className="ui95-taskbar__windows">
        {windows.map(([appName, appProps]) => (
          <Button
            key={appProps.key}
            classNames={`ui95-taskbar__window ${
              appProps.key === raisedWindow.key ? "active" : "inactive"
            }`}
            onClick={() => raiseWindow(appProps.key)}
          >
            <Icon size="16" />
            {appProps.title}
          </Button>
        ))}
      </div>
      <Tray items={trayItems} />
    </div>
  );
}

export default Taskbar;
