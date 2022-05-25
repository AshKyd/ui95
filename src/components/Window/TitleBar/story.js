import { h } from "preact";
import TitleBar from ".";

export default {
  title: "Components/Window/TitleBar",
};

export const TextOnly = () => <TitleBar text="Hello world" />;

TextOnly.story = {
  name: "Text only",
};

export const TextAndIcon = () => <TitleBar icon="preact" text="Hello world" />;

TextAndIcon.story = {
  name: "Text and icon",
};
