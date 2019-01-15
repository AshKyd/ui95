import { h, render, Component } from "preact";
import "./style.css";
import Button from "../button/index.js";
import Icon from "../icon/index.js";
import iconMinimize from "./icon-minimize.gif";

class Window extends Component {
  constructor(props) {
    if (!props.onFocus) throw new Error("Window needs onFocus handler");
    if (!props.onClose) throw new Error("Window needs onClose handler");
    super();
    this.state = {
      x: 0,
      y: 0,
      ...this.conformDimsToScreen(props.width, props.height)
    };
  }
  conformDimsToScreen(width, height) {
    return {
      width: Math.min(width || 800, window.innerWidth - 50),
      height: Math.min(height || 600, window.innerHeight - 50)
    };
  }
  componentDidMount() {
    this.onFocus = e => this.props.onFocus();
    this.ref.addEventListener("mousedown", this.onFocus);
  }
  componentWillUnmount() {
    this.ref.removeEventListener("mousedown", this.onFocus);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.conformDimsToScreen(
        nextProps.width || this.state.width,
        nextProps.height || this.state.height
      ),
      isMinimized:
        typeof nextProps.isMinimized === "boolean"
          ? nextProps.isMinimized
          : this.state.isMinimized
    });
  }
  toggleState(propName) {
    this.setState({ [propName]: !this.state[propName] });
  }
  /**
   * Handle window movement
   */
  mouseDown(e) {
    e.preventDefault();
    let coordsPrev;
    this.setState({ moving: true });
    const onMove = e => {
      const { clientX, clientY } = e.touches ? e.touches[0] : e;
      if (!coordsPrev) {
        coordsPrev = [clientX, clientY];
        return;
      }
      const [x, y] = coordsPrev;
      const [diffX, diffY] = [clientX - x, clientY - y];
      this.setState(prev => ({
        x: prev.x + diffX,
        y: prev.y + diffY
      }));
      coordsPrev = [clientX, clientY];
      e.preventDefault();
    };
    const onDone = () => {
      document.body.removeEventListener("mousemove", onMove);
      document.body.removeEventListener("mouseup", onDone);
      document.body.removeEventListener("touchmove", onMove, {
        passive: false
      });
      document.body.removeEventListener("touchend", onDone, { passive: false });
      this.setState({ moving: false });
    };
    document.body.addEventListener("mousemove", onMove);
    document.body.addEventListener("mouseup", onDone);
    document.body.addEventListener("touchmove", onMove, { passive: false });
    document.body.addEventListener("touchend", onDone, { passive: false });
  }
  render(props) {
    const className = "ui95-window";

    const buttonComponents = {
      minimize: (
        <Button
          classNames="titlebar minimize"
          onClick={() => setTimeout(this.toggleState("isMinimized"), 100)}
        >
          <Icon size="custom" name="windowMinimize" title="Minimize" />
        </Button>
      ),
      maximize: (
        <Button
          classNames="titlebar maximize"
          onClick={() => setTimeout(this.toggleState("isMaximized"), 100)}
        >
          {this.state.isMaximized ? (
            <Icon size="custom" name="windowRestore" title="Restore" />
          ) : (
            <Icon size="custom" name="windowMaximize" title="Maximize" />
          )}
        </Button>
      ),
      close: (
        <Button
          classNames="titlebar close"
          onClick={() => setTimeout(props.onClose, 100)}
        >
          <Icon size="custom" name="windowClose" title="Close" />
        </Button>
      )
    };

    const buttons = (props.buttons || "minimize maximize close")
      .split(" ")
      .map(key => buttonComponents[key]);

    return h(
      props.type || "div",
      {
        className: [
          className,
          this.state.isMaximized && "maximized",
          this.state.isMinimized && "minimized",
          this.state.isFocused && "focused",
          ...(props.classNames || "").split(" ")
        ]
          .filter(Boolean)
          .join(` ${className}--`),
        style: {
          width: this.state.width,
          height: this.state.height,
          transform: `translate(${this.state.x}px, ${this.state.y}px)`,
          zIndex: this.props.zIndex
        },
        ref: e => (this.ref = e)
      },
      [
        <h2
          class="ui95-window__titlebar"
          onMouseDown={e => this.mouseDown(e)}
          onTouchStart={e => this.mouseDown(e)}
        >
          {props.icon && (
            <Icon size="16" name={props.icon} classNames="application" />
          )}
          {props.title || "Untitled window"}
          <div class="ui95-window__titlebar-icons">{buttons}</div>
        </h2>,
        <div
          class="ui95-window__content"
          style={{
            "pointer-events": this.state.moving ? "none" : "inherit"
          }}
        >
          {props.children}
        </div>
      ]
    );
  }
}

export default Window;
