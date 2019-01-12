import { h, render, Component } from "preact";
import "./style.css";
import Window from "../../components/window/index.js";

class Webview extends Component {
  constructor(props) {
    super();
    this.state = {
      zIndex: props.zIndex
    };
  }
  componentWillReceiveProps(nextProps, nextContext) {
    this.setState(() => ({
      zIndex: nextProps.zIndex,
      isMinimized: nextProps.isMinimized
    }));
  }
  render({ url, onClose, onFocus }) {
    return (
      <Window
        title={this.state.title}
        zIndex={this.state.zIndex}
        classNames="error"
        width={800}
        height={600}
        isMinimized={this.state.isMinimized}
        onClose={onClose}
        onFocus={onFocus}
      >
        <iframe class="ui95-webview" src={this.props.src} />
      </Window>
    );
  }
}

export default Webview;
