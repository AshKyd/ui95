import { h, render, Component } from "preact";
import "./style.css";

class Taskbar extends Component {
  render(props) {
    return <div className="ui95-start">{props.children}</div>;
  }
}

export default Taskbar;
