import { h, render, Component } from "preact";
import Window from "../../components/window/index.js";

class Webamp extends Component {
  componentDidMount() {
    import("webamp").then(WebAmp => {
      const webamp = new (WebAmp || WebAmp.default)({
        initialTracks: []
      });
      webamp.onClose(this.props.onClose);
      webamp.renderWhenReady(this.container);
    });
  }
  render({ url, onClose, onFocus, zIndex }) {
    return <div ref={e => (this.container = e)} style={{ zIndex }} />;
  }
}

export default Webamp;
