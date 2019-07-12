import { h, render, Component } from "preact";
import { getClasses } from "../../../util";
import Icon from "../../icon/index.js";
import Text from "../../text/index.js";
import "./style.css";

class FileThumbnail extends Component {
  render(props) {
    const {
      classNames = "",
      filename,
      icon,
      key,
      label,
      onClick,
      onSelect,
      selected,
      solidColor,
      image,
      imageAlt
    } = props;
    const classNamesString = getClasses(
      "file-thumbnail",
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
        href="#"
        key={key}
      >
        <div class="ui95-file-thumbnail__icon">
          {image ? (
            <img src={image} alt={imageAlt} />
          ) : (
            <Icon size="32" name={icon} classNames="file-icon" />
          )}
        </div>
        <Text type="div" classNames="label">
          {label}
        </Text>
      </a>
    );
  }
}

export default FileThumbnail;
