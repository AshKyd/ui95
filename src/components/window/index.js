import { h, render, Component } from "preact";
import Buttons from "./Buttons";
import TitleBar from "./TitleBar";
import Icon from "../icon";
import Text from "../text";
import classNames from "classnames";
import "./style.css";

/**
 * Given a width and a height, ensure it fits sensibly on the screen.
 * @param  {Number} width  Window width
 * @param  {Number} height Window height
 * @return {Object}        A {width, height} object
 */
function conformDimsToScreen({
  width = 800,
  height = 600,
  minWidth = 0,
  minHeight = 0
}) {
  const newWidth = Math.max(
    minWidth,
    Math.min(width || 800, window.innerWidth - 50)
  );
  const newHeight = Math.max(
    minHeight,
    Math.min(height || 600, window.innerHeight - 50)
  );

  return {
    width: width === "auto" ? "auto" : newWidth,
    height: height === "auto" ? "auto" : newHeight,
    minWidth,
    minHeight
  };
}

class Window extends Component {
  constructor(props) {
    super(props);
    Object.assign(this, conformDimsToScreen(props));

    if (props.shell) {
      const offset =
        window.innerWidth < 400
          ? 30
          : Math.min(50, props.shell.state.windows.length * 30);
      this.x = offset;
      this.y = offset;
    }

    if (props.center) {
      this.x =
        window.innerWidth / 2 - (this.width === "auto" ? 0 : this.width) / 2;
      this.y =
        window.innerHeight / 2 - (this.height === "auto" ? 0 : this.height) / 2;
    }

    this.state = {
      isMaximized: window.innerWidth < 400 ? true : false
    };
  }
  componentDidMount() {
    this.onFocus = e => this.props.onFocus();
    this.el.addEventListener("mousedown", this.onFocus);
    this.el.addEventListener("touchStart", this.onFocus);
    this.updateWindowDims();
  }
  componentWillReceiveProps({ width, height }) {
    if (width || height) {
      Object.assign(
        this,
        conformDimsToScreen({ ...this.props, width, height })
      );
    }
  }
  componentWillUnmount() {
    this.el.removeEventListener("mousedown", this.onFocus);
  }
  mouseDownMoveWindow(e) {
    e.stopPropagation();
    e.preventDefault();
    if (this.state.isMaximized) return;
    this.setState({ isMoving: true });
    let coordsPrev;
    const onMove = e => {
      const { clientX, clientY } = e.touches ? e.touches[0] : e;
      if (!coordsPrev) {
        coordsPrev = [clientX, clientY];
        return;
      }
      const [x, y] = coordsPrev;
      const [diffX, diffY] = [clientX - x, clientY - y];
      this.x += diffX;
      this.y += diffY;
      this.updateWindowDims();

      coordsPrev = [clientX, clientY];
      e.preventDefault();
    };
    const onDone = () => {
      this.setState({ isMoving: false });
      document.body.removeEventListener("mousemove", onMove);
      document.body.removeEventListener("mouseup", onDone);
      document.body.removeEventListener("touchmove", onMove, {
        passive: false
      });
      document.body.removeEventListener("touchend", onDone, { passive: false });
    };
    document.body.addEventListener("mousemove", onMove);
    document.body.addEventListener("mouseup", onDone);
    document.body.addEventListener("touchmove", onMove, { passive: false });
    document.body.addEventListener("touchend", onDone, { passive: false });
  }
  mouseDownResizeWindow(e, direction) {
    const { isMaximized } = this.state;
    const { isResizeable } = this.props;

    e.preventDefault();
    e.stopPropagation();

    if (isMaximized) return;
    if (isResizeable === false) return;
    this.setState({ isMoing: true });

    let applyWidth = ["corner", "left", "right"].includes(direction);
    let applyHeight = ["corner", "top", "bottom"].includes(direction);
    let widthOperator = direction === "left" ? -1 : +1;
    let heightOperator = direction === "top" ? -1 : +1;

    let coordsPrev;
    const onMove = e => {
      const { clientX, clientY } = e.touches ? e.touches[0] : e;
      if (!coordsPrev) {
        coordsPrev = [clientX, clientY];
        return;
      }

      const [diffX, diffY] = [clientX - coordsPrev[0], clientY - coordsPrev[1]];

      const width = applyWidth
        ? Math.max(this.minWidth, this.width + diffX * widthOperator)
        : this.width;
      const height = applyHeight
        ? Math.max(this.minHeight, this.height + diffY * heightOperator)
        : this.height;

      const x = direction === "left" ? this.x + diffX : this.x;
      const y = direction === "top" ? this.y + diffY : this.y;

      Object.assign(this, { width, height, x, y });
      this.updateWindowDims();
      coordsPrev = [clientX, clientY];
      e.preventDefault();
    };
    const onDone = () => {
      this.setState({ isMoving: false });
      document.body.removeEventListener("mousemove", onMove);
      document.body.removeEventListener("mouseup", onDone);
      document.body.removeEventListener("touchmove", onMove, {
        passive: false
      });
      document.body.removeEventListener("touchend", onDone, { passive: false });
    };
    document.body.addEventListener("mousemove", onMove);
    document.body.addEventListener("mouseup", onDone);
    document.body.addEventListener("touchmove", onMove, { passive: false });
    document.body.addEventListener("touchend", onDone, { passive: false });
  }

  /**
   * Update the dimensions & position of our element.
   * Don't use (p)React for this, because it's slower to do a vdom render
   */
  updateWindowDims() {
    if (!this.el) return;
    this.el.style.transform = `translate(${this.x}px, ${this.y}px)`;
    this.el.style.width = this.width + "px";
    this.el.style.height = this.height + "px";
  }

  render(props) {
    const { isMaximized, isMoving } = this.state;
    const { width, height } = this;
    const {
      isFocused,
      isMinimized,
      zIndex,
      children,
      isResizeable,
      icon,
      title,
      buttons=["minimize", "maximize", "close"],
      onClose,
      onMinimize
    } = props;

    const windowClasses = classNames(
      "ui95-window",
      isMinimized && "ui95-window--minimized",
      isMaximized && "ui95-window--maximized",
      isFocused && "ui95-window--focused",
      (" " + (props.classNames || props.className || ""))
        .split(" ")
        .join(" ui95-window--")
    );

    return (
      <article
        class={windowClasses}
        style={{ width, height, zIndex }}
        ref={el => (this.el = el)}
        ariaHidden={!!isMinimized}
      >
        <div>
          <TitleBar
            buttons={buttons}
            onMove={e => this.mouseDownMoveWindow(e)}
            onClose={onClose}
            onMinimize={onMinimize}
            icon={icon}
            title={title}
            isMaximized={isMaximized}
            toggleState={propName =>
              this.setState({ [propName]: !this.state[propName] })
            }
          />
          {isResizeable !== false &&
            ["left", "right", "top", "bottom", "corner"].map(position => (
              <div
                class={`ui95-window__resize-${position}`}
                onMouseDown={e => this.mouseDownResizeWindow(e, position)}
                onTouchStart={e => this.mouseDownResizeWindow(e, position)}
              />
            ))}
        </div>
        <div
          class="ui95-window__content"
          style={{
            // Disable pointer events so the app contents don't steal our handlers
            "pointer-events": isMoving ? "none" : "unset"
          }}
        >
          {children}
        </div>
      </article>
    );
  }
}

export default Window;
