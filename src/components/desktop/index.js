import { h, render, Component } from "preact";
import "./style.css";

class Desktop extends Component {
  render(props) {
    return <div className="ui95-desktop">{props.children}</div>;
  }
}

export default Desktop;
