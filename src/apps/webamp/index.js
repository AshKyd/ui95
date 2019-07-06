import { h, render, Component } from "preact";
import Window from "../../components/window/index.js";

class Webamp extends Component {
  componentDidMount() {
    this.loadAmp();
  }
  componentDidUpdate() {}
  loadAmp() {
    import("webamp").then(WebAmp => {
      this.webamp = new (WebAmp || WebAmp.default)({
        initialTracks: []
      });
      this.webamp.onClose(this.props.wmProps.onClose);
      this.webamp.onMinimize(this.props.wmProps.onMinimize);
      this.webamp.renderWhenReady(this.el);
    });
  }
  render({ url, onClose, onFocus, zIndex, wmProps }) {
    return (
      <div
        id="webamp-container"
        ref={el => (this.el = el)}
        style={{
          zIndex,
          ...(wmProps.isMinimized && {
            opacity: 0,
            pointerEvents: "none"
          })
        }}
      />
    );
  }
}

export default Webamp;
