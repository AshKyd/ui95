import { h, render, Component } from "preact";
import "./style.css";
import Window from "../../components/window/index.js";
import TabBox from "../../components/tabbox/index.js";
import Text from "../../components/text/index.js";
import Button from "../../components/button/index.js";

function TalksViewer({ wmProps = {}, onOkay, overview = {}, talk }) {
  const { title } = this.state;

  // These props are undefined because the parsePage function doesn't expose them.
  const { speakerPhoto, speakerName } = overview.appProps || {};
  const { content: speakerBio } = overview || {};

  const tabs = {
    Talk: [],
    Social: []
  };

  const onClose = wmProps.onClose;

  return (
    <Window
      title={title}
      width={410}
      height="auto"
      classNames="talksviewer"
      minWidth={320}
      {...wmProps}
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

export default TalksViewer;
