import { h, render, Component } from "preact";
import "./style.css";
import Window from "../../components/window/index.js";
import Button from "../../components/button/index.js";
import Icon from "../../components/icon/index.js";
import Text from "../../components/text/index.js";
import Input from "../../components/forms/input/index.js";

class ErrorHandler extends Component {
  constructor({ error, title, zIndex }) {
    super();
    this.state = {
      title: title,
      zIndex: zIndex,
      errorShown: false,
      message: error.message,
      stack: error.stack || new Error().stack
    };
    console.error("ErrorHandler", error);
  }
  componentWillReceiveProps(nextProps, nextContext) {
    this.setState(() => ({
      title: nextProps.title,
      zIndex: nextProps.zIndex
    }));
  }
  render({ error, onClose, onFocus, debugInfo }) {
    const { message, stack, title, zIndex, errorShown } = this.state;
    const renderedDebugInfo = debugInfo
      ? [
          "Debug information follows:",
          "--------------------------",
          debugInfo
        ].join("\n")
      : "";

    const errorDetails = [message, stack, renderedDebugInfo || ""].join("\n");

    return (
      <Window
        title={title}
        zIndex={zIndex}
        classNames="error"
        width={400}
        resizeable={false}
        height={errorShown ? 270 : 125}
        buttons="close"
        onClose={onClose}
        onFocus={onFocus}
      >
        <div class="ui95-window-error">
          <div class="ui95-window-error__icon">
            <Icon name="errorCircle" size="32" />
          </div>
          <div class="ui95-window-error__text">
            <Text style="margin-bottom:15px;">
              This program has performed an illegal operation and will be shut
              down.
            </Text>
            <Text>If the problem persists, contact the program vendor. </Text>
          </div>
          <div class="ui95-window-error__buttons">
            <Button onClick={onClose}>Close</Button>
            <Button disabled={true}>Debug</Button>
            <Button onClick={() => this.setState({ errorShown: !errorShown })}>
              Details
            </Button>
          </div>
        </div>
        {errorShown && (
          <Input
            multiline={true}
            disabled={true}
            width="375px"
            height="130px"
            style={{ marginLeft: "11px" }}
            value={errorDetails}
          />
        )}
      </Window>
    );
  }
}

export default ErrorHandler;
