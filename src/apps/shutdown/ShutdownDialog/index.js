import { h, render, Component } from "preact";
import "./style.css";
import Window from "../../../components/window";
import TabBox from "../../../components/tabbox";
import Text from "../../../components/text";
import Button from "../../../components/button";
import Icon from "../../../components/icon";
import Divider from "../../../components/divider";
import HTML from "../../../components/html";
import Radio from "../../../components/forms/radio";

function ShutdownDialog({ onChange, wmProps }) {
  return (
    <div className="ui95-shutdown__scrim">
      <Window
        title="Shut down Windows"
        className="shutdown"
        width={320}
        height={140}
        buttons={["close"]}
        isResizeable={false}
        isMoveable={false}
        center={true}
        {...wmProps}
      >
        <div class="ui95-shutdown__grid">
          <div className="ui95-shutdown__icon">
            <Icon size="32" name="shutdown" />
          </div>
          <div>
            <Text type="h1" className="heading">
              What do you want the website to do?
            </Text>
            <Radio
              id="shutdown"
              classNames="down"
              onChange={console.log}
              selected={0}
              values={{
                Restart: "restart",
                "Disable this wretched Javascript": "disable"
              }}
            />
            <div className="ui95-shutdown__buttons">
              <Button
                onClick={() =>
                  onChange(
                    document.querySelector('[name="radio-shutdown"]:checked')
                      .value
                  )
                }
              >
                OK
              </Button>
              <Button onClick={onChange}>Cancel</Button>
            </div>
          </div>
        </div>
      </Window>
    </div>
  );
}

export default ShutdownDialog;
