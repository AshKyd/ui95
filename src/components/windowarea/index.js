import { h, render, Component } from "preact";
import "./style.css";

class WindowArea extends Component {
  render(props) {
    return <div className="ui95-windowarea">{props.children}</div>;
  }
}

export default WindowArea;
