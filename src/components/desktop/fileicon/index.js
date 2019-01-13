import { h, render, Component } from "preact";
import Icon from "../../icon/index.js";
import Text from "../../text/index.js";
import "./style.css";

class FileIcon extends Component {
  render(props) {
    const className = "ui95-file-icon";
    const classNames = [
      className,
      props.selected ? "selected" : "deselected",
      ...(props.classNames || "").split(" ")
    ].join(` ${className}--`);
    return (
      <a
        className={classNames}
        onMouseEnter={() => props.onSelect(props)}
        onClick={() => props.onClick(props)}
      >
        <div class="ui95-file-icon__icon">
          <Icon size="32" name={props.icon} classNames="file-icon" />
        </div>
        <Text type="div" classNames="label">
          {props.filename}
        </Text>
      </a>
    );
  }
}

export default FileIcon;
