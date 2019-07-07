import { h, render, Component } from "preact";
import "./style.css";
import Bezel from "../bezel/index.js";
import MenuItem from "./menuitem";
import Branding from "./branding";
import classNames from "classnames";

class Menu extends Component {
  componentDidMount() {
    const {
      onClose,
      attachTo,
      attachDirection = "horizontal",
      isSubmenu,
      x,
      y
    } = this.props;
    // Close the menu when we blur
    this.onBlur = this.onBlur.bind(this);

    // Somehow the click handler from the opener is firing after the
    // component has mounted
    setTimeout(() => document.body.addEventListener("click", this.onBlur));
    if (isSubmenu) {
      setTimeout(() => document.body.addEventListener("blur", this.onBlur));
    }
    if (attachTo) {
      this.attach();
    }
    if (x && y) {
      this.attachToCoord(x, y);
    }
  }

  onBlur(e) {
    this.props.onClose();
  }

  attach() {
    const { attachTo, isSubmenu, attachDirection = "horizontal" } = this.props;

    const destRect = attachTo.getBoundingClientRect();
    const thisRect = this.el.getBoundingClientRect();
    let left, top;
    let x, y;
    if (attachDirection === "horizontal") {
      x = isSubmenu ? destRect.left + destRect.width - 4 : destRect.right;
      y = destRect.top - Math.round(thisRect.height / 2);
    }
    if (attachDirection === "top") {
      x = destRect.left;
      y = destRect.bottom;
    }
    if (attachDirection === "bottom") {
      x = destRect.left;
      y = destRect.top - thisRect.height;
    }
    this.attachToCoord(x, y);
  }
  attachToCoord(x, y) {
    const thisRect = this.el.getBoundingClientRect();
    if (x < 0) left = 0;
    if (y < 0) top = 0;
    if (y + thisRect.height > window.innerHeight)
      y = window.innerHeight - thisRect.height;

    this.el.style.left = `${x}px`;
    this.el.style.top = `${y}px`;
  }
  componentWillUnmount() {
    document.body.removeEventListener("click", this.onBlur);
  }
  render({
    className,
    items = [],
    onClose,
    onLaunchApp,
    zIndex = 1000,
    style,
    iconSize = 16,
    branding,
    deferAction
  }) {
    return (
      <div
        className={classNames(
          "ui95-menu",
          branding && "ui95-menu--with-branding",
          deferAction && "ui95-menu--defer-action"
        )}
        ref={el => (this.el = el)}
        style={{ zIndex, ...style }}
      >
        <Bezel classNames="out">
          {branding && <Branding {...branding} />}
          {items.map(item => (
            <MenuItem
              item={item}
              zIndex={zIndex}
              className={className}
              iconSize={iconSize}
              onClick={onClose}
            />
          ))}
        </Bezel>
      </div>
    );
  }
}

export default Menu;
