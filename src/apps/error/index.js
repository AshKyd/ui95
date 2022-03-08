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
      errorShown: false,
    };
    console.error("ErrorHandler", error);
  }
  render({ error, debugInfo, wmProps }) {
    try {
      const { errorShown } = this.state;
      const { message, stack } = error;
      const renderedDebugInfo = debugInfo
        ? [
            "Debug information follows:",
            "--------------------------",
            debugInfo,
          ].join("\n")
        : "";

      const errorDetails = [message, stack, renderedDebugInfo || ""].join("\n");

      // Emit a custom event so error logging listeners can report this
      try {
        var event = new ErrorEvent("ErrorHandler", { error });
        window.dispatchEvent(event);
      } catch (e) {}

      return (
        <Window
          classNames="error"
          width={400}
          isResizeable={false}
          height="auto"
          minHeight={125}
          buttons={["close"]}
          {...wmProps}
        >
          <div class="ui95-window-error">
            <div class="ui95-window-error__icon">
              <Icon name="error-circle" size="32" />
            </div>
            <div class="ui95-window-error__text">
              <Text style="margin-bottom:15px;">
                This program has performed an illegal operation and will be shut
                down.
              </Text>
              <Text>If the problem persists, contact the program vendor. </Text>
            </div>
            <div class="ui95-window-error__buttons">
              <Button onClick={wmProps.onClose}>Close</Button>
              <Button disabled={true}>Debug</Button>
              <Button
                onClick={() => this.setState({ errorShown: !errorShown })}
              >
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
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}

export default ErrorHandler;
