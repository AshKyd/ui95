import { h, render, Component } from "preact";
import "./style.css";
import TabDialog from "../tabdialog";
import TabBackground from "./TabBackground";

const styles = {
  Center: { backgroundRepeat: "no-repeat", backgroundSize: "auto" },
  Tile: { backgroundRepeat: "repeat", backgroundSize: "auto" },
  Stretch: { backgroundRepeat: "no-repeast", backgroundSize: "100% 100%" }
};

export default class DisplayProperties extends Component {
  constructor() {
    super();

    // background state
    const cs = getComputedStyle(document.body);
    const backgroundRepeat = cs.getPropertyValue("--background-repeat").trim();
    const backgroundSize = cs.getPropertyValue("--background-size").trim();
    const backgroundImage = cs.getPropertyValue("--background-image").trim();

    this.state = {
      background: {
        wallpaper: backgroundImage,
        style: (() => {
          if (backgroundRepeat === "repeat") return "Tile";
          if (backgroundSize === "100% 100%") return "Stretch";
          return "Center";
        })()
      }
    };
  }
  setBackground() {
    const { background } = this.state;
    console.log(background);
    const style = styles[background.style];
    const props = {
      "--background-repeat": style.backgroundRepeat,
      "--background-size": style.backgroundSize,
      "--background-image": "url(" + background.wallpaper + ")"
    };
    Object.entries(props).map(([name, value]) =>
      document.documentElement.style.setProperty(name, value)
    );
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
      ),
      Appearance: ["Appearance"]
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
