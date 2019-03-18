import { h, render, Component } from "preact";
import "./style.css";
import Window from "../../components/window/index.js";
import Button from "../../components/button/index.js";
import Icon from "../../components/icon/index.js";
import Text from "../../components/text/index.js";
import Input from "../../components/forms/input/index.js";

class TabDialog extends Component {
  render({
    title,
    text,
    html,
    buttons = [{ text: "Ok", onClick: onClose }],
    onClose,
    onFocus,
    icon,
    zIndex,
    width,
    height
  }) {
    const normalizedButtons = buttons.map(({ text, onClick = () => {} }) => ({
      text,
      onClick
    }));
    return (
      <Window
        title={title}
        zIndex={zIndex}
        onClose={onClose}
        onFocus={onFocus}
        width={width || 250}
        height="auto"
        resizeable={false}
        classNames="alert"
        buttons="close"
      >
        <div class="ui95-window-alert">
          <div class="ui95-window-alert__content">
            {icon && (
              <div class="ui95-window-alert__icon">
                <Icon name={icon} size="32" />
              </div>
            )}
            <div class="ui95-window-alert__text">
              <Text style="margin-bottom:15px;" type="div" html={html}>
                {text}
              </Text>
            </div>
          </div>
          <div class="ui95-window-alert__buttons">
            {normalizedButtons.map(props => (
              <Button {...props}>{props.text}</Button>
            ))}
          </div>
        </div>
      </Window>
    );
  }
}

export default TabDialog;
