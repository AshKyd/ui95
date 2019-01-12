import { h, render, Component } from "preact";
import "./style.css";
import Window from "../../components/window/index.js";
import Toolbar from "../../components/toolbar/index.js";
import menuItems from "./menuItems.js";

class Explorer extends Component {
  constructor(props) {
    super();
    this.state = {
      title: props.title,
      zIndex: props.zIndex
    };
  }
  componentWillReceiveProps(nextProps, nextContext) {
    this.setState(() => ({
      title: nextProps.title,
      zIndex: nextProps.zIndex
    }));
  }
  render({ error, onClose, onFocus, debugInfo }) {
    return (
      <Window
        title={this.state.title}
        zIndex={this.state.zIndex}
        classNames="explorer"
        width={640}
        height={480}
        onClose={onClose}
        onFocus={onFocus}
      >
        <Toolbar items={menuItems} />
      </Window>
    );
  }
}

export default Explorer;
