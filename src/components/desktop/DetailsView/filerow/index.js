import { h, render, Component } from "preact";
import { getClasses } from "../../../../util";
import Icon from "../../../icon/index.js";
import Text from "../../../text/index.js";
import "./style.css";

function formatColumn(value) {
  if (!value) return "";
  if (value instanceof Date) {
    // Chop up the ECMA-262 date to look a little nicer
    return String(value)
      .replace(/:\d\d\s.*/, "")
      .slice(4);
  }
  return value;
}

class FileRow extends Component {
  render(props) {
    const {
      classNames = "",
      path,
      filename,
      icon,
      key,
      label,
      onClick,
      onSelect,
      selected,
      solidColor,
      image,
      imageAlt,
      columns = [],
      permalink
    } = props;
    const classNamesString = getClasses(
      "file-row",
      [
        selected ? "selected" : "deselected",
        solidColor ? "solid-color" : "no-color",
        ...classNames.split(" ")
      ].join(" ")
    );
    const performClick = e => {
      e.preventDefault();
      e.stopPropagation();
      onClick(props);
    };
    return (
      <tr
        className={classNamesString}
        onMouseEnter={() => onSelect(props)}
        onClick={performClick}
        key={path + filename}
      >
        <td className="ui95-file-row__label-icon">
          <Icon size="16" name={icon} />
        </td>
        <td>
          <a
            href={permalink || "#"}
            onClick={performClick}
            class="ui95-file-row__label"
          >
            <Text type="div">{label || filename}</Text>
          </a>
        </td>
        {columns.map(column => (
          <Text type="td" classNames="label" key={column}>
            {formatColumn(props[column])}
          </Text>
        ))}
      </tr>
    );
  }
}

export default FileRow;
