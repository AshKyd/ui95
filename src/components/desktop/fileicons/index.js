import { h, render, Component } from "preact";
import FileIcon from "../fileicon/index.js";
import "./style.css";

class FileIcons extends Component {
  selectItem(item) {
    this.props.onSelect && this.props.onSelect(item);
    this.setState({ selected: item.key });
  }
  render(props) {
    return (
      <div class="ui95-file-icons">
        {Object.entries(props.items || {}).map(([label, item], index) => (
          <FileIcon
            {...item}
            label={label}
            key={index}
            selected={this.state.selected === index}
            onSelect={e => this.selectItem(e)}
            onClick={props.onClick}
          />
        ))}
      </div>
    );
  }
}

export default FileIcons;
