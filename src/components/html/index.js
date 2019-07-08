import { h, render, Component } from "preact";

class HTML extends Component {
  shouldComponentUpdate(previousState) {
    console.log({
      previousLength: previousState.html && previousState.html.length,
      current: this.props.html && this.props.html.length
    });
    return previousState.html !== this.props.html;
  }
  render(props) {
    const className = "ui95-html";
    console.log("html render");
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
