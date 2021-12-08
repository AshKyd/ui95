import { h, render, Component } from "preact";
import "./style.css";
import Window from "../../components/window/index.js";
import TabBox from "../../components/tabbox/index.js";
import Text from "../../components/text/index.js";
import Button from "../../components/button/index.js";

function TabDialog({ title, tabs, onOkay, onApply, wmProps = {} }) {
  const onClose = wmProps.onClose;
  return (
    <Window
      title={title}
      width={410}
      height="auto"
      isResizeable={false}
      classNames="tabdialog"
      buttons={["close"]}
      {...wmProps}
    >
      <div style={{ padding: "8px 7px" }}>
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
          {onApply && (
            <Button
              classNames="tabdialog-util"
              onClick={() => onApply && onApply()}
            >
              Apply
            </Button>
          )}
        </div>
      </div>
    </Window>
  );
}

export default TabDialog;
