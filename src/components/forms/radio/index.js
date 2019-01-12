import { h, render, Component } from "preact";
import "./style.css";
import Bezel from "../../bezel/index.js";
import Text from "../../text/index.js";
let radioId = Math.round(Math.random() * 1e6);
const className = "ui95-radio";
class Radio extends Component {
  constructor() {
    super();
    this.state = {
      id: radioId++
    };
  }
  id() {
    return [className, this.state.id].join("-");
  }
  render(props) {
    const classNames = [className, ...(props.classNames || "").split(" ")].join(
      ` ${className}--`
    );
    return (
      <ul class={classNames}>
        {Object.entries(props.values).map(([text, value], i) => (
          <li key={i}>
            <label for={`${this.id()}__${i}`}>
              <input
                name={this.id()}
                id={`${this.id()}__${i}`}
                type="radio"
                value=""
                checked={props.selected === i}
                onChange={e => props.onChange(value, i)}
              />
              <Bezel
                classNames="in round"
                style={{
                  width: "calc(9 * var(--px))",
                  height: "calc(9 * var(--px))"
                }}
              >
                <div class={`${className}__dot`} />
              </Bezel>
              <Text>{text}</Text>
            </label>
          </li>
        ))}
      </ul>
    );
  }
}

export default Radio;
