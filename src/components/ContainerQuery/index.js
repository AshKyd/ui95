import { h, render, Component } from "preact";
import { ResizeObserver } from "resize-observer";
import classNames from "classnames";

class ContainerQuery extends Component {
  constructor() {
    super();
    this.state = { resizedClassNames: "", contentRect: {} };
  }
  componentDidMount() {
    const { resizeClassNames = () => {} } = this.props;
    const ro = new ResizeObserver(([entry]) => {
      const { contentRect } = entry;
      this.setState({
        contentRect,
        resizedClassNames: resizeClassNames(contentRect)
      });
    });
    ro.observe(this.el);
  }
  render(props) {
    const { resizedClassNames } = this.state;
    return (
      <div
        ref={el => (this.el = el)}
        {...props}
        class={classNames(props.className, resizedClassNames)}
      >
        {props.children}
      </div>
    );
  }
}

export default ContainerQuery;
