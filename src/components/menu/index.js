import { h, render, Component } from "preact";
import "./style.css";
import Bezel from "../bezel/index.js";
import MenuItem from "./menuitem";
import Branding from "./branding";

class Menu extends Component {
  componentDidMount() {
    const {
      onClose,
      attachTo,
      attachDirection = "horizontal",
      isSubmenu
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
  }

  onBlur(e) {
    this.props.onClose();
  }

  attach() {
    const { attachTo, isSubmenu, attachDirection = "horizontal" } = this.props;

    const rect = attachTo.getBoundingClientRect();
    const thisRect = this.el.getBoundingClientRect();
    let left, top;
    if (attachDirection === "horizontal") {
      left = isSubmenu ? rect.left + rect.width - 4 : rect.right;
      top = rect.top - Math.round(thisRect.height / 2);
    }
    if (attachDirection === "top") {
      left = rect.left;
      top = rect.bottom;
    }
    if (attachDirection === "bottom") {
      left = rect.left;
      top = rect.top - thisRect.height;
    }

    if (left < 0) left = 0;
    if (top < 0) top = 0;
    if (top + thisRect.height > window.innerHeight)
      top = window.innerHeight - thisRect.height;

    this.el.style.left = `${left}px`;
    this.el.style.top = `${top}px`;
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
    iconSize,
    branding
  }) {
    return (
      <div
        className={`ui95-menu ${branding ? "ui95-menu--with-branding" : ""}`}
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
