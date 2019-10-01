import { h, render, Component } from "preact";

class HTML extends Component {
  shouldComponentUpdate(previousState) {
    return previousState.html !== this.props.html;
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
