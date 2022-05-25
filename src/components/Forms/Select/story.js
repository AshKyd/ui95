import { h } from "preact";
import Select from ".";

const options = ["Center", "Repeat", "Stretch"];

export default {
  title: "Components/Select",
};

export const Empty = () => <Select options={options} />;
export const Disabled = () => <Select disabled options={options} />;

Disabled.story = {
  name: "disabled",
};
