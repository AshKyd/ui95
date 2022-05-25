import { h } from "preact";
import { storiesOf } from "@storybook/react";
import Shell from ".";

storiesOf("App/Shell", module)
  .add("No configuration", () => <Shell />)
  .add("Mocked start", () => (
    <Shell
      startMenu={Array.from({ length: 10 }).map((no, i) => ({
        text: "Test " + i,
        items:
          i % 3 === 0 &&
          Array.from({ length: 10 }).map((no, i) => ({
            text: "Test " + i
          }))
      }))}
    />
  ));
