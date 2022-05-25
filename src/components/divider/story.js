import { h } from "preact";
import Divider from ".";
import Icon from "../Icon/";

export default {
  title: "Components/Divider",
};

export const Horizontal = () => <Divider classNames="horizontal" />;

Horizontal.story = {
  name: "horizontal",
};

export const Vertical = () => <Divider classNames="vertical" />;

Vertical.story = {
  name: "vertical",
};
