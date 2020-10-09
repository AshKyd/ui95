import { h, render, Component } from "preact";
import "./style.css";
import TabDialog from "../tabdialog";
import TabBackground from "./TabBackground";

const styles = {
  Center: { backgroundRepeat: "no-repeat", backgroundSize: "auto" },
  Tile: { backgroundRepeat: "repeat", backgroundSize: "auto" },
  Stretch: { backgroundRepeat: "no-repeat", backgroundSize: "100% 100%" }
};

export function updateVariables() {
  let props;

  try {
    props = JSON.parse(localStorage.displayProperties || "{}");
  } catch (e) {
    props = JSON.parse(window.displayProperties || "{}");
  }

  Object.entries(props).map(([name, value]) =>
    document.documentElement.style.setProperty(name, value)
  );
}

export default class DisplayProperties extends Component {
  constructor() {
    super();

    // background state
    const cs = getComputedStyle(document.body);
    const backgroundRepeat = cs.getPropertyValue("--background-repeat").trim();
    const backgroundSize = cs.getPropertyValue("--background-size").trim();
    const backgroundImage = cs.getPropertyValue("--background-image").trim();
    const backgroundColor = cs.getPropertyValue("--background-color").trim();

    this.state = {
      background: {
        wallpaper: backgroundImage,
        style: (() => {
          if (backgroundRepeat === "repeat") return "Tile";
          if (backgroundSize === "100% 100%") return "Stretch";
          return "Center";
        })(),
        backgroundColor
      }
    };
  }
  setBackground() {
    const { background } = this.state;
    const style = styles[background.style];
    const props = JSON.stringify({
      "--background-repeat": style.backgroundRepeat,
      "--background-size": style.backgroundSize,
      "--background-image": "url(" + background.wallpaper + ")",
      "--background-color": background.backgroundColor
    });

    try {
      localStorage.displayProperties = props;
    } catch (e) {
      window.displayProperties = props;
    }

    updateVariables();
  }
  render(props) {
    const { background } = this.state;
    const tabs = {
      Background: (
        <TabBackground
          value={background}
          onChange={background => this.setState({ background })}
          styles={styles}
        />
      )
    };
    return (
      <TabDialog
        title="Display properties"
        {...props}
        tabs={tabs}
        onApply={() => this.setBackground()}
      ></TabDialog>
    );
  }
}
