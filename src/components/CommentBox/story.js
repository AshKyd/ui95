import { h } from "preact";
import { storiesOf } from "@storybook/react";
import CommentBox from ".";

storiesOf("Components/CommentBox", module).add("Basic", () => (
  <CommentBox onSubmit={console.log} />
));
