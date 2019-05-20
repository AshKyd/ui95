import { h, render, Component } from "preact";
import "./style.css";
import Bezel from "../bezel/index.js";
import MenuItem from "./menuitem";

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
    let left, top;
    if (attachDirection === "horizontal") {
      left = isSubmenu ? rect.width - 4 : rect.right;
      top = isSubmenu ? 0 : rect.top;
    }
    if (attachDirection === "top") {
      left = rect.left;
      top = rect.bottom;
    }
    if (attachDirection === "bottom") {
      const thisRect = this.el.getBoundingClientRect();
      left = rect.left;
      top = rect.top - thisRect.height;
    }

    this.el.style.left = `${left}px`;
    this.el.style.top = `${top}px`;
  }
  componentWillUnmount() {
    document.body.removeEventListener("click", this.onBlur);
  }
  render({
    classNames,
    items = [],
    onClose,
    onLaunchApp,
    zIndex = 1000,
    style
  }) {
    return (
      <div
        class={`ui95-menu ${classNames || ""}`}
        ref={el => (this.el = el)}
        style={{ zIndex, ...style }}
      >
        <Bezel classNames="out">
          {items.map(item => (
            <MenuItem item={item} zIndex={zIndex} />
          ))}
        </Bezel>
      </div>
    );
  }
}

export default Menu;
