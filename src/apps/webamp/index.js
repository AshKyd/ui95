import { h, render, Component } from "preact";
import Window from "../../components/window/index.js";

class Webamp extends Component {
  constructor(props) {
    super();
    this.state = {
      zIndex: props.zIndex
    };
  }
  componentWillReceiveProps(nextProps, nextContext) {
    this.setState(() => ({
      zIndex: nextProps.zIndex
    }));
  }
  componentDidMount() {
    import("webamp").then(WebAmp => {
      const webamp = new (WebAmp || WebAmp.default)({
        initialTracks: []
      });
      webamp.onClose(this.props.onClose);
      webamp.renderWhenReady(this.container);
    });
  }
  render({ url, onClose, onFocus }) {
    return (
      <div
        ref={e => (this.container = e)}
        style={{ zIndex: this.state.zIndex }}
      />
    );
  }
}

export default Webamp;
