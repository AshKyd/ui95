import { h } from "preact";
import Radio from ".";
const values = {
  "I would like to find out more": {
    app: "Blog",
    mode: "latest",
  },
  "I would like to play a game": {
    app: "Games",
  },
  "No thanks, I will explore by myself": {},
};

export default {
  title: "Components/Radio button",
};

export const Down = () => (
  <Radio classNames="down" onChange={console.log} values={values} />
);

export const Across = () => (
  <Radio classNames="across" onChange={console.log} values={values} />
);

export const PreSelectedValueSecond = () => (
  <Radio
    selected={1}
    classNames="across"
    onChange={console.log}
    values={values}
  />
);

PreSelectedValueSecond.story = {
  name: "Pre-selected value (second)",
};
