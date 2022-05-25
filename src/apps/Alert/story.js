import { h } from "preact";
import Alert from ".";

export default {
  title: "App/Alert",
};

export const TitleText = () => (
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
);

TitleText.story = {
  name: "Title & Text",
};

export const Icon = () => (
  <Alert title="My alert" text="yeah okay" icon="default" />
);

export const Html = () => (
  <Alert title="My alert" html="yeah okay<br><br>This is HTML" icon="default" />
);

Html.story = {
  name: "HTML",
};

export const FluidSize = () => (
  <Alert
    title="My alert"
    text="There is no disk in this drive or the drive door is open. Insert a disk in the drive and make sure the drive door is closed, and then click Retry.
"
    icon="default"
  />
);

FluidSize.story = {
  name: "Fluid size",
};
