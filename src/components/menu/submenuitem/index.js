import { h, render, Component } from "preact";
import Icon from "../../icon";
import Menu from "../";
import "./style.css";

export default class SubMenuItem extends Component {
  constructor() {
    super();
    this.state = { open: false, canBlur: true };
  }

  render({
    item,
    onLaunchApp,
    onClose,
    zIndex,
    baseClassName,
    iconSize,
    onClick
  }) {
    return (
      <a
        class={`${baseClassName} ui95-menuitem--submenu`}
        onMouseEnter={() => this.setState({ open: true })}
        onFocus={() => this.setState({ open: true })}
        ref={el => (this.el = el)}
        onClick={e => {
          console.log("focusing", this.el);
          this.setState({ open: true });
          this.el.focus();
          e.preventDefault();
          e.stopPropagation();
        }}
        href="#"
      >
        {item.icon && <Icon name={item.icon} size={iconSize} />}
        {item.text}
        <span>
          <Icon size="custom" name="chevronBlackRight" />
          <Icon size="custom" name="chevronWhiteRight" />
        </span>
        {this.state.open && (
          <Menu
            items={item.items}
            onLaunchApp={onLaunchApp}
            onClose={onClick}
            attachTo={this.el}
            isSubmenu={true}
            zIndex={zIndex + 1}
          />
        )}
      </a>
    );
  }
}
