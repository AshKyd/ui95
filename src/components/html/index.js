import { h, render, Component } from "preact";

class HTML extends Component {
  constructor({ html }) {
    super();
    this.state = { html };
  }
  shouldComponentUpdate() {
    if (this.dirty) {
      this.dirty = false;
      return true;
    }
    return false;
  }
  componentWillReceiveProps(html) {
    if (html === this.state.html) return;
    this.dirty = true;
    this.setState({ html });
  }
  render(props) {
    const className = "ui95-html";
    return h(props.type || "div", {
      className: [className, ...(props.classNames || "").split(" ")].join(
        ` ${className}--`
      ),
      style: props.style,
      dangerouslySetInnerHTML: { __html: props.html }
    });
  }
}

export default HTML;
