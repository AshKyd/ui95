import { h } from "preact";
import { storiesOf } from "@storybook/react";
import Alert from ".";

storiesOf("App/Alert", module)
  .add("Title & Text", () => (
    <Alert
      title="My alert"
      text={
        <div>
          Some text
          <br />
          <br />
          With newlines
        </div>
      }
    />
  ))
  .add("Icon", () => <Alert title="My alert" text="yeah okay" icon="default" />)
  .add("HTML", () => (
    <Alert
      title="My alert"
      html="yeah okay<br><br>This is HTML"
      icon="default"
    />
  ))
  .add("Fluid size", () => (
    <Alert
      title="My alert"
      text="There is no disk in this drive or the drive door is open. Insert a disk in the drive and make sure the drive door is closed, and then click Retry.
"
      icon="default"
    />
  ));
