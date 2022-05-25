import { h } from "preact";
import { storiesOf } from "@storybook/react";
import Input from ".";

storiesOf("Components/Input", module)
  .add("Empty", () => <Input width="100px" value="" />)
  .add("prefilled", () => <Input width="200px" value="Hello world" />)
  .add("multiline", () => (
    <Input multiline={true} width="150px" height="130px" value="Hello world" />
  ))
  .add("multiline disabled", () => (
    <Input
      multiline={true}
      disabled={true}
      width="150px"
      height="130px"
      value="Hello world"
    />
  ));
