import { h, render, Component } from "preact";
import "./style.css";
import Window from "../../components/window/index.js";
import TabBox from "../../components/tabbox/index.js";
import Text from "../../components/text/index.js";
import Button from "../../components/button/index.js";

class TalksViewer extends Component {
  render({ zIndex, onClose, onFocus, onOkay, overview = {}, talk }) {
    const { title } = this.state;

    // These props are undefined because the parsePage function doesn't expose them.
    const { speakerPhoto, speakerName } = overview.appProps || {};
    const { content: speakerBio } = overview || {};

    const tabs = {
      Talk: [],
      Social: []
    };

    return (
      <Window
        title={title}
        zIndex={zIndex}
        onClose={onClose}
        onFocus={onFocus}
        width={410}
        height="auto"
        classNames="talksviewer"
        minWidth={320}
      >
        {overview && (
          <div style={{ padding: "8px 7px" }}>
            <div>
              <img src={speakerPhoto} alt={speakerName} />
              <Text html={speakerBio} classNames="talksviewer__bio" />
            </div>
            <TabBox tabs={tabs} />
            <div class="ui95-tabdialog__util">
              <Button
                classNames="tabdialog-util"
                onClick={() => (onOkay && onOkay()) || onClose()}
              >
                OK
              </Button>
              <Button classNames="tabdialog-util" onClick={() => onClose()}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Window>
    );
  }
}

export default TalksViewer;
