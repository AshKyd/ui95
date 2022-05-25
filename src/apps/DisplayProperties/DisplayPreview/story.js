import { h } from "preact";
import DisplayPreview from ".";

export default {
  title: "App/Display Properties/Display Preview",
};

export const Basic = () => <DisplayPreview title="System Properties" />;

export const WPlacekitten = () => (
  <DisplayPreview image="https://placekitten.com/100/100" />
);

WPlacekitten.story = {
  name: "w Placekitten",
};

export const WPlacekittenStretched = () => (
  <DisplayPreview
    image="https://placekitten.com/100/100"
    style={{ backgroundSize: "100% 100%" }}
  />
);

WPlacekittenStretched.story = {
  name: "w Placekitten stretched",
};
