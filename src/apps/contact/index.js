import { h, render, Component } from "preact";
import "./style.css";
import Window from "../../components/window";
import TabBox from "../../components/tabbox";
import Text from "../../components/text";
import Button from "../../components/button";
import Icon from "../../components/icon";
import Divider from "../../components/divider";
import HTML from "../../components/html";

function Contact({ bio, contact, wmProps = {} }) {
  const onClose = wmProps.onClose;
  return (
    <Window
      title={contact.name}
      width={410}
      height="auto"
      isResizeable={false}
      className="tabdialog"
      buttons={["close"]}
      {...wmProps}
    >
      <div style={{ padding: "8px 7px" }}>
        <TabBox
          tabs={{
            Summary: (
              <div class="ui95-tabdialog__card">
                <div class="ui95-tabdialog__header">
                  {contact.image ? (
                    <img
                      src={contact.image}
                      alt={contact.name}
                      width="32"
                      height="32"
                    />
                  ) : (
                    <Icon name="contact" size="32" />
                  )}
                  <Text type="h1">About {contact.name}</Text>
                </div>
                <Divider className="horizontal" />
                <div class="ui95-tabdialog__values">
                  <Text>
                    <HTML html={bio} />
                  </Text>
                </div>
              </div>
            ),
            "Contact details": (
              <div class="ui95-tabdialog__card">
                <div class="ui95-tabdialog__header">
                  <Icon name="contact" size="32" />
                  <Text type="h1">Contact details for {contact.name}</Text>
                </div>
                <Divider className="horizontal" />
                <dl class="ui95-tabdialog__values">
                  {contact.items.map(({ text, link, value }) => (
                    <Text>
                      <dt class="ui95-tabdialog__key">{text}</dt>
                      <dd>
                        <a href={link}>{value}</a>
                      </dd>
                    </Text>
                  ))}
                </dl>
              </div>
            )
          }}
        />
        <div class="ui95-tabdialog__util">
          <Button classNames="tabdialog-util" onClick={onClose}>
            OK
          </Button>
          <Button classNames="tabdialog-util" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Window>
  );
}

export default Contact;
