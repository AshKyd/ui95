import { h, render, Component } from "preact";
import loadGoogleApi from "./loadGoogleApi";

class SubscribeButton extends Component {
  componentShouldUpdate() {
    return false;
  }
  componentDidMount() {
    loadGoogleApi().then(gapi => {
      gapi.ytsubscribe.render(this.rootElement, this.props);
    });
  }
  render() {
    return (
      <div class="ui95-mpsubscribe">
        <div ref={ref => (this.rootElement = ref)} />
      </div>
    );
  }
}

export default SubscribeButton;
