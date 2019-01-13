import { h, render, Component } from "preact";
import Icon from "../../img/index.js";
import Text from "../../text/index.js";
import "./style.css";

class ToolbarItem extends Component {
  render(props) {
    const className = "ui95-toolbar-item";
    const onClick = () => props.onClick(props);
    const classNames = [className, props.iconOnly ? "icon" : "text"].join(
      ` ${className}--`
    );
    return (
      <button class={classNames} onClick={onClick}>
        {props.icon && <Icon size={16} name={props.icon} />}
        {!props.iconOnly && <Text>{props.label}</Text>}
      </button>
    );
  }
}

export default ToolbarItem;
