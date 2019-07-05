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

    this.props = props;
    this.state = {
      x: 0,
      y: 0,
      hasResized: false,
      minWidth: props.minWidth || 0,
      minHeight: props.minHeight || 0
    };
    this.state = {
      ...this.conformDimsToScreen(props.width, props.height),
      ...this.state
    };
  }
  conformDimsToScreen(width, height) {
    const newWidth = Math.max(
      this.state.minWidth,
      Math.min(width || 800, window.innerWidth - 50)
    );
    const newHeight = Math.max(
      this.state.minHeight,
      Math.min(height || 600, window.innerHeight - 50)
    );
    return {
      width: width === "auto" ? "auto" : newWidth,
      height: height === "auto" ? "auto" : newHeight
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
  mouseDownMoveWindow(e) {
    // Don't override button actions
    if (e.target.tagName === "BUTTON") return;

    e.preventDefault();
    if (this.state.isMaximized) return;
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
  isResizeable() {
    return this.props.resizeable !== false;
  }

  /**
   * Handle window resize
   */
  mouseDownResizeWindow(e, direction) {
    e.preventDefault();
    if (this.state.isMaximized) return;
    if (!this.isResizeable()) return;

    let applyWidth = ["corner", "left", "right"].includes(direction);
    let applyHeight = ["corner", "top", "bottom"].includes(direction);
    let widthOperator = direction === "left" ? -1 : +1;
    let heightOperator = direction === "top" ? -1 : +1;

    e.preventDefault();
    let coordsPrev;
    this.setState({ resizing: true });
    const onMove = e => {
      const { clientX, clientY } = e.touches ? e.touches[0] : e;
      if (!coordsPrev) {
        coordsPrev = [clientX, clientY];
        return;
      }

      const [diffX, diffY] = [clientX - coordsPrev[0], clientY - coordsPrev[1]];

      const width = applyWidth
        ? Math.max(
            this.state.minWidth,
            this.state.width + diffX * widthOperator
          )
        : this.state.width;
      const height = applyHeight
        ? Math.max(
            this.state.minHeight,
            this.state.height + diffY * heightOperator
          )
        : this.state.height;

      const x = direction === "left" ? this.state.x + diffX : this.state.x;
      const y = direction === "top" ? this.state.y + diffY : this.state.y;

      this.setState(prev => ({ width, height, x, y }));
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

    function stopPropagation(e) {
      e.stopPropagation();
    }

    const buttonComponents = {
      minimize: (
        <Button
          classNames="titlebar minimize"
          onTouchStart={stopPropagation}
          onClick={() => setTimeout(this.toggleState("isMinimized"), 100)}
        >
          <Icon size="custom" name="window-minimize" title="Minimize" />
        </Button>
      ),
      maximize: (
        <Button
          classNames="titlebar maximize"
          onTouchStart={stopPropagation}
          onClick={() => setTimeout(this.toggleState("isMaximized"), 100)}
        >
          {this.state.isMaximized ? (
            <Icon size="custom" name="window-restore" title="Restore" />
          ) : (
            <Icon size="custom" name="window-maximize" title="Maximize" />
          )}
        </Button>
      ),
      close: (
        <Button
          classNames="titlebar close"
          onTouchStart={stopPropagation}
          onClick={() => setTimeout(props.onClose, 100)}
        >
          <Icon size="custom" name="window-close" title="Close" />
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
          onMouseDown={e => this.mouseDownMoveWindow(e)}
          onTouchStart={e => this.mouseDownMoveWindow(e)}
        >
          {props.icon && (
            <Icon size="16" name={props.icon} classNames="application" />
          )}
          {props.title || "Untitled window "}
          <div class="ui95-window__titlebar-icons">{buttons}</div>
        </h2>,
        <div
          class="ui95-window__content"
          style={{
            "pointer-events": this.state.moving ? "none" : "unset"
          }}
        >
          {props.children}
          {this.isResizeable() &&
            ["left", "right", "top", "bottom", "corner"].map(position => (
              <div
                class={`ui95-window__resize-${position}`}
                onMouseDown={e => this.mouseDownResizeWindow(e, position)}
                onTouchStart={e => this.mouseDownResizeWindow(e, position)}
              />
            ))}
        </div>
      ]
    );
  }
}

export default Window;
