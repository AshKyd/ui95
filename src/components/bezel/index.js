import { h, render, Component } from "preact";
import { getClasses } from "../../util";

import "./style.css";

class Bezel extends Component {
  render(props) {
    return (
      <div class={getClasses("bezel", props.classNames)} style={props.style}>
        {props.children}
      </div>
    );
  }
}

export default Bezel;
