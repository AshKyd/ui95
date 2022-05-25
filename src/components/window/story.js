import { h } from "preact";
import Window from ".";
import WindowArea from "../Desktop/WindowArea";
import Taskbar from "../Taskbar";
import Button from "../Button";

export default {
  title: "Components/Window",
};

export const WithoutIcon = () => <Window>Hello window</Window>;

WithoutIcon.story = {
  name: "Without icon",
};

export const WithIcon = () => <Window icon="preact">Hello window</Window>;

WithIcon.story = {
  name: "With icon",
};
