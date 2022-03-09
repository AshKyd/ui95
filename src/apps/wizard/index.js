import { h, render, Component } from "preact";
import Window from "../../components/window/index.js";
import Radio from "../../components/forms/radio/index.js";
import Button from "../../components/button/index.js";
import Bezel from "../../components/bezel/index.js";
import Text from "../../components/text/index.js";
import Img from "../../components/img/index.js";
import Divider from "../../components/divider/index.js";
import "./style.css";

class Wizard extends Component {
  constructor(props) {
    super();
    this.state = {
      selected: 0,
      action: Object.values(props.wizardOptions)[0],
      steps: [
        {
          content: props.content,
          wizardOptions: props.wizardOptions,
          buttonText: props.buttonText || "Next >",
        },
      ],
    };
  }
  componentDidMount() {
    // If firstRun, check if we've already run before
    const { firstRun, localStorageKey } = this.props;
    if (!firstRun || !localStorageKey) {
      return;
    }

    try {
      if (localStorage[localStorageKey]) {
        return this.props.wmProps.onClose();
      }
    } catch (e) {}
  }
  prepareAction(action, selected) {
    this.setState({ action, selected });
  }
  goBack() {
    this.setState({
      selected: 0,
      action: Object.values(
        this.state.steps[this.state.steps.length - 2].wizardOptions
      )[0],
      steps: this.state.steps.slice(0, -1),
    });
  }
  close() {
    // Set the localStorage key so we don't show this again
    try {
      if (this.props.localStorageKey) {
        localStorage[this.props.localStorageKey] = "closed";
      }
    } catch (e) {}

    return this.props.wmProps.onClose();
  }
  performAction() {
    const action = this.state.action;

    if (!action) {
      this.close();
      return;
    }

    if (action.mode === "update") {
      return this.setState({
        selected: 0,
        action: Object.values(action.wizardOptions)[0],
        steps: [
          ...this.state.steps,
          {
            content: action.content,
            buttonText: action.buttonText,
            wizardOptions: action.wizardOptions,
          },
        ],
      });
    }

    if (action.mode === "launch") {
      this.props.wmProps.shell.openWindow(action.app, action.appProps);
      this.close();
      return;
    }
  }
  render({ image, title, width, height, wmProps = {} }) {
    const buttonStyle = {
      height: `23px`,
      width: `70px`,
      marginLeft: `5px`,
    };
    const { content, buttonText, wizardOptions } =
      this.state.steps[this.state.steps.length - 1];
    return (
      <Window
        title={title}
        classNames="wizard pad"
        width={width || 450}
        height="auto"
        minHeight={height || 380}
        {...wmProps}
      >
        <div class="ui95-window--wizard__row">
          <Bezel classNames="in image">
            <Img src={image} alt="" class="ui95-window--wizard__image" />
          </Bezel>
          <div class="ui95-window--wizard__content">
            <Text type="div" html={content} />
            <Radio
              selected={this.state.selected}
              classNames="down"
              values={wizardOptions}
              onChange={(action, selected) =>
                this.prepareAction(action, selected)
              }
            />
          </div>
        </div>
        <Divider classNames="horizontal" />
        <div class="ui95-window--wizard__buttons">
          {this.state.steps.length > 1 && (
            <Button
              key="back"
              style={buttonStyle}
              onClick={() => this.goBack()}
            >
              &lt; Back
            </Button>
          )}
          <Button
            key="forward"
            style={buttonStyle}
            onClick={() => this.performAction()}
          >
            {buttonText}
          </Button>
          <Button key="cancel" style={buttonStyle} onClick={() => this.close()}>
            Cancel
          </Button>
        </div>
      </Window>
    );
  }
}

export default Wizard;
