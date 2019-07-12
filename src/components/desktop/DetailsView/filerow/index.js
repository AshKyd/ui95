import { h, render, Component } from "preact";
import { getClasses } from "../../../../util";
import Icon from "../../../icon/index.js";
import Text from "../../../text/index.js";
import "./style.less";

class FileRow extends Component {
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
        key={key}
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
            <Text type="div">{label}</Text>
          </a>
        </td>
        {columns.map(column => (
          <Text type="td" classNames="label" key={column}>
            {props[column]}
          </Text>
        ))}
      </tr>
    );
  }
}

export default FileRow;
