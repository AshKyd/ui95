import { h } from "preact";
import { storiesOf } from "@storybook/react";
import Text from ".";

storiesOf("Components/Text", module).add("Text", () => (
  <Text>
    This program has performed an illgal operation and will be shut down.
  </Text>
));
