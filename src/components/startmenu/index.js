import { h, render, Component } from "preact";
import "./style.css";
import Divider from "../divider/index.js";
import Icon from "../icon/index.js";
import Menu from "../menu/index.js";

class StartMenu extends Component {
  constructor(props) {
    super();
    this.state = {
      items: props.items
    };
  }
  render({ text1, text2, isOpen, onClose, onLaunchApp }) {
    const renderableItems = Object.entries(this.state.items).map(
      ([key, value]) => {
        if (value === "divider") return <Divider classNames="horizontal" />;
        if (value.items)
          return (
            <a class="ui95-startmenu-entry">
              {key}
              <span>
                <Icon size="custom" name="chevronBlackRight" />
                <Icon size="custom" name="chevronWhiteRight" />
              </span>
              <Menu
                items={value.items}
                onLaunchApp={onLaunchApp}
                onClose={onClose}
              />
            </a>
          );
        if (value.appProps)
          return (
            <a
              class="ui95-startmenu-entry"
              onMouseUp={e => {
                e.preventDefault();
                onClose(onLaunchApp(value.appProps.app, value.appProps));
              }}
              href={value.link || "#"}
            >
              {key}
            </a>
          );
        return (
          <a class="ui95-startmenu-entry" href={value.link}>
            {key}
          </a>
        );
      }
    );
    return (
      <div
        className={`ui95-startmenu ${
          isOpen ? "ui95-startmenu--open" : "ui95-startmenu--closed"
        }`}
      >
        <div class="ui95-startmenu__branding">
          <div class="ui95-startmenu__branding-rotated">
            <span>{text1 || "Windows"}</span> <span>{text2 || "ME"}</span>
          </div>
        </div>
        <div class="ui95-startmenu-entries">{renderableItems}</div>
      </div>
    );
  }
}

export default StartMenu;
