import { h } from "preact";
import { storiesOf } from "@storybook/react";
import Alert from "./index.js";

const noop = () => {};

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
      onClose={noop}
      onFocus={noop}
      zIndex={1}
    />
  ))
  .add("Icon", () => (
    <Alert
      title="My alert"
      text="yeah okay"
      icon="default"
      onClose={noop}
      onFocus={noop}
      zIndex={1}
    />
  ))
  .add("HTML", () => (
    <Alert
      title="My alert"
      html="yeah okay<br><br>This is HTML"
      icon="default"
      onClose={noop}
      onFocus={noop}
      zIndex={1}
    />
  ))
  .add("Fluid size", () => (
    <Alert
      title="My alert"
      text="There is no disk in this drive or the drive door is open. Insert a disk in the drive and make sure the drive door is closed, and then click Retry.
"
      icon="default"
      onClose={noop}
      onFocus={noop}
      zIndex={1}
    />
  ));
