import { h, render, Component } from "preact";

class Image extends Component {
  render(props) {
    return (
      <img
        src={props.src}
        className={props.className}
        style="image-rendering: optimizeSpeed;"
      />
    );
  }
}

export default Image;
