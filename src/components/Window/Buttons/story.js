import { h } from "preact";
import Buttons from ".";

export default {
  title: "Components/Window/Buttons",
};

export const NoConfig = () => <Buttons />;

NoConfig.story = {
  name: "No config",
};

export const Maximized = () => <Buttons isMaximized />;
export const CustomButtons = () => <Buttons buttons={["close"]} />;

CustomButtons.story = {
  name: "Custom buttons",
};
