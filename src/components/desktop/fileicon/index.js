import { h, render, Component } from "preact";
import { getClasses } from "../../../util";
import Icon from "../../icon/index.js";
import Text from "../../text/index.js";
import "./style.css";

class FileIcon extends Component {
  render(props) {
    const {
      classNames = "",
      filename,
      icon,
      appProps,
      key,
      label,
      onClick,
      onSelect,
      selected,
      solidColor
    } = props;
    const classNamesString = getClasses(
      "file-icon",
      [
        selected ? "selected" : "deselected",
        solidColor ? "solid-color" : "no-color",
        ...classNames.split(" ")
      ].join(" ")
    );
    return (
      <a
        className={classNamesString}
        onMouseEnter={() => onSelect(props)}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          onClick(props);
        }}
        href={(appProps && appProps.permalink) || "#"}
        key={key}
      >
        <div class="ui95-file-icon__icon">
          <Icon size="32" name={icon} classNames="file-icon" />
        </div>
        <Text type="div" classNames="label">
          {label || filename}
        </Text>
      </a>
    );
  }
}

export default FileIcon;
