import { h, render, Component } from "preact";
import "./style.css";
import Window from "../../components/window/index.js";
import Radio from "../../components/forms/radio/index.js";
import Button from "../../components/button/index.js";
import Bezel from "../../components/bezel/index.js";
import Text from "../../components/text/index.js";
import Img from "../../components/img/index.js";
import Divider from "../../components/divider/index.js";

class Wizard extends Component {
  constructor(props) {
    super();
    this.state = {
      zIndex: props.zIndex,
      selected: 0,
      action: Object.values(props.wizardOptions)[0],
      steps: [
        {
          content: props.content,
          wizardOptions: props.wizardOptions,
          buttonText: props.buttonText || "Next >"
        }
      ]
    };
  }
  componentWillReceiveProps(nextProps, nextContext) {
    this.setState(() => ({
      zIndex: nextProps.zIndex,
      isMinimized: nextProps.isMinimized
    }));
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
      steps: this.state.steps.slice(0, -1)
    });
  }
  performAction() {
    const action = this.state.action;
    console.log("perform action", action);

    if (!action) return this.props.onClose();

    if (action.mode === "update") {
      return this.setState({
        selected: 0,
        action: Object.values(action.wizardOptions)[0],
        steps: [
          ...this.state.steps,
          {
            content: action.content,
            buttonText: action.buttonText,
            wizardOptions: action.wizardOptions
          }
        ]
      });
    }
  }
  render({ image, onClose, onFocus, title, width, height }) {
    const buttonStyle = {
      height: `calc(23 * var(--px))`,
      width: `calc(70 * var(--px))`,
      marginLeft: `calc(5 * var(--px))`
    };
    const { content, buttonText, wizardOptions } = this.state.steps[
      this.state.steps.length - 1
    ];
    return (
      <Window
        title={title}
        zIndex={this.state.zIndex}
        classNames="wizard pad"
        isMinimized={this.state.isMinimized}
        onClose={onClose}
        onFocus={onFocus}
        width={width || 450}
        height={height || 380}
        icon="ash"
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
            <Button style={buttonStyle} onClick={() => this.goBack()}>
              &lt; Back
            </Button>
          )}
          <Button style={buttonStyle} onClick={() => this.performAction()}>
            {buttonText}
          </Button>
          <Button style={buttonStyle} onClick={onClose}>
            Cancel
          </Button>
        </div>
      </Window>
    );
  }
}

export default Wizard;
