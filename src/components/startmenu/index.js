import { h, render, Component } from "preact";
import Menu from "../menu";
import Button from "../button";
import "./index.css";

export default class StartMenu extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      el: undefined
    };
  }
  render({
    items = [],
    branding = { text1: "Windows", text2: "ME" },
    attachTo,
    onLaunchApp
  }) {
    const { open, el } = this.state;
    return (
      <div className="ui95-startmenu">
        <Button
          ref={el => (this.el = el)}
          onClick={() => this.setState({ open: !open })}
          fwdRef={newEl => {
            if (el !== newEl) this.setState({ el: newEl });
          }}
          classNames={["start-menu", open && "active"].join(" ")}
        >
          Start
        </Button>
        {open && (
          <Menu
            className="large"
            iconSize={24}
            attachDirection="bottom"
            branding={branding}
            items={items}
            attachTo={el}
            onClose={app => {
              this.setState({ open: false });
              console.log(app);
              if (app) onLaunchApp(app.app, app);
            }}
          />
        )}
      </div>
    );
  }
}

// <Menu
//   className="large"
//   iconSize={24}
//   attachDirection="bottom"
//   branding={branding}
//   items={items}
//   attachTo={attachTo}
//   onChange={(...args) => {
//     this.setState({ open: false });
//     if(...args.length) this.openWindow(...args);
//   }}
// />
