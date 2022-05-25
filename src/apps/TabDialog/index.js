import { h, render, Component } from "preact";
import "./style.css";
import Window from "../../components/Window/";
import TabBox from "../../components/TabBox/";
import Text from "../../components/Text/";
import Button from "../../components/Button/";

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
