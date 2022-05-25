import { h } from "preact";
import Icon from ".";

export default {
  title: "Components/Icon",
};

export const Folder = () => <Icon size="16" name="folder" />;
export const Custom = () => <Icon size="custom" name="chevron-black-right" />;
