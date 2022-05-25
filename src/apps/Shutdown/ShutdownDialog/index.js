import { h, render, Component } from "preact";
import "./style.css";
import Window from "../../../components/Window";
import TabBox from "../../../components/TabBox";
import Text from "../../../components/Text";
import Button from "../../../components/Button";
import Icon from "../../../components/Icon";
import Divider from "../../../components/Divider";
import HTML from "../../../components/HTML";
import Radio from "../../../components/Forms/Radio";

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
                "Disable this wretched Javascript": "disable",
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
