import { h, render, Component } from "preact";
import "./style.css";
import Tab from "./tab/index.js";
import Bezel from "../bezel/index.js";

class TabBox extends Component {
  constructor() {
    super();

    this.state = {
      selectedIndex: 0
    };
  }
  render({ tabs, style }) {
    const className = "ui95-tabbox";
    const tabMap = Object.entries(tabs);
    const { selectedIndex } = this.state;

    return (
      <div class={className} style={style}>
        <div class="ui95-tabbox__tabs">
          {tabMap.map(([title, contents], i) => (
            <Tab
              style={{
                zIndex:
                  selectedIndex === i ? tabMap.length + 2 : tabMap.length - i,
                transform: selectedIndex === i ? "none" : "translateY(2px)"
              }}
              onClick={() => this.setState({ selectedIndex: i })}
            >
              {title}
            </Tab>
          ))}
        </div>
        <Bezel
          classNames="out-tab"
          style={{
            width: "100%",
            height: "100%",
            marginTop: "-2px",
            zIndex: tabMap.length + 1,
            boxSizing: "border-box",
            padding: "10px"
          }}
        >
          {tabMap[selectedIndex][1]}
        </Bezel>
      </div>
    );
  }
}

export default TabBox;
