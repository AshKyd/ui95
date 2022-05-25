import { h } from "preact";
import Window from ".";

export default {
  title: "App/Error",
};

export const WindowStyle = () => (
  <Window wmProps={{}} error={new Error("an error")} />
);

WindowStyle.story = {
  name: "Window style",
};
