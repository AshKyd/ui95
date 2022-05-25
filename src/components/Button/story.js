import { h } from "preact";
import Button from ".";
import Icon from "../Icon/";

export default {
  title: "Components/Button",
};

export const ButtonStyle = () => <Button>Start</Button>;

ButtonStyle.story = {
  name: "Button style",
};

export const Bold = () => <Button classNames="bold">Start</Button>;

export const WithImage = () => (
  <Button classNames="bold left">
    <Icon size="16" name="folder" />
    Start
  </Button>
);

WithImage.story = {
  name: "With image",
};

export const BlockStyle = () => <Button type="div">Start</Button>;

BlockStyle.story = {
  name: "Block style",
};

export const ActiveStyle = () => <Button className="active">Start</Button>;

ActiveStyle.story = {
  name: "Active style",
};
