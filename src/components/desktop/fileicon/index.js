import { h, render, Component } from "preact";
import Icon from "../../icon/index.js";
import Text from "../../text/index.js";
import "./style.css";

class FileIcon extends Component {
  render(props) {
    const {
      classNames,
      filename,
      icon,
      label,
      onClick,
      onSelect,
      selected,
      solidColor
    } = props;
    const className = "ui95-file-icon";
    const classNamesString = [
      className,
      selected ? "selected" : "deselected",
      solidColor ? "solid-color" : "no-color",
      ...(classNames || "").split(" ")
    ].join(` ${className}--`);
    return (
      <a
        className={classNamesString}
        onMouseEnter={() => onSelect(props)}
        onClick={() => onClick(props)}
        href="#"
      >
        <div class="ui95-file-icon__icon">
          <Icon size="32" name={icon} classNames="file-icon" />
        </div>
        <Text type="div" classNames="label">
          {label}
        </Text>
      </a>
    );
  }
}

export default FileIcon;
