import { h, render, Component } from "preact";
import "./style.css";
import BlinkenPrompt from "../../components/BootSequence/BlinkenPrompt";
import BootSequenceWin2k from "../../components/BootSequence/Win2k";
import ShutdownDialog from "./ShutdownDialog";

class Shutdown extends Component {
  constructor() {
    super();
    this.state = {
      stage: "dialog",
      bootProgress: 0
    };
  }

  componentDidUpdate() {
    if (this.state.stage === "boot") {
      if (this.state.bootProgress >= 100) {
        return this.props.wmProps.onClose();
      }
      setTimeout(() => {
        this.setState({ bootProgress: (this.state.bootProgress += 10) });
      }, 500);
    }
    if (this.state.stage === "restart") {
      // Close all other windows
      const { windows } = this.props.wmProps.shell.state;
      if (windows.length > 1) {
        this.props.wmProps.shell.setState({
          windows: windows.filter(window => {
            return window.appName === "Shutdown";
          })
        });
      }
      setTimeout(() => {
        this.setState({ stage: "boot", bootProgress: 0 });
      }, 4000);
    }
  }

  render({ branding = "", copyright = "", wmProps }) {
    const { stage } = this.state;
    if (stage === "dialog")
      return (
        <ShutdownDialog
          wmProps={wmProps}
          onChange={stage => {
            if (!stage) wmProps.onClose();
            this.setState({ stage });
            this.props.onChange(stage);
          }}
        />
      );
    let component;
    if (stage === "restart") component = <BlinkenPrompt />;
    if (stage === "disable") component = <BlinkenPrompt />;
    if (stage === "boot")
      component = (
        <BootSequenceWin2k
          progress={this.state.bootProgress}
          {...{ branding, copyright }}
        />
      );

    // Fairly amazing hack to break our reboot app out of the window area
    return (
      <div>
        <style>{`
        .ui95-windowarea{position:static;overflow:visible;}
        `}</style>
        {component}
      </div>
    );

    return stage;
  }
}

export default Shutdown;
