import { h } from "preact";
import { storiesOf } from "@storybook/react";
import Radio from ".";
const values = {
  "I would like to find out more": {
    app: "Blog",
    mode: "latest"
  },
  "I would like to play a game": {
    app: "Games"
  },
  "No thanks, I will explore by myself": {}
};

storiesOf("Components/Radio button", module)
  .add("Down", () => (
    <Radio classNames="down" onChange={console.log} values={values} />
  ))
  .add("Across", () => (
    <Radio classNames="across" onChange={console.log} values={values} />
  ))
  .add("Pre-selected value (second)", () => (
    <Radio
      selected={1}
      classNames="across"
      onChange={console.log}
      values={values}
    />
  ));
