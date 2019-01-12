import { h } from "preact";
import { storiesOf } from "@storybook/react";
import Wizard from "./index.js";

const wizardOptions = {
  "I would like to find out more about Ash": { app: "Blog", mode: "Latest" },
  "I would like to play a game": null,
  "No thanks, I will explore by myself": {
    mode: "update",
    content:
      "No worries. You can access everything from the desktop and start menu, or open this wizard again from the desktop.",
    wizardOptions: {},
    buttonText: "Finish"
  }
};

storiesOf("App/Wizard", module).add("Wizard style", () => (
  <Wizard
    title="Wizard post"
    image="http://placekitten.com/100/300"
    wizardOptions={wizardOptions}
    error={new Error("an error")}
    onFocus={() => {}}
    onClose={() => {}}
  />
));
