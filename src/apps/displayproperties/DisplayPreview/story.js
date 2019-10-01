import { h } from "preact";
import { storiesOf } from "@storybook/react";
import DisplayPreview from ".";

storiesOf("App/Display Properties/Display Preview", module)
  .add("Basic", () => <DisplayPreview title="System Properties" />)

  .add("w Placekitten", () => (
    <DisplayPreview image="https://placekitten.com/100/100" />
  ))
  .add("w Placekitten stretched", () => (
    <DisplayPreview
      image="https://placekitten.com/100/100"
      style={{ backgroundSize: "100% 100%" }}
    />
  ));
