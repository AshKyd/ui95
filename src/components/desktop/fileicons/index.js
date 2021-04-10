import { h, render, Component } from "preact";
import FileIcon from "../fileicon/index.js";
import "./style.css";

class FileIcons extends Component {
  selectItem(item) {
    this.props.onSelect && this.props.onSelect(item);
    this.setState({ selected: item.key });
  }
  render({
    items,
    onClick,
    solidColor,
    Icon = FileIcon,
    direction = "row",
    mode = "explorer",
  }) {
    return (
      <ul
        class={`ui95-file-icons ui95-file-icons--${direction}  ui95-file-icons--${mode}`}
      >
        {Object.entries(items || {}).map(([filename, item], index) => (
          <li class="ui95-file-icons__item" key={item.filename + item.path}>
            <Icon
              {...item}
              solidColor={solidColor}
              label={item.label || item.filename}
              key={index}
              selected={item.selected || this.state.selected === index}
              onSelect={(e) => this.selectItem(e)}
              onClick={() => onClick(item)}
            />
          </li>
        ))}
      </ul>
    );
  }
}

export default FileIcons;
