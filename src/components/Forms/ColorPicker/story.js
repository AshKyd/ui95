import { h } from "preact";
import ColorPicker from ".";

export default {
  title: "Components/ColorPicker",
};

export const Red = () => <ColorPicker value="#ff0000" onChange={console.log} />;
export const Green = () => (
  <ColorPicker value="#008800" onChange={console.log} />
);
