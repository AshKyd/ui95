import { h } from "preact";
import { storiesOf } from "@storybook/react";
import Select from ".";

const options = ["Center", "Repeat", "Stretch"];

storiesOf("Components/Select", module)
  .add("Empty", () => <Select options={options} />)
  .add("disabled", () => <Select disabled options={options} />);
