import { h } from "preact";
import Input from ".";

export default {
  title: "Components/Input",
};

export const Empty = () => <Input width="100px" value="" />;
export const Prefilled = () => <Input width="200px" value="Hello world" />;

Prefilled.story = {
  name: "prefilled",
};

export const Multiline = () => (
  <Input multiline={true} width="150px" height="130px" value="Hello world" />
);

Multiline.story = {
  name: "multiline",
};

export const MultilineDisabled = () => (
  <Input
    multiline={true}
    disabled={true}
    width="150px"
    height="130px"
    value="Hello world"
  />
);

MultilineDisabled.story = {
  name: "multiline disabled",
};
