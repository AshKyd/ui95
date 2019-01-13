import { h } from "preact";
import { storiesOf } from "@storybook/react";
import Editor from "./index.js";

storiesOf("App/Editor", module).add("Editor style", () => (
  <Editor
    title="Editor post"
    error={new Error("an error")}
    onFocus={() => {}}
    onClose={() => {}}
  />
));
